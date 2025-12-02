import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(request) {
    try {
        await connectDB();
        const {token,password} = await request.json();

        if(!token || !password){
            return NextResponse.json({message:"Token and password required"});
        }

        const user = await User.findOne({resetToken:token,resetTokenExpiry:{$gt:Date.now()}});

        if(!user){
            return NextResponse.json({message:"Invalid or expired token"},{status:400});
        }

        const hashed = await bcrypt.hash(password,10);
        user.password = hashed;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;


        await user.save();

        return NextResponse.json({message:"Password reset successful"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}