"use server"
import dbConnect from "./connectDb"
import Introduction from "@/models/introduction.model"

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