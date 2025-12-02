import { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailPage";

export default function Page() {
  return (
    <Suspense fallback={<p>Verifying...</p>}>
      <VerifyEmailClient />
    </Suspense>
  );
}
