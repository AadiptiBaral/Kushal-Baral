import { z } from "zod";

export const contactSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required")
});

export type ContactInput = z.infer<typeof contactSchema>;
