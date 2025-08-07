import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getFirestore } from "firebase-admin/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const session_id = searchParams.get("session_id");
    if (!session_id) return NextResponse.json({ error: "No session_id provided" }, { status: 400 });
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const meta = session.metadata;
    if (!meta || !meta.uid) {
      return NextResponse.json({ error: "Missing uid in metadata" }, { status: 400 });
    }
    const db = getFirestore();
    await db.collection("users").doc(meta.uid).update({ paymentPlan: "Enlightenment" });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 