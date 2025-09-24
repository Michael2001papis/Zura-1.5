import CryptoJS from 'crypto-js';

// Constants
const SECRET_KEY = 'G.R.Solutions_2025_Security_Key_Ultra_Secure';
// const SALT_ROUNDS = 10;

// Hash password with salt
export function hashPassword(password: string): string {
  const salt = CryptoJS.lib.WordArray.random(128/8);
  const hash = CryptoJS.PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 10000
  });
  return salt.toString() + ':' + hash.toString();
}

// Verify password
export function verifyPassword(password: string, hashedPassword: string): boolean {
  const parts = hashedPassword.split(':');
  if (parts.length !== 2) return false;
  
  const salt = CryptoJS.enc.Hex.parse(parts[0]);
  const hash = CryptoJS.PBKDF2(password, salt, {
    keySize: 256/32,
    iterations: 10000
  });
  
  return hash.toString() === parts[1];
}

// Encrypt data for localStorage
export function encryptData(data: unknown): string {
  const jsonString = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
}

// Decrypt data from localStorage
export function decryptData(encryptedData: string): unknown {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const jsonString = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

// Generate secure token
export function generateSecureToken(): string {
  return CryptoJS.lib.WordArray.random(32).toString();
}

// Rate limiting
class RateLimiter {
  private attempts: Map<string, { count: number; lastAttempt: number }> = new Map();
  private readonly maxAttempts = 5;
  private readonly windowMs = 15 * 60 * 1000; // 15 minutes

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);

    if (!attempt) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Reset if window expired
    if (now - attempt.lastAttempt > this.windowMs) {
      this.attempts.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }

    // Check if max attempts reached
    if (attempt.count >= this.maxAttempts) {
      return false;
    }

    // Increment attempt count
    attempt.count++;
    attempt.lastAttempt = now;
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const rateLimiter = new RateLimiter();

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^0[0-9]{1,2}-?[0-9]{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}
