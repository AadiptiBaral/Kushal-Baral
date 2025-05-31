import User from "@/models/user.model";
import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { otp } = await request.json();

    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get("session");
    if (!sessionCookie) {
      return NextResponse.json({ message: "Session expired" }, { status: 401 });
    }
    const { payload } = await jwtVerify(
      sessionCookie.value,
      new TextEncoder().encode(process.env.NEXTAUTH_SECRET)
    );
    if (!payload) {
      return NextResponse.json({ message: "Invalid session" }, { status: 401 });
    }
    const email = payload.email as string;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    if (new Date() > new Date(user.otpExpires)) {
      return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }
    if (user.otp !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }
    await User.findByIdAndUpdate(
      user._id,
      { isVerified: true, $unset: { otp: 1, otpExpires: 1 } },
      { new: true }
    );
    (await cookieStore).delete("session");
    return Response.json({ message: "OTP verified successfully" }, {status: 200});
  } catch (error) {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }
}
