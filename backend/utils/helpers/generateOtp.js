import crypto from 'crypto'

export function generateOtp(digits = 6) {
  const min = 10 ** (digits - 1);
  const max = 10 ** digits - 1;
  return String(crypto.randomInt(min, max + 1));
}