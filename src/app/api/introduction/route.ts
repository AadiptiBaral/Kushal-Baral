import Introduction from "@/models/introduction.model";
import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
export async function GET(request: NextRequest) {
const session = await getServerSession(authOptions);
if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
    try {
        await dbConnect();
        const introduction = await Introduction.findOne({}).lean();
        if (!introduction) {
        return NextResponse.json({ error: "Introduction not found" }, { status: 404 });
        }
        return NextResponse.json(introduction, { status: 200 });
    } catch (error) {
        console.error("Error fetching introduction:", error);
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
        const data = await request.json();
        const introduction = await Introduction.create(data);
        return NextResponse.json(introduction, { status: 201 });
    } catch (error) {
        console.error("Error creating introduction:", error);
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
        const data = await request.json();
        const introduction = await Introduction.findOneAndUpdate({}, data, { new: true, runValidators: true });
        if (!introduction) {
            return NextResponse.json({ error: "Introduction not found" }, { status: 404 });
        }
        return NextResponse.json(introduction, { status: 200 });
    } catch (error) {
        console.error("Error updating introduction:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
