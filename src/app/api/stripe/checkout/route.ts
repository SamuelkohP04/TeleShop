import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import Stripe from "stripe";

const stripeSecretKey = process.env.TEST_ENVIRONMENT === 'production'
  ? process.env.PROD_STRIPE_SECRET_KEY
  : process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not set in environment variables");
}
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-07-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);

    if (!match) return NextResponse.json({ error: "No token provided" }, { status: 401 });

    const idToken = match[1];

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Enlightenment Membership Upgrade",
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?upgrade=cancel`,
      metadata: {
        uid,
      },
    });
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
} 