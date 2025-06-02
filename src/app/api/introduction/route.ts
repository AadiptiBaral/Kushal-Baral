import Introduction from "@/models/introduction.model";
import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { uploadOnAWS } from "@/lib/uploadOnAWS";
export async function GET() {
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

    const introduction = formData.get("introduction") as string;
    const description = formData.get("description") as string;
    const descriptionTitle = formData.get("descriptionTitle") as string;
    const numberOfProjects = Number(formData.get("numberOfProjects"));
    const numberOfClients = Number(formData.get("numberOfClients"));
    const clientSatisfaction = Number(formData.get("clientSatisfaction"));
    const yearsOfExperience = Number(formData.get("yearsOfExperience"));
    const avatar = formData.get("avatar") as File;
    const resume = formData.get("resume") as File;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;

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
    };
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

    // Check if request is multipart/form-data or JSON
    const contentType = request.headers.get("content-type") || "";
    let updateData: any = {};

    if (contentType.includes("multipart/form-data")) {
      // Handle FormData (with potential file uploads)
      const formData = await request.formData();

      // Process text fields
      const textFields = [
        "introduction",
        "description",
        "descriptionTitle",
        "email",
        "phone",
        "location",
      ];

      const numberFields = [
        "numberOfProjects",
        "numberOfClients",
        "clientSatisfaction",
        "yearsOfExperience",
      ];

      // Add text fields if they exist
      textFields.forEach((field) => {
        const value = formData.get(field) as string;
        if (value !== null && value !== "") {
          updateData[field] = value;
        }
      });

      // Add number fields if they exist
      numberFields.forEach((field) => {
        const value = formData.get(field) as string;
        if (value !== null && value !== "") {
          updateData[field] = Number(value);
        }
      });

      // Handle file uploads
      const avatar = formData.get("avatar") as File;
      const resume = formData.get("resume") as File;

      // Upload new avatar if provided
      if (avatar && avatar.size > 0) {
        try {
          const avatarResult = await uploadOnAWS(avatar, "avatar");
          updateData.avatar = avatarResult.key;
        } catch (error) {
          console.error("Error uploading avatar:", error);
          return NextResponse.json(
            { error: "Failed to upload avatar" },
            { status: 400 }
          );
        }
      }

      // Upload new resume if provided
      if (resume && resume.size > 0) {
        try {
          const resumeResult = await uploadOnAWS(resume, "resume");
          updateData.resume = resumeResult.key;
        } catch (error) {
          console.error("Error uploading resume:", error);
          return NextResponse.json(
            { error: "Failed to upload resume" },
            { status: 400 }
          );
        }
      }
    } else {
      // Handle JSON data (text-only updates)
      updateData = await request.json();
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No data provided for update" },
        { status: 400 }
      );
    }

    // Update the introduction
    const introduction = await Introduction.findOneAndUpdate({}, updateData, {
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
