import { generateRandomToken } from "@/lib/token";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { sendEmail } from "@/utils/sendEmail";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const {email} = await request.json();
        if(!email){
            return NextResponse.json({message:"Email is required"},{status:400});
        }

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:"If that email exists, a reset link was sent"},{status:200});
        }
        const resetToken = generateRandomToken();
        const resetTokenExpiry = Date.now() + 1000 * 60 * 60;

        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;

        await user.save();

        const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword?token=${resetToken}`;

        await sendEmail({
            to:email,
            subject:"Reset your password",
            html:`
                <p>Hello</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>This link will expire in 1 hour.</p>
            `
        });

        return NextResponse.json({message:"If that email exists, a reset link was sent",success:true},{status:200});
    } catch (error) {
        return NextResponse.json({message:"Internal server error"},{status:500});
    }
}