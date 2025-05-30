import User from "@/models/user.model";
import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { generateOtp, otpExpiry } from "@/lib/generateOtp";
import sendOtpEmail from "@/lib/sendEmail";
import scheduleUnverifiedUserRemoval from "@/lib/clearUser";
import mongoose from "mongoose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.NEXTAUTH_SECRET;

export  async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }
    if (password.length < 8) {
      return Response.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      otp: generateOtp(),
      otpExpires: otpExpiry(),
    });

    await sendOtpEmail(email, user.otp, "Verify your email address");

    void scheduleUnverifiedUserRemoval(
      (user._id as mongoose.Types.ObjectId).toString(),
      user.email
    );

    const token = await new SignJWT({
      _id: (user._id as mongoose.Types.ObjectId).toString(),
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("10m") // 10 minutes
      .sign(new TextEncoder().encode(JWT_SECRET));
    const cookieStore = await cookies();
    cookieStore.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10, // 10 minutes in seconds
      path: "/",
    });
    return Response.json(
      {
        message: "User created successfully. Please verify your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Failed to create user" },
      { status: 500 }
    );
  }
}
