import { z } from "zod";

export const resume_schema = z.instanceof(File).refine((file) => [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
].includes(file.type), {
  message: "Resume must be a PDF or Word document",
});

export const avatar_schema = z.instanceof(File).refine((file) => [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/gif",
].includes(file.type), {
  message: "Avatar must be an image file (JPEG, PNG, JPG, GIF)",
});

export const introductionSchema = z.object({
  introduction: z.string().min(1, "Introduction is required"),
  description: z.string().min(1, "Description is required"),
  descriptionTitle: z.string().min(1, "Description title is required"),
  numberOfProjects: z.number().int().min(0),
  numberOfClients: z.number().int().min(0),
  clientSatisfaction: z.number().min(0).max(100),
  yearsOfExperience: z.number().min(0),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
});

export type IntroductionInput = z.infer<typeof introductionSchema>;