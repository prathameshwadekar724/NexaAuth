import { generateRandomToken } from "@/lib/token";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmail";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        await connectDB();
        const {name,email,password} = await request.json();

        if(!name || !email || !password){
            return NextResponse.json({message:"All fields are required"},{status:400});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({message:"User already exists"},{status:400});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const verifyToken = generateRandomToken();
        const verifyTokenExpiry = Date.now() + 1000*60*60*24;

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            verifyToken,
            verifyTokenExpiry
        });


        const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail?token=${verifyToken}`;

        await sendEmail({
            to:email,
            subject:"Verify your email",
            html:`
            <p>Hello ${name}</p>
            <p>Click the link below to verify your email:</p>
            <a href="${verifyUrl}">${verifyUrl}</a>
            <p>This link will expire in 24 hours.</p>
            `
        });

        return NextResponse.json({message:"User registered successfully"},{status:201});
    } catch (error) {
        return NextResponse.json({message:"Internal server error"},{status:500})
    }
}