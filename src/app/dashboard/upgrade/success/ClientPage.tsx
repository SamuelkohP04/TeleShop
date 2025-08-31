// app/dashboard/upgrade/success/ClientPage.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../../../../components/ui/button";

export default function UpgradeSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams?.get("session_id");
    if (!sessionId) {
      setError("No session ID provided");
      setLoading(false);
      return;
    }

    async function upgradePlan() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/upgradePlan?session_id=${sessionId}`);
        if (!res.ok) {
          const { error } = await res.json();
          throw new Error(error || "Failed to upgrade plan");
        }
        setSuccess(true);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    upgradePlan();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="w-full max-w-md bg-white/90 rounded-xl shadow-lg p-8 text-center">
        {loading && <div className="text-lg">Processing your upgrade...</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {success && !loading && (
          <>
            <h1 className="text-2xl font-bold mb-4">Upgrade Successful!</h1>
            <p className="mb-6">Your plan has been upgraded to Enlightenment.</p>
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          </>
        )}
      </div>
    </div>
  );
}
