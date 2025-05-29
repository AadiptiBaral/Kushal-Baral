import z from "zod";

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 characters"),
  email: z.string().email("Invalid email address").toLowerCase(),
});
