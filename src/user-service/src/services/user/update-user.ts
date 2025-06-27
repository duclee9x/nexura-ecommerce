import { logger, verifyPassword, hashPassword, api } from "@nexura/common/utils";
import type { ServerUnaryCall, sendUnaryData } from '@grpc/grpc-js';
import { status } from '@grpc/grpc-js';
import { UpdateUserRequest, UpdateUserResponse } from "@nexura/grpc_gateway/protos";
import { UpdateUserSchema } from "@nexura/common/validators";

import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'

const prisma = new PrismaClient()

export const UpdateUser = async (
  call: ServerUnaryCall<UpdateUserRequest, UpdateUserResponse>,
  callback: sendUnaryData<UpdateUserResponse>
) => {
  // Extract user data and id
  const { currentPassword, newPassword, user: userData } = call.request;
  logger.debug('UpdateUser request received', { userData });

  try {
    // Validate request shape
    const validatedData = UpdateUserSchema.safeParse(call.request);
    if (!validatedData.success) {
      logger.warn('Invalid request data', { errors: validatedData.error.errors });
      return callback({
        code: status.INVALID_ARGUMENT,
        message: 'Invalid request data: ' + JSON.stringify(validatedData.error.errors),
      });
    }

    const id = validatedData.data.user.id;
    // If no userData and no password change, nothing to update
    const hasProfileUpdate = userData && Object.keys(userData).length > 0;
    const wantsPasswordChange = currentPassword && newPassword;
    if (!hasProfileUpdate && !wantsPasswordChange) {
      logger.warn('No fields to update', { userId: id });
      return callback({
        code: status.INVALID_ARGUMENT,
        message: 'No fields to update',
      });
    }

    // Fetch user for validation and updates
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      logger.warn('User not found', { userId: id });
      return callback({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    // Handle password update
    if (wantsPasswordChange) {
      logger.debug('Verifying current password', { userId: id });
      const isPasswordCorrect = verifyPassword(currentPassword, user.password);
      if (!isPasswordCorrect) {
        logger.warn('Invalid current password', { userId: id });
        return callback({
          code: status.PERMISSION_DENIED,
          message: 'Invalid current password',
        });
      }
    }

    // Prepare update data with only non-empty fields
    const updateData: any = {};
    
    if (hasProfileUpdate) {
      // Only include fields that have values
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          updateData[key] = value;
        }
      });
    }

    if (wantsPasswordChange) {
      try {
        updateData.password = hashPassword(newPassword);
      } catch (err) {
        logger.error('Failed to hash new password', { userId: id, error: err instanceof Error ? err.message : err });
        return callback({
          code: status.INTERNAL,
          message: 'Failed to hash new password',
        });
      }
    }
    if (Object.keys(updateData).length === 0) {
      logger.warn('No valid fields to update', { userId: id });
      return callback({
        code: status.INVALID_ARGUMENT,
        message: 'No valid fields to update',
      });
    }

    logger.debug('Updating user in database', { userId: id, updateData });
    let updatedUser;
    try {
      updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
      });
    } catch (err) {
      logger.error('Failed to update user in database' + JSON.stringify({ userId: id, error: err instanceof Error ? err.message : err }));
      return callback({
        code: status.INTERNAL,
        message: 'Failed to update user in database',
      });
    }

    logger.info('User updated successfully', { userId: updatedUser.id });
    
    // Helper function to safely parse JSON strings
    const safeJsonParse = (jsonString: string | null | undefined, defaultValue: any = []) => {
      if (!jsonString) return defaultValue;
      try {
        return JSON.parse(jsonString);
      } catch (e) {
        logger.warn('Failed to parse JSON string', { jsonString, error: e });
        return defaultValue;
      }
    };

    // Helper to safely convert dates to ISO string
    const toIsoString = (date: Date | string | null | undefined): string => {
      if (!date) return '';
      try {
        return date instanceof Date ? date.toISOString() : new Date(date).toISOString();
      } catch (e) {
        logger.warn('Failed to convert date to ISO string', { date, error: e });
        return '';
      }
    };

    // Build the response user object
    const responseUser = {
      id: updatedUser.id,
      firstName: updatedUser.firstName || '',
      lastName: updatedUser.lastName || '',
      email: updatedUser.email || '',
      phone: updatedUser.phone || '',
      createdAt: toIsoString(updatedUser.createdAt),
      dateOfBirth: toIsoString(updatedUser.dateOfBirth),
      gender: updatedUser.gender || '',
      updatedAt: toIsoString(updatedUser.updatedAt),
      isActive: !!updatedUser.isActive,
      isVerified: !!updatedUser.isVerified,
      role: updatedUser.role || 'user',
      lastLogin: toIsoString(updatedUser.lastLogin),
      permissions: safeJsonParse(updatedUser.permissions, []).join(','), // Convert array to string as per protobuf
      profilePictureUrl: updatedUser.profilePictureUrl || ''
    };

    return callback(null, {
      success: true,
      message: 'User updated successfully',
      user: responseUser
    });
  } catch (error) {
    logger.error('Error in UpdateUser', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return callback({
      code: status.INTERNAL,
      message: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
  }
};