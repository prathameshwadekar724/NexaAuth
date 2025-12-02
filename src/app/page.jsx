"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";

export default function LoginPage() {

    const router = useRouter();
    const [form,setForm] = useState({
        email:"",
        password:""
    });
    const [loading,setLoading] = useState(false);

    const handleChange = (e)=> setForm({...form,[e.target.name]:e.target.value});
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("/api/users/login",form,{withCredentials:true});
            console.log(res.data.message);
            toast.success(res.data.message || "Logged in");
            router.push("/profile");
        } catch (error) {   
            toast.error(error?.response?.data?.message || "Something went wrong");
        }finally{
            setLoading(false);
        }
    }
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4" >
            <h1 className="text-2xl font-bold text-center text-black">Login</h1>
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-black"
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-black"
            />

            <button 
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {loading?"Logging in....":"Login"}
            </button>
            <p
            className="text-sm text-ceter text-blue-600 cursor-pointer"
            onClick={()=>router.push("/forgotpassword")}
            >
                Forgot password?
            </p>

            <p 
            className="text-sm text-center text-blue-600 cursor-pointer"
            onClick={()=>router.push("/register")}
            >
                Don&apos;t have an account? Register
            </p>
        </form>
    </main>
  )
}
