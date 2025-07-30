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
    const { bookingId, newDate, newTimeSlot } = await req.json();
    if (!bookingId || !newDate) return NextResponse.json({ error: "Missing bookingId or newDate" }, { status: 400 });
    const db = getFirestore();
    const doc = await db.collection("bookings").doc(bookingId).get();
    if (!doc.exists || doc.data()?.uid !== uid) {
      return NextResponse.json({ error: "Booking not found or unauthorized" }, { status: 403 });
    }
    const updateData: any = { date: newDate };
    if (newTimeSlot) updateData.timeSlot = newTimeSlot;
    await db.collection("bookings").doc(bookingId).update(updateData);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 