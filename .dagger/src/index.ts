import {
  dag,
  Container,
  Directory,
  object,
  func,
  Secret,
  File,
  Service,
  argument,
} from "@dagger.io/dagger";

const ALLOWED_SERVICES = [
  "user",
  "cart",
  "product",
  "order",
  "payment",
  "frontend",
  "workflow",
];

@object()
export class Pipelines {
  bunImage: Container;
  constructor() {
    this.bunImage = dag
      .container()
      .from("oven/bun:1.2.11-alpine")
      .withExec(["addgroup", "-g", "10001", "-S", "bun_runner"])
      .withExec(["adduser", "-S", "nexura", "-u", "10001", "-G", "bun_runner"])
      .withEnvVariable("VERIFY_CHECKSUM","false")
      .withExec(["wget","https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3","-O","get-helm-3.sh"])
      .withExec(["chmod","+x","get-helm-3.sh"])
      .withExec(["sh","./get-helm-3.sh"])
      .withUser("nexura");
  }

  @func()
  call(): Container {
    return this.bunImage.terminal()
  }
  /**
   * Lint the codebase using eslint
   * @param source The path to source directory
   * @returns the result of the linting process as a Container object
   */
  @func()
  lint(
    @argument({
      defaultPath: "../",
      ignore: [
        "node_modules",
        ".next",
        "**/.env",
        "dist",
        ".git",
        "**/node_modules",
        "prisma-client",
        ".dagger",
      ],
    })
    source: Directory
  ): Promise<string> {
    return dag
      .container()
      .from("oven/bun:1.2.11-alpine")
      .withDirectory(".",source)
      .withExec(["bun", "install", "eslint"])
      .withExec(["bun", "lint"]).stdout();
  }

  /**
   * Scan vunerabilities in container using Trivy
   * @returns
   */
  @func()
  codeScan(
    @argument({
      defaultPath: "../",
      ignore: [
        "node_modules",
        ".next",
        "**/.env",
        "dist",
        ".git",
        "**/node_modules",
        "prisma-client",
      ],
    })
    source: Directory,
    token: string,
    variant: string = "alpine",
  ): Promise<string> {
    return dag.snykDagger().snykCodeTest(token, variant, source, {extraArgs: ["--severityThreshold=high"]});
  }

  /**
   * Scan vunerabilities in single image using Trivy
   * @param image The image to scan for vulnerabilities
   * @returns result of the scan as a string
   */
  @func()
  async imageScan(image: string): Promise<string> {
    return dag.trivy().image({ ref: image });
  }

  /**
   * Scan vunerabilities in single image using Trivy
   * @param images a list of images to scan separate by comma
   * @returns result of the scan as a concatnate string
   */
  @func()
  async imagesScan(images: string[]): Promise<string[]> {
    return await Promise.all(images.map((image) => this.imageScan(image)));
  }
  /**
   * Typescript generation using protoc-gen-ts_proto plugin.
   * @returns
   */
  @func()
  protoc(): Container {
    return dag
      .container()
      .from("rvolosatovs/protoc:latest")
      .withUser("nexura")
      .withWorkdir("/app")
      .withExec(["mkdir", "-p", "./generated"])
      .withExec(["yarn", "init", "-y"])
      .withExec(["yarn", "add", "ts-proto"]);
  }

  /**
   * Publish the protoc image to image registry.
   */
  @func()
  async publishProtocImage(
    imageName: string = "ducleeclone/protoc-builder:latest"
  ): Promise<string> {
    return await this.protoc().publish(imageName);
  }

  /**
   * Generate TypeScript types from a proto file using the protoc-gen-ts_proto plugin.
   * @param filePath The path to the proto file to generate types for
   * @returns
   */
  @func()
  genProtoc(filePath: File): Directory {
    return dag
      .container()
      .from("ducleeclone/protoc-builder:latest")
      .withFile(`/app/nexura.proto`, filePath)
      .withExec([
        "protoc",
        "--proto_path=.",
        "--plugin=node_modules/.bin/protoc-gen-ts_proto",
        "--ts_proto_opt=esModuleInterop=true,stringEnums=true,outputServices=grpc-js",
        "--descriptor_set_out=./generated/nexura_reflection_descriptor.pb",
        "--include_imports",
        "--ts_proto_out=./generated",
        `./nexura.proto`,
      ])
      .directory("./generated");
  }

  /**
   * Install package for monorepo project.
   * @param source The path to the source directory
   * @returns Container with installed packages
   */
  @func()
  installPackage(
    @argument({
      defaultPath: "../",
      ignore: [
        "node_modules",
        ".next",
        "**/.env",
        "dist",
        ".git",
        "**/node_modules",
        "prisma-client",
      ],
    })
    source: Directory
  ): Container {
    return this.bunImage
      .withDirectory(".", source, { owner: "nexura" })
      .withMountedCache(
        "./node_modules",
        dag.cacheVolume("monorepo_node_modules"),
        { owner: "nexura" }
      )
      .withExec(["bun", "install", "--frozen-lockfile"]);
  }

  /**
   * Build a single backend service based on service name.
   * @param service The name of the service to build.
   * @returns A Container object representing the built service.
   */
  @func()
  buildBackend(
    service: string,
    @argument({
      defaultPath: "../",
      ignore: [
        "node_modules",
        ".next",
        "**/.env",
        "dist",
        ".git",
        "**/node_modules",
        "prisma-client",
      ],
    })
    source: Directory
  ): Container {
    if (!ALLOWED_SERVICES.includes(service) && service !== "frontend") {
      throw new Error(
        `Service name '${service}' is not recognized. Available services: ${ALLOWED_SERVICES.join(", ")}`
      );
    }

    const packages = this.installPackage(source);
    const artifactContainer = this.bunImage
      .withWorkdir("/app")
      .withMountedCache(
        "./node_modules",
        dag.cacheVolume("monorepo_node_modules"),
        { owner: "nexura" }
      )
      .withDirectory(".", source, {
        include: ["./packages", "start.sh"],
        owner: "nexura",
      })
      .withDirectory(
        "./packages/grpc_gateway/utils/generated",
        this.genProtoc(
          source.file("./packages/grpc_gateway/utils/nexura.proto")
        ),
        { owner: "nexura" }
      )
      .withFile("./package.json", packages.file("./package.json"))
      .withDirectory(
        `./src/${service + "-service"}`,
        source.directory(`./src/${service + "-service"}`),
        { owner: "nexura" }
      )
      .withEnvVariable("DATABASE_URL", "file:./dev.db")
      .withWorkdir(`src/${service + "-service"}`)
      .withExec(["bun", "prisma:generate"])
      .withExec(["bun", "run", "build"])
      .withExec(["cp", "-t", ".", "../../start.sh"]);

    return this.bunImage
      .withDirectory(".", artifactContainer.directory("."), {
        include: ["dist", "prisma", "src/db", "start.sh"],
        owner: "nexura",
      })
      .withExec(["chmod","+x","./start.sh"])
      .withEnvVariable("JWT_ACCESS_SECRET", "production")
      .withEnvVariable("JWT_REFRESH_SECRET", "production")
      .withEnvVariable("DATABASE_URL", "file:./dev.db")
      .withEnvVariable("NODE_ENV", "production")
      .withEntrypoint(["/bin/sh","-c","./start.sh"]);
  }

  /**
   * Build frontend.
   * @returns A Container object representing the built service.
   */
  @func()
  buildFrontend(
    @argument({
      defaultPath: "../",
      ignore: [
        "node_modules",
        ".next",
        "dist",
        ".git",
        "**/node_modules",
        "prisma-client",
      ],
    })
    source: Directory,
    frontendSecret: Secret
  ): Container {
    const packages = this.installPackage(source);
    const artifactContainer = this.bunImage
      .withWorkdir("/app")
      .withMountedCache(
        "./node_modules",
        dag.cacheVolume("monorepo_node_modules"),
        { owner: "nexura" }
      )
      .withDirectory(".", source, {
        include: ["./packages", "start.sh"],
        owner: "nexura",
      })
      .withDirectory(
        "./packages/grpc_gateway/utils/generated",
        this.genProtoc(
          source.file("./packages/grpc_gateway/utils/nexura.proto")
        ),
        { owner: "nexura" }
      )
      .withFile("./package.json", packages.file("./package.json"))
      .withDirectory(`./src/frontend`, source.directory(`./src/frontend`), {
        owner: "nexura",
      })
      .withWorkdir(`src/frontend`)
      .withMountedSecret(".env", frontendSecret, { owner: "nexura" })
      .withEnvVariable("DAPR_PORT", "50000")
      .withExec(["bun", "run", "build"]);
    return this.bunImage
      .withDirectory(".", artifactContainer.directory("."), {
        include: [".next", "public"],
        owner: "nexura",
      })
      .withWorkdir(".next/standalone/src/frontend")
      .withExec(["sh", "-c", "mv ../../../static .next"])
      .withEnvVariable("HOSTNAME", "0.0.0.0")
      .withEnvVariable("PORT", "3000")
      .withEntrypoint(["bun", "server.js"]);
  }

  /**
   * Run frontend service.
   * @returns Next service running with port 3000.
   */
  @func()
  serverFrontend(
    @argument({
      defaultPath: "../",
      ignore: [
        "node_modules",
        ".next",
        "dist",
        ".git",
        "**/.env",
        "**/node_modules",
        "prisma-client",
      ],
    })
    source: Directory,
    frontendSecret: Secret
  ): Service {
    return this.buildFrontend(source, frontendSecret)
      .withExposedPort(3000)
      .asService({ useEntrypoint: true });
  }

  /**
   * Push a set of services to docker hub registry.
   * @param services List of services to push to registry.
   * @returns Pushed result.
   */
  @func()
  async buildAndPushImages(
    @argument({
      defaultPath: "../",
      ignore: [
        "node_modules",
        ".next",
        "dist",
        ".git",
        "**/.env",
        "**/node_modules",
        "prisma-client",
      ],
    })
    source: Directory,
    services: string[],
    frontendSecret: Secret,
    snykToken: string,
    version: string = "latest"
  ): Promise<string> {
    const allowedService = [
      "user",
      "cart",
      "product",
      "order",
      "payment",
      "frontend",
      "workflow",
    ];
    const serviceList = services.filter((service) =>
      allowedService.includes(service)
    );
    Promise.all([
      this.lint(source),
      this.codeScan(source, snykToken)
    ])
    const buildServices = async (list: string[]): Promise<string> => {
      // build services contain in list, if none of them provided, build all services
      return await Promise.all(
        list.map((service) => {
          if (service === "frontend") {
            return this.buildFrontend(source, frontendSecret).publish(
              `ducleeclone/frontend:${version}`
            );
          }
          if (service === "workflow") {
            return this.buildWorkflow(source).publish(
              `ducleeclone/workflow:${version}`
            );
          }
          const imageName = `ducleeclone/${service}-service:${version}`;
          return this.buildBackend(service, source).publish(imageName);
        })
      ).then((results) => results.join("\n"));
    };

    return serviceList.length === 0 ? buildServices(allowedService) : buildServices(serviceList) ;
  }

  @func()
  buildWorkflow(
    @argument({
      defaultPath: "../",
      ignore: [
        "node_modules",
        ".next",
        "dist",
        "**/.env",
        ".git",
        "**/node_modules",
        "prisma-client",
      ],
    })
    source: Directory
  ): Container {
    const packages = this.installPackage(source);
    const artifactContainer = this.bunImage
      .withWorkdir("/app")
      .withMountedCache(
        "./node_modules",
        dag.cacheVolume("monorepo_node_modules"),
        { owner: "nexura" }
      )

      .withDirectory(".", source, {
        include: ["./packages", "start.sh"],
        owner: "nexura",
      })
      .withDirectory(
        "./packages/grpc_gateway/utils/generated",
        this.genProtoc(
          source.file("./packages/grpc_gateway/utils/nexura.proto")
        ),
        { owner: "nexura" }
      )
      .withFile("./package.json", packages.file("./package.json"))
      .withDirectory(`./src/workflow`, source.directory(`./src/workflow`), {
        owner: "nexura",
      })
      .withWorkdir(`src/workflow`)
      .withExec(["bun", "run", "build"]);

    return this.bunImage
      .withDirectory(".", artifactContainer.directory("."), {
        include: ["dist"],
        owner: "nexura",
      })
      .withWorkdir("./dist")
      .withEnvVariable("NODE_ENV", "production")
      .withEntrypoint(["bun", "index.js"]);
  }
}

