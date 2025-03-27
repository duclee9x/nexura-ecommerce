import jwt, { SignOptions } from 'jsonwebtoken';
import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const accessTokenSecret = process.env.JWT_ACCESS_SECRET || 'access-secret';
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret';
const accessTokenExpiration = process.env.JWT_ACCESS_EXPIRATION || '15m';
const refreshTokenExpiration = process.env.JWT_REFRESH_EXPIRATION || '7d';

export const TokenPayloadSchema = z.object({
    userId: z.string(),
    email: z.string().email(),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

export function generateAccessToken(payload: TokenPayload): string | null {
    return jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiration } as SignOptions);
}

export function generateRefreshToken(payload: TokenPayload): string | null {
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshTokenExpiration } as SignOptions);
}

export function verifyAccessToken(token: string): TokenPayload | null {
    try {
        const decoded = jwt.verify(token, accessTokenSecret) as TokenPayload;
        return TokenPayloadSchema.parse(decoded);
    } catch (error) {
        return null;
    }
}

export function validateToken(metadata: any): string | null {
    const token = metadata.get('authorization')[0]?.replace('Bearer ', '');
    if (!token) return null;

    const payload = verifyAccessToken(token);
    return payload?.userId || null;
}

export function verifyRefreshToken(token: string): TokenPayload | null {
    try {
        const decoded = jwt.verify(token, refreshTokenSecret) as TokenPayload;
        return TokenPayloadSchema.parse(decoded);
    } catch (error) {
        return null;
    }
} 