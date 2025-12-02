// app/profile/page.js
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success(res.data.message || "Logout successful");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/users/me",{ withCredentials: true });
        setProfile(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-black">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-black">Profile</h1>

        {profile && (
          <>
            <p className="text-black">
              <span className="font-semibold text-black">Name:</span> {profile.name}
            </p>
            <p className="text-black">
              <span className="font-semibold text-black">Email:</span> {profile.email}
            </p>
            <p className="text-black">
              <span className="font-semibold text-black">Verified:</span>{" "}
              {profile.isVerified ? "Yes" : "No"}
            </p>
          </>
        )}

        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
