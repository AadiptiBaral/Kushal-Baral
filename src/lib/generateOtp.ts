import crypto from "crypto";
function generateOtp(): string {
  const min = Math.pow(10, 5);
  const max = Math.pow(10, 6) - 1;
  return crypto.randomInt(min, max).toString().padStart(6, "0");
}

function otpExpiry(): Date {
  return new Date(Date.now() + 10 * 60 * 1000);
}

export { generateOtp, otpExpiry };
