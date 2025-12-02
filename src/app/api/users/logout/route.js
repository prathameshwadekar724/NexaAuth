import { NextResponse } from "next/server";

export async function GET() {
    const resp = NextResponse.json({message:"Logout successful",success:true},{status:200});

    resp.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0),
        path:"/"
    });

    return resp;
}