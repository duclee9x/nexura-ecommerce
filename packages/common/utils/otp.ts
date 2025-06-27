import { PrismaClient } from '@nexura/user-service/src/db/prisma-client'
import { createToken } from "@nexura/common/utils";
const prisma = new PrismaClient();

export const createOTP = async (email: string, type: string) => {
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.oTP.create({
        data: {
            email,
            type: type,
            otp: OTP,
            attemptCount: 0,
            isUsed: false,
            createdAt: new Date(),
            lastAttempt: new Date(),
        }
    });
    const token = createToken(email, OTP);
    return { OTP, token };
}