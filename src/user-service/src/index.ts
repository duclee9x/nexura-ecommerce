import {
  AddressServiceService,
  UserServiceService,
} from "@nexura/grpc_gateway/protos";
import { gracefulShutdown, startServer } from "@nexura/grpc_gateway/server";
import { addressService } from "./services/address/address";
import { userService } from "./services/user/user";
const port = process.env.USER_SERVICE_GRPC_PORT || "50051";
const services = [
  {
    service: UserServiceService,
    serviceHandler: userService,
  },
  { service: AddressServiceService, serviceHandler: addressService },
];

const server = startServer(services, port, "USER_SERVICE");

// Handle graceful shutdown
process.once("SIGTERM", () => gracefulShutdown("SIGTERM", server));
process.once("SIGINT", () => gracefulShutdown("SIGINT", server));
