import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getFirestore } from "firebase-admin/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");
    if (!session_id) return NextResponse.json({ error: "No session_id provided" }, { status: 400 });
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const meta = session.metadata;
    if (!meta || !meta.uid || !meta.service || !meta.date) {
      return NextResponse.json({ error: "Missing booking metadata" }, { status: 400 });
    }
    const db = getFirestore();
    await db.collection("bookings").add({
      uid: meta.uid,
      service: meta.service,
      consultationType: meta.consultationType || "online",
      date: meta.date,
      timeSlot: meta.timeSlot || "",
      remarks: meta.remarks || "",
      createdAt: new Date(),
      stripeSessionId: session_id,
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}