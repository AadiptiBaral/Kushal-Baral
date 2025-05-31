import { z } from "zod";

export const introductionSchema = z.object({
  introduction: z.string().min(1, "Introduction is required"),
  description: z.string().min(1, "Description is required"),
  descriptionTitle: z.string().min(1, "Description title is required"),
  numberOfProjects: z.number().int().min(0),
  numberOfClients: z.number().int().min(0),
  clientSatisfaction: z.number().min(0).max(100),
  yearsOfExperience: z.number().min(0),
  resume: z.string().url("Invalid resume URL"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  avatar: z.string().url("Invalid avatar URL").optional(),
});
export const introductionUpdateSchema = z.object({
  introduction: z.string().min(1, "Introduction cannot be empty").optional(),
  description: z.string().min(1, "Description cannot be empty").optional(),
  descriptionTitle: z
    .string()
    .min(1, "Description title cannot be empty")
    .optional(),
  numberOfProjects: z.number().int().min(0).optional(),
  numberOfClients: z.number().int().min(0).optional(),
  clientSatisfaction: z.number().min(0).max(100).optional(),
  yearsOfExperience: z.number().min(0).optional(),
  resume: z.string().min(1, "Resume cannot be empty").optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(1, "Phone cannot be empty").optional(),
  location: z.string().min(1, "Location cannot be empty").optional(),
  avatar: z.string().optional(),
});
export type IntroductionInput = z.infer<typeof introductionSchema>;
export type IntroductionUpdateInput = z.infer<typeof introductionUpdateSchema>;
