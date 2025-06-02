"use server"
import dbConnect from "./connectDb"
import Introduction from "@/models/introduction.model"
import Project from "@/models/projects.model";
export async function fetchInstruction() {
    try{
        await dbConnect();
        const introduction = await Introduction.findOne({}).lean();
        if (!introduction) {
           return null;
        }
        return introduction;
    } catch (error) {
        throw new Error("Failed to fetch introduction data")
    }
}

export async function getFeaturedProjects() {
try {
    await dbConnect();
    const projects = await Project.find({ featured: true }).lean();
    if (!projects || projects.length === 0) {
        return [];
    }
    
} catch (error) {
    
}
}

