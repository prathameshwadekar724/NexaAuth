import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Verifying...</p>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
