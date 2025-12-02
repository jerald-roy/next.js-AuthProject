import { connect } from "@/src/dbConfig/dbConfig"
import User from "@/src/models/userModel"
import { NextRequest , NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const { email, password } = reqBody
        //check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({error:'user does not exist'} , {status:400})
        }
        //check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({error:"Invalid password"},{status:400})
        }
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email    
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        //now we need to add that token to the cookie
        const response = NextResponse.json({
            message: "Login successful",
            success:true,
        })

        response.cookies.set("token", token, {
            httpOnly:true
        })

        return response
        
    } catch (error: unknown) {
        const mssg = error instanceof Error ? error.message : "something went wrong"
        return NextResponse.json({error:mssg},{status:500})
    }
}