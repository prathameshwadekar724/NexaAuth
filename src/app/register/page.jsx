"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import toast from "react-hot-toast";

export default function RegisterPage() {

    const router = useRouter();
    const [form,setForm] = useState({
        name:"",
        email:"",
        password:""
    });
    const [loading,setLoading] = useState(false);

    const handleChange = (e)=> setForm({...form,[e.target.name]:e.target.value});
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("/api/users/register",form);
            toast.success(res.data.message || "Registered");
            router.push("/");
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
            <h1 className="text-2xl font-bold text-center text-black">Register</h1>
            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-black"
            />
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
                {loading?"Creating...":"Register"}
            </button>
            <p className="text-sm text-center text-blue-600 cursor-pointer" onClick={()=>router.push("/")}>
                Already have an account? Login
            </p>
        </form>
    </main>
  )
}
