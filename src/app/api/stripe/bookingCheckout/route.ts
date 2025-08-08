import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import Stripe from "stripe";
import validator from "validator";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
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
    const body = await req.json();
    const { service, date, timeSlot, remarks } = body;
    const sanitizedRemarks = validator.escape(String(remarks || ""));
    // Determine price based on service
    let unitAmount = 6800;
    if (service === "Tarot Card") unitAmount = 6800;
    else if (service === "Numerology") unitAmount = 6800;
    else if (service === "Tarot Card + Numerology") unitAmount = 11800;
    else if (service === "Auspicious Wedding Date") unitAmount = 8800;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Booking: ${service}`,
              description: remarks || undefined,
            },
            unit_amount: unitAmount, // price in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/book/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/book?cancel=1`,
      metadata: {
        uid,
        remarks: sanitizedRemarks,
        service,
        date,
        timeSlot,
      },
    });
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}