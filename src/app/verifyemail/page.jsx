"use client"

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("Invalid verification link");
      return;
    }

    const verify = async () => {
      try {
        const res = await axios.post("/api/users/verifyemail", { token });
        toast.success(res.data.message);
        setStatus("Email verified! Redirecting to login...");
        setTimeout(() => router.push("/"), 2000);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Verification failed");
        setStatus("Verification failed");
      }
    };

    verify();
  }, [searchParams, router]);
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
            <h1 className="text-2xl font-bold mb-4 text-black">Email Verification</h1>
            <p className="text-black">{status}</p>
        </div>
    </main>
  )
}
