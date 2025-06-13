import Contact from "@/models/contact.model";
import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const data = await request.json();
        const contact = await Contact.create(data);
        return NextResponse.json(contact, { status: 201 });
    } catch (error) {
        console.error("Error creating contact:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function GET() {
    try {
        await dbConnect();
        const contacts = await Contact.find({}).lean();
        if (!contacts || contacts.length === 0) {
           return NextResponse.json([], { status: 200 });
        }
        return NextResponse.json(contacts, { status: 200 });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}