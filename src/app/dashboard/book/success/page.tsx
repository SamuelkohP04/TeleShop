import { Suspense } from "react";
import BookingSuccessPage from "./ClientPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingSuccessPage />
    </Suspense>
  );
}
