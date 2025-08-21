import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getFirestore } from "firebase-admin/firestore";

const stripeSecretKey = process.env.TEST_ENVIRONMENT === 'production'
  ? process.env.PROD_STRIPE_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not set in environment variables");
}
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-06-30.basil",
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