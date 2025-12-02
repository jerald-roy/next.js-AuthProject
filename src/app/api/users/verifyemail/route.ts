import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/src/dbConfig/dbConfig"
import User from "@/src/models/userModel";
connect()


export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const { token } = reqBody
        //the problem is at this point that is during the signup itself 
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
        
        if (!user) {
            return NextResponse.json({error:"Invalid Token"},{status:400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined
     
        await user.save()
  
        return NextResponse.json({
            message: "Email verified successfully",
            success:true
        })

    } catch (error:unknown) {
        const mssg = error instanceof Error ? error.message : "Something went wrong"
        return NextResponse.json({error:mssg} , {status:500})
    }
}
