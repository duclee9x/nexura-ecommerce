import { PrismaClient } from "@nexura/user-service/src/db/prisma-client";
import {
  logger,
  verifyToken,
} from "@nexura/common/utils";
import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { status } from "@grpc/grpc-js";
import {
  VerifyAccountRequest,
  VerifyAccountResponse,
} from "@nexura/grpc_gateway/protos";

const prisma = new PrismaClient();

export const verifyAccount = async (
  call: ServerUnaryCall<VerifyAccountRequest, VerifyAccountResponse>,
  callback: sendUnaryData<VerifyAccountResponse>
) => {
  try {
    // Verify token
    const data = verifyToken(call.request.token);
    if (!data) {
      callback({
        code:    status.UNAUTHENTICATED,
        message: "Invalid verification token",
      });
      return null;
    }

    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (userExists?.isVerified === true) {
      callback(
        {
          code:    status.ALREADY_EXISTS,
          message: "User already verified",
        },
        {
          success: false,
          message: "User already verified",
        }
      );
      return;
    }

    await prisma.user.update({
      where: { email: data.email },
      data:  {
        isVerified: true,
      },
    });

    callback(null, {
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    logger.error("Error in VerifyEmail", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    callback({
      code:    status.INTERNAL,
      message: "An error occurred while verifying your email",
    });
  }
};
