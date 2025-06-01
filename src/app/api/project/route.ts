import Project from "@/models/projects.model";
import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { uploadOnAWS } from "@/lib/uploadOnAWS";
import { getSignedUrl } from "@/lib/uploadOnAWS";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        
        // Get category from URL search params
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        
        // Build query object
        let query = {};
        if (category && category !== 'All Projects') {
            // Case-insensitive regex match
            query = { category: { $regex: new RegExp(`^${category}$`, 'i') } };
        }
        
        const projects = await Project.find(query).lean();
        
        if (!projects || projects.length === 0) {
            return NextResponse.json([], { status: 200 });
        }
        
        // Generate signed URLs for images
        const projectsWithSignedUrls = await Promise.all(
            projects.map(async (project) => {
                if (project.image) {
                    try {
                        const signedUrl = await getSignedUrl(project.image);
                        return { ...project, imageUrl: signedUrl };
                    } catch (error) {
                        console.error(`Failed to get signed URL for project ${project._id}:`, error);
                        return { ...project, imageUrl: null };
                    }
                } else {
                    return { ...project, imageUrl: null };
                }
            })
        );
        
        return NextResponse.json(projectsWithSignedUrls, { status: 200 });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await dbConnect();
        const formData = await request.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const longDescription = formData.get("longDescription") as string;
        const category = formData.get("category") as string;
        const tagsString = formData.get("tags") as string;
        const status = formData.get("status") as string;
        const featured = formData.get("featured") === "true";
        const year = Number(formData.get("year"));
        const client = formData.get("client") as string;
        const duration = formData.get("duration") as string;
        const link = formData.get("link") as string;
        const image = formData.get("image") as File;

        let imageKey = "";
        if (image && image.size > 0) {
            const imageResult = await uploadOnAWS(image, "project");
            imageKey = imageResult.key;
        }

        const tags = tagsString ? JSON.parse(tagsString) : [];

        const projectData = {
            title,
            description,
            longDescription: longDescription || undefined,
            image: imageKey || undefined,
            category,
            tags,
            status,
            featured,
            year,
            client,
            duration: duration || undefined,
            link: link || undefined,
        };

        const project = await Project.create(projectData);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await dbConnect();

        const contentType = request.headers.get("content-type") || "";
        let updateData: any = {};

        if (contentType.includes("multipart/form-data")) {
            const formData = await request.formData();

            const textFields = [
                "title",
                "description", 
                "longDescription",
                "category",
                "status",
                "client",
                "duration",
                "link"
            ];

            textFields.forEach((field) => {
                const value = formData.get(field) as string;
                if (value !== null && value !== "") {
                    updateData[field] = value;
                }
            });

            const year = formData.get("year") as string;
            if (year !== null && year !== "") {
                updateData.year = Number(year);
            }

            const featured = formData.get("featured") as string;
            if (featured !== null) {
                updateData.featured = featured === "true";
            }

            const tagsString = formData.get("tags") as string;
            if (tagsString !== null && tagsString !== "") {
                updateData.tags = JSON.parse(tagsString);
            }

            const image = formData.get("image") as File;
            if (image && image.size > 0) {
                try {
                    const imageResult = await uploadOnAWS(image, "project");
                    updateData.image = imageResult.key;
                } catch (error) {
                    console.error("Error uploading image:", error);
                    return NextResponse.json(
                        { error: "Failed to upload image" },
                        { status: 400 }
                    );
                }
            }
        } else {
            updateData = await request.json();
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json(
                { error: "No data provided for update" },
                { status: 400 }
            );
        }

        const project = await Project.findOneAndUpdate({}, updateData, { 
            new: true, 
            runValidators: true 
        });
        
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json(project, { status: 200 });
    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await dbConnect();
        const project = await Project.findOneAndDelete({});
        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}