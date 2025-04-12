import crypto from 'crypto'

export function generateOTP(length: number = 6): string {
  const digits = '0123456789'
  let otp = ''
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length)
    otp += digits[randomIndex]
  }
  
  return otp
} 