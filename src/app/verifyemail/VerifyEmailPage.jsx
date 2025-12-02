"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        toast.error("Invalid verification link");
        router.push("/login");
        return;
      }

      try {
        const res = await axios.post("/api/users/verifyemail", { token });
        toast.success(res.data.message);

        setTimeout(() => {
          router.push("/login");
        }, 1500);

      } catch (error) {
        toast.error(error.response?.data?.message || "Verification failed");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      {loading ? <p className="text-black">Verifying email...</p> : null}
    </main>
  );
}
