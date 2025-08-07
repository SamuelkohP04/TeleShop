import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getFirestore } from "firebase-admin/firestore";
import validator from "validator";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-07-30.basil",
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
      remarks: validator.escape(String(meta.remarks || "")),
      createdAt: new Date(),
      stripeSessionId: session_id,
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}