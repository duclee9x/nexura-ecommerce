import jwt, { type SignOptions } from 'jsonwebtoken';
import { z } from 'zod';
import dotenv from 'dotenv';

import { randomInt, randomBytes, pbkdf2Sync } from 'crypto';

dotenv.config();

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

if (!accessTokenSecret || !refreshTokenSecret) {
  throw new Error('JWT secrets are not set in environment variables');
}

// Type assertions to guarantee string type for secrets
const accessSecret: string = accessTokenSecret;
const refreshSecret: string = refreshTokenSecret;

const accessTokenExpiration = process.env.JWT_ACCESS_EXPIRATION || '15m';
const refreshTokenExpiration = process.env.JWT_REFRESH_EXPIRATION || '7d';

export const TokenPayloadSchema = z.object({
  userId: z.string(),
  email:  z.string().email(),
});

export type TokenPayload = z.infer<typeof TokenPayloadSchema>;

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, accessSecret, { expiresIn: accessTokenExpiration } as SignOptions);
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, refreshSecret, { expiresIn: refreshTokenExpiration } as SignOptions);
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, accessSecret) as TokenPayload;
    return TokenPayloadSchema.parse(decoded);
  } catch (error) {
    return null;
  }
}

export function validateToken(token: string): { emailFromToken: string, userIdFromToken: string } | null {
  if (!token) return null;

  const payload = verifyAccessToken(token);
  return payload ? { emailFromToken: payload.email, userIdFromToken: payload.userId } : null;
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, refreshSecret) as TokenPayload;
    return TokenPayloadSchema.parse(decoded);
  } catch (error) {
    return null;
  }
} 


const JWT_SECRET = process.env.JWT_ACCESS_SECRET ?? 'access-secret';
const JWT_EXPIRES_IN = '60m'; // Token expires in 60 minutes

export function createToken(email: string, otp: string): string {
  return jwt.sign(
    { email, otp },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token: string): { email: string; otp: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; otp: string };
  } catch (error) {
    return null;
  }
} 


export function generateOTP(length: number = 6): string {
  const digits = '0123456789'
  let otp = ''
  
  for (let i = 0; i < length; i++) {
    const randomIndex = randomInt(0, digits.length)
    otp += digits[randomIndex]
  }
  
  return otp
} 


/**
 * Hashes a password using SHA-256 with a random salt
 * In a production environment, you should use a more secure algorithm like bcrypt or Argon2
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifies a password against a hash
 */
export function verifyPassword(password: string, hashedPassword: string): boolean {
  const [ salt, storedHash ] = hashedPassword.split(':');
  if (!salt || !storedHash) return false;
  const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return storedHash === hash;
}