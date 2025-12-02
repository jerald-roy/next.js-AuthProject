import User from "@/src/models/userModel";
import { NextRequest , NextResponse} from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const { token, password } = reqBody
        const salt = await bcrypt.genSalt(10)
        const hashedPassowrd = await bcrypt.hash(password, salt)
        //FIRST I NEED TO COMPARE THE TOKEN
        const user = await User.findOne({ forgotPasswordToken: token, forgotPasswordTokenExpiry: { $gt: Date.now() } })
        if (!user) {
            return NextResponse.json({error:"Invalid token"} , {status:400})
        }
        user.forgotPasswordToken =  undefined
        //  user.verifyToken = undefined
        user.forgotPasswordTokenExpiry = undefined
        user.password = hashedPassowrd
        await user.save()
        return NextResponse.json({
            message: "new password updated Successfully",
            sucess:true
        })
            
    } catch (err: unknown) {
        const mssg = err instanceof Error ? err.message : "Something went wrong"
        return NextResponse.json({err:mssg},{status:500})
    }
} 