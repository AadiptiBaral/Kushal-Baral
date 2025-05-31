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
    avatar: z.string().url("Invalid avatar URL").optional()
});

export type IntroductionInput = z.infer<typeof introductionSchema>;
