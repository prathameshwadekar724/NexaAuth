"use client";

import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        toast.error("Invalid link");
        router.push("/login");
        return;
      }

      try {
        const res = await axios.post("/api/users/verifyemail", { token });
        toast.success(res.data.message);
        router.push("/login");
      } catch (error) {
        toast.error("Invalid or expired link");
        router.push("/login");
      }
    };

    verify();
  }, [token]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-black">Verifying...</p>
    </main>
  );
}
