import { SpanStatusCode } from "@opentelemetry/api";
import type { ServerUnaryCall, sendUnaryData } from "@grpc/grpc-js";
import { status } from "@grpc/grpc-js";


import { api, logger } from "@nexura/common/utils";

import { GetBatchUsersRequest, GetBatchUsersResponse } from "@nexura/grpc_gateway/protos";
import { PrismaClient, Prisma } from '@nexura/user-service/src/db/prisma-client'


const tracer = api.trace.getTracer('getUser')
const prisma = new PrismaClient()

export const GetBatchUsers = async (
  call: ServerUnaryCall<GetBatchUsersRequest, GetBatchUsersResponse>,
  callback: sendUnaryData<GetBatchUsersResponse>
) => {
  const span = tracer.startSpan('Request received');
  try {
    span.addEvent('Request received', {
      id: call.request.userIds
    });
    logger.debug('Fetching users from database', { userIds: call.request.userIds });
    const userSpan = tracer.startSpan("getUserFromDB")
    const users = await prisma.user.findMany({
      where:   { id: { in: call.request.userIds } },
      include: {
        address: {
          include: {
            country: {
              select: {
                codeName: true
              }
            },
            vnProvince: {
              select: {
                fullName: true
              }
            },
            vnDistrict: {
              select: {
                fullName: true
              }
            },
            vnWard: {
              select: {
                fullName: true
              }
            }
          }
        }
      }
    });
    if (!users) {
      logger.warn('Users not found', { userIds: call.request.userIds });
      userSpan.setStatus({
        code:    SpanStatusCode.ERROR,
        message: 'User not found'
      });

      callback({
        code:    status.NOT_FOUND,
        message: 'User not found',
      });
      return userSpan.end();
    }

    logger.info('Users found successfully', { userIds: call.request.userIds });
    userSpan.setStatus({ code: SpanStatusCode.OK });
    callback(null, {
      users: users.map(user => ({
        id:                user.id,
        firstName:         user.firstName,
        lastName:          user.lastName,
        email:             user.email,
        phone:             user.phone || "",
        isActive:          user.isActive,
        isVerified:        user.isVerified,
        role:              user.role,
        permissions:       JSON.parse(user.permissions),
        lastLogin:         user.lastLogin?.toISOString() || "",
        profilePictureUrl: user.profilePictureUrl || "",
        createdAt:         user.createdAt.toISOString(),
        updatedAt:         user.updatedAt.toISOString(),
        dateOfBirth:       user.dateOfBirth?.toISOString() || "",
        gender:            user.gender || "",
      })),
    });
    userSpan.end();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientUnknownRequestError) {
      logger.error('Error in Prisma', {
        error: error.message,
        stack: error.stack
      });
    }
    logger.error('Error in Get Batch User', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    span.setStatus({
      code:    SpanStatusCode.ERROR,
      message: `Internal error: ${error instanceof Error ? error.message : 'Unknown error'}`
    });
    span.recordException(error as Error);

    span.end();

    callback({
      code:    status.INTERNAL,
      message: 'Internal server error',
    });
  }
}
