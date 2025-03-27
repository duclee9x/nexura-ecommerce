import * as crypto from 'crypto';

/**
 * Hashes a password using SHA-256 with a random salt
 * In a production environment, you should use a more secure algorithm like bcrypt or Argon2
 */
export function hashPassword(password: string): string {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

/**
 * Verifies a password against a hash
 */
export function verifyPassword(password: string, hashedPassword: string): boolean {
    const [salt, storedHash] = hashedPassword.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return storedHash === hash;
} 