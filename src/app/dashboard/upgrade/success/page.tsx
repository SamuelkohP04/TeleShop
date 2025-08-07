// app/dashboard/upgrade/success/page.tsx
import { Suspense } from "react";
import UpgradeSuccessPage from "./ClientPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading upgrade page...</div>}>
      <UpgradeSuccessPage />
    </Suspense>
  );
}
