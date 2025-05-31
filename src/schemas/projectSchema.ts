import { z } from "zod";

export const projectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    longDescription: z.string().min(1, "Long description is required"),
    image: z.string().url("Invalid image URL"),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.object({
        id: z.string().uuid("Invalid UUID"),
        name: z.string().min(1, "Tag name is required"),
        color: z.enum(["blue", "purple"])
    })),
    status: z.string().min(1, "Status is required"),
    featured: z.boolean().default(false),
    year: z.number().int().min(1900).max(new Date().getFullYear() + 10),
    client: z.string().min(1, "Client is required"),
    duration: z.string().min(1, "Duration is required"),
    link: z.string().url("Invalid link URL")
});

export type ProjectInput = z.infer<typeof projectSchema>;
