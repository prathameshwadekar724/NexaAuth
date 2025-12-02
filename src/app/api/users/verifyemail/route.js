import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const {token} = await request.json();
        if(!token){
            return NextResponse.json({message:"Token missing"},{status:400});
        }
        
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}});

        if(!user){
            return NextResponse.json({message:"Invalid or expired token"},{status:400});
        }

        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;

        await user.save();

        return NextResponse.json({message:"Email verified successfully",success:true},{status:200});
    } catch (error) {
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}