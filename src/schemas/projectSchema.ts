import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    longDescription: z.string().optional(),
    image: z.string().optional().or(z.literal("")),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.object({
        id: z.string(),
        name: z.string().min(1, "Tag name is required"),
    })),
    status: z.string(),
    featured: z.boolean(),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 10),
    client: z.string().min(1, "Client is required"),
    duration: z.string().optional(),
    link: z.string().optional().or(z.literal("")),
});

