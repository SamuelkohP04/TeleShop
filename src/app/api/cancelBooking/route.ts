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
    const { bookingId } = await req.json();
    if (!bookingId) return NextResponse.json({ error: "No bookingId provided" }, { status: 400 });
    const db = getFirestore();
    const doc = await db.collection("bookings").doc(bookingId).get();
    // Check Firestore users collection for isAdmin property
    const userDoc = await db.collection("users").doc(uid).get();
    const isAdmin = userDoc.exists && userDoc.data()?.isAdmin === true;

    if (!doc.exists || (!isAdmin && doc.data()?.uid !== uid)) {
      return NextResponse.json({ error: "Booking not found or unauthorized" }, { status: 403 });
    }
    await db.collection("bookings").doc(bookingId).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 