import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getFirestore } from "firebase-admin/firestore";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const rawBody = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const uid = session.metadata?.uid;
    if (uid) {
      const db = getFirestore();
      await db.collection("users").doc(uid).update({ paymentPlan: "Enlightenment" });
    }
  }

  return NextResponse.json({ received: true });
} 