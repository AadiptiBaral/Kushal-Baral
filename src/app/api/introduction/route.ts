import Introduction from "@/models/introduction.model";
import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { uploadOnAWS } from "@/lib/uploadOnAWS";
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
    const introduction = await Introduction.findOne({}).lean();
    if (!introduction) {
      return NextResponse.json(
        { error: "Introduction not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(introduction, { status: 200 });
  } catch (error) {
    console.error("Error fetching introduction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await dbConnect();
     const formData = await request.formData();
    
    const introduction = formData.get('introduction') as string;
    const description = formData.get('description') as string;
    const descriptionTitle = formData.get('descriptionTitle') as string;
    const numberOfProjects = Number(formData.get('numberOfProjects'));
    const numberOfClients = Number(formData.get('numberOfClients'));
    const clientSatisfaction = Number(formData.get('clientSatisfaction'));
    const yearsOfExperience = Number(formData.get('yearsOfExperience'));
    const avatar = formData.get('avatar') as File;
    const resume = formData.get('resume') as File;

    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const location = formData.get('location') as string;

    const avatarKey = uploadOnAWS(avatar, "avatar");
    const resumeKey = uploadOnAWS(resume, "resume");
    const introductionData = {
        introduction,
        description,
        descriptionTitle,
        numberOfProjects,
        numberOfClients,
        clientSatisfaction,
        yearsOfExperience,
        avatar: (await avatarKey).key,
        resume: (await resumeKey).key,
        email,
        phone,
        location,
    }
    const newIntroduction = new Introduction(introductionData);
    await newIntroduction.save();
    return NextResponse.json(newIntroduction, { status: 201 });   
  } catch (error) {
    console.error("Error creating introduction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
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
    const introduction = await Introduction.findOneAndUpdate({}, data, {
      new: true,
      runValidators: true,
    });
    if (!introduction) {
      return NextResponse.json(
        { error: "Introduction not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(introduction, { status: 200 });
  } catch (error) {
    console.error("Error updating introduction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
