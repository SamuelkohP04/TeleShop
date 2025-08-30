import type { EmulatorEnv } from "firebase-auth-cloudflare-workers";
import { Auth, WorkersKVStoreSingle } from "firebase-auth-cloudflare-workers";
import { KVNamespace } from "@cloudflare/workers-types/experimental";

interface Bindings extends EmulatorEnv {
  PROJECT_ID: string
  PUBLIC_JWK_CACHE_KEY: string
  PUBLIC_JWK_CACHE_KV: KVNamespace
  FIREBASE_AUTH_EMULATOR_HOST: string
}

export const verifyJWT = async (req: Request, env: Bindings): Promise<Response> => {
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


export async function fetch(req: Request, env: Bindings) {
  return await verifyJWT(req, env)
}

export default { fetch };