
import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return NextResponse.json({ error: "No token provided" }, { status: 401 });
    const idToken = match[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const body = await req.json();
    const { fullname, username, dob, phone, email } = body;
    const db = getFirestore();
    await db.collection("users").doc(uid).set({
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
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
