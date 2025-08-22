import { NextRequest, NextResponse } from "next/server";
import type { EmulatorEnv } from "firebase-auth-cloudflare-workers";
import { Auth, WorkersKVStoreSingle } from "firebase-auth-cloudflare-workers";
import { KVNamespace } from "@cloudflare/workers-types/experimental";


interface Bindings extends EmulatorEnv {
  PROJECT_ID: string
  PUBLIC_JWK_CACHE_KEY: string
  PUBLIC_JWK_CACHE_KV: KVNamespace
  FIREBASE_AUTH_EMULATOR_HOST: string
}

const verifyJWT = async (req: Request, env: Bindings): Promise<Response> => {
  const authorization = req.headers.get('Authorization')
  if (authorization === null) {
    return new Response(null, {
      status: 400,
    })
  }
  const jwt = authorization.replace(/Bearer\s+/i, "")
  const auth = Auth.getOrInitialize(
    env.PROJECT_ID,
    WorkersKVStoreSingle.getOrInitialize(env.PUBLIC_JWK_CACHE_KEY, env.PUBLIC_JWK_CACHE_KV)
  )
  const firebaseToken = await auth.verifyIdToken(jwt, true)

  return new Response(JSON.stringify(firebaseToken), {
    headers: {
      "Content-Type": "application/json"
    }
  })
}


export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    console.log("match", match)

    if (!match) return NextResponse.json({ error: "No token provided" }, { status: 401 });
    const idToken = match[1];
    console.log("id token", idToken)

    const decoded = await adminAuth.verifyIdToken(idToken);
    const uid = decoded.uid;
    const body = await req.json();

    const { fullname, username, dob, phone, email } = body;
    const db = getFirestore();
    await db.collection("users").doc(uid).set({
      fullname,
      username,
      dob: dob ? new Date(dob) : null,
      phone,
      email,
      createdAt: new Date(),
      paymentPlan: "Basic",
      isAdmin: false, // Default to false, can be manually changed in database
    });
    return NextResponse.json({ success: true }, { status: 201 });
  } 
  
  catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}