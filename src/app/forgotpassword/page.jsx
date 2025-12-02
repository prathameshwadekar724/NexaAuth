// app/forgot-password/page.js
"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/forgotpassword", { email });
      toast.success(res.data.message);

      setTimeout(()=>{
        router.push("/");
      },1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-black">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border rounded px-3 py-2 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </main>
  );
}
