import { connect } from "@/src/dbConfig/dbConfig"
import User from "@/src/models/userModel"
import { NextRequest, NextResponse } from "next/server" 
import {sendEmail} from "@/src/helpers/mailer"
import bcrypt from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        //REACT-HOT-TOAST can be used here when user does not give us the proper information
        console.log(reqBody)
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json( {error:"user already exist"} , {status:400})
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassowrd = await bcrypt.hash(password, salt)
        //create a new User
      const newUser =  await new User({
            username,
            email,
            password:hashedPassowrd
      })
        const savedUser = await newUser.save()
        //before user is being completely finish of his sign up process we should send an email to the user to verify his email is valid
        await sendEmail({email , emailType:"VERIFY" ,userId:savedUser._id})
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Something went wrong!"
        return NextResponse.json({error:message},{status:500})
    }
} 