import { PrismaClient } from "@nexura/user-service/src/db/prisma-client";

import {
  hashPassword,
  logger,
} from "@nexura/common/utils";
import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { status } from "@grpc/grpc-js";
import {
  RegisterUserForAdminResponse,
  RegisterUserForAdminRequest,
} from "@nexura/grpc_gateway/protos";
import { sendNewUserByAdminGateway } from "@nexura/grpc_gateway/gateway";

const prisma = new PrismaClient();

export const RegisterUserForAdmin = async (
  call: ServerUnaryCall<
    RegisterUserForAdminRequest,
    RegisterUserForAdminResponse
  >,
  callback: sendUnaryData<RegisterUserForAdminResponse>
) => {
  try {
    // Validate request
    console.log("RegisterUserForAdmin", call.request);
    const { firstName, lastName, email, phone } = call.request;
    const randomPassword = Math.random().toString(36).slice(-10);
    // Check if email exists
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      callback({
        code:    status.ALREADY_EXISTS,
        message: "Email already in use",
      });
    }

    // Create user
    const hashedPassword = hashPassword(randomPassword);

    const newUser = await prisma.user.create({
      data: {
        firstName:   firstName,
        lastName:    lastName,
        email:       email,
        phone:       phone,
        password:    hashedPassword,
        isActive:    true,
        isVerified:  true,
        role:        "user",
        permissions: "[]",
        lastLogin:   null,
      },
    });

    logger.info("User registered successfully", { userId: newUser.id });

    // Send welcome email
    try {
      await sendNewUserByAdminGateway({
        email,
        name:     `${firstName} ${lastName}`,
        password: randomPassword,
      });
    } catch (error) {
      logger.error("Failed to send welcome email:", error);

      callback(null, {
        success: true,
        message: "User registered successfully",
        userId:  newUser.id,
      });
    }
  } catch (error) {
    logger.error("Error in RegisterUser", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    callback({
      code:    status.INTERNAL,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
