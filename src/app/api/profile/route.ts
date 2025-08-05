import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";
import validator from "validator";

// Minimal CORS header for demonstration
export const OPTIONS = () => new NextResponse(null, { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, PATCH, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization' } });

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return NextResponse.json({ error: "No token provided" }, { status: 401 });
    const idToken = match[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const db = getFirestore();
    const doc = await db.collection("users").doc(uid).get();
    if (!doc.exists) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    return NextResponse.json(doc.data(), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return NextResponse.json({ error: "No token provided" }, { status: 401 });
    const idToken = match[1];
    const decoded = await adminAuth.verifyIdToken(idToken);
    if (!decoded.email_verified) return NextResponse.json({ error: "Email not verified" }, { status: 401 });
    const uid = decoded.uid;
    const body = await req.json();
    const { fullname, username, dob, phone } = body;
    const db = getFirestore();
    const updateData: Record<string, unknown> = {};
    if (fullname !== undefined) updateData.fullname = validator.escape(String(fullname));
    if (username !== undefined) {
      // Sanitize username (alphanumeric only)
      if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return NextResponse.json({ error: "Invalid username" }, { status: 400 });
      }
      updateData.username = username;
    }
    if (dob !== undefined) updateData.dob = dob ? new Date(validator.escape(String(dob))) : null;
    if (phone !== undefined) updateData.phone = validator.escape(String(phone));
    await db.collection("users").doc(uid).update(updateData);
    // Server-side logging
    console.log(`[${new Date().toISOString()}] User ${uid} updated profile:`, Object.keys(updateData));
    return NextResponse.json(updateData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}