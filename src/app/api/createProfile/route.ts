import { NextRequest, NextResponse } from "next/server";
import type { EmulatorEnv } from "firebase-auth-cloudflare-workers";
import { Auth, WorkersKVStoreSingle } from "firebase-auth-cloudflare-workers";
import { ExecutionContext, FetchEvent, KVNamespace } from "@cloudflare/workers-types/experimental";
import { createFirestoreClient } from "firebase-rest-firestore";
import { Hono } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { csrf } from 'hono/csrf';
import { html } from 'hono/html';

interface Bindings extends EmulatorEnv {
  PROJECT_ID: string
  PUBLIC_JWK_CACHE_KEY: string
  PUBLIC_JWK_CACHE_KV: KVNamespace
  FIREBASE_AUTH_EMULATOR_HOST: string
}
export interface Env {
  PUBLIC_JWK_CACHE_KEY: KVNamespace; // Replace with your actual KV binding name
}

export async function verifyJWT(request: Request, env: Env) {
    if (!env.PUBLIC_JWK_CACHE_KEY) {
      console.error("KV binding PUBLIC_JWK_CACHE_KEY is missing!");
    }
    // read a key-value pair
    const value = await env.PUBLIC_JWK_CACHE_KEY.get('KEY');
    console.log("Value from KV:", value); 
    // list all key-value pairs
    const allKeys = await env.PUBLIC_JWK_CACHE_KEY.list();
    console.log("All keys in KV:", allKeys.keys);

    // return a Workers response
    return new Response(
      JSON.stringify({
        value: value,
        allKeys: allKeys,
      }),
    );
  } 



export async function POST(req: NextRequest) {
  try {
    // const authHeader = req.headers.get("authorization") || "";
    // const match = authHeader.match(/^Bearer (.+)$/);
    // console.log("match", match)

    // if (!match) return NextResponse.json({ error: "No token provided" }, { status: 401 });
    // const idToken = match[1];
    // console.log("id token", idToken)

    // Create the environment object
    const env: Bindings = {
      PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
      PUBLIC_JWK_CACHE_KEY: process.env.PUBLIC_JWK_CACHE_KEY || "",
      PUBLIC_JWK_CACHE_KV: process.env.PUBLIC_JWK_CACHE_KV as unknown as KVNamespace,
      FIREBASE_AUTH_EMULATOR_HOST: process.env.FIREBASE_AUTH_EMULATOR_HOST || "",
    };
    
    // Now this returns the decoded token directly
    const decoded = await verifyJWT(req as any, env);
    console.log("Decoded token:", decoded);
    
    // // Extract uid from the decoded token
    // const uid = decoded.uid;
    // console.log("User UID:", uid);
    
    // const body = await req.json();
    // const { fullname, username, dob, phone, email } = body;
    
    // const firestore = createFirestoreClient({
    //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    //   privateKey: process.env.FIREBASE_PRIVATE_KEY || "",
    //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
    // });

    // await firestore.collection("users").doc(uid).set({
    //   fullname,
    //   username,
    //   dob: dob ? new Date(dob) : null,
    //   phone,
    //   email,
    //   createdAt: new Date(),
    //   paymentPlan: "Basic",
    //   isAdmin: false,
    // });
    // console.log("User profile created successfully");
    // return NextResponse.json({ 
    //   success: true, 
    //   uid,
    //   user: decoded // Include the unpacked token data in response
    // }, { status: 201 });
  } 
  catch (error: any) {
    console.error("Error in POST:", error);
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}