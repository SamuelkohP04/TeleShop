import type { EmulatorEnv } from "firebase-auth-cloudflare-workers";
import { Auth, WorkersKVStoreSingle } from "firebase-auth-cloudflare-workers";
import { FetchEvent, KVNamespace } from "@cloudflare/workers-types/experimental";
import { verifyJWT } from "./firebase-auth-cloudflare"

declare global {
  const PROJECT_ID: string
  const PUBLIC_JWK_CACHE_KEY: string
  const PUBLIC_JWK_CACHE_KV: KVNamespace
  const FIREBASE_AUTH_EMULATOR_HOST: string
}

addEventListener('fetch', (event: FetchEvent) => {
  // Create env object for verifyIdToken API.
  const bindings: EmulatorEnv = {
    PROJECT_ID,
    PUBLIC_JWK_CACHE_KEY,
    PUBLIC_JWK_CACHE_KV,
    FIREBASE_AUTH_EMULATOR_HOST,
  }
  event.respondWith(verifyJWT(event.request, bindings))
})