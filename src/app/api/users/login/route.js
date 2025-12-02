import { generateJWT } from "@/lib/auth-server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(request) {
    try {
        await connectDB();
        const {email,password} = await request.json();

        if(!email || !password){
            return NextResponse.json({message:"Email and password required"},{status:400})
        }

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({message:"Invalid credentials"},{status:400});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return NextResponse.json({message:"Invalid credentials"},{status:400});
        }

        if(!user.isVerified){
            return NextResponse.json({message:"Please verify your email first"},{status:403})
        }

        const token = generateJWT(user._id.toString());

        const resp = NextResponse.json({message:"Login Successful",success:true},{status:200});

        resp.cookies.set("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge:7*24*60*60,
            path:"/",
            maxAge:60*60*24
        });

        return resp;
    } catch (error) {
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}