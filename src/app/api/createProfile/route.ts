import { NextRequest, NextResponse } from "next/server";
import { Database } from 'firebase-firestore-lite';
import Auth from 'firebase-auth-lite';

export async function POST(req: NextRequest) {
  interface CreateProfileRequest {
    fullname: string;
    username: string;
    dob?: Date;
    phone: string;
    email: string;
  }

  try {
    const authHeader = req.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return NextResponse.json({ error: "No token provided" }, { status: 401 });
    
    const auth = new Auth({
      apiKey: process.env.FIREBASE_API_KEY ?? "string"
    });
    const body = await req.json();

    const { fullname, username, dob, phone, email } = body as CreateProfileRequest;
    const db = new Database({ projectId: process.env.FIREBASE_PROJECT_ID ?? "string", auth });
    
    const ref = db.ref('users');
    await ref.set({
      fullname,
      username,
      dob: dob ? new Date(dob) : null,
      phone,
      email,
      createdAt: new Date(),
      paymentPlan: "Basic",
      isAdmin: false, // Default to false, can be manually changed in database
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}