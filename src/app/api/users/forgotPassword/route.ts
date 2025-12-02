//first we should connect to the DB
import { connect } from "@/src/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/src/models/userModel"
import { sendEmail } from "@/src/helpers/mailer"


connect()

export async function POST(request: NextRequest) {
    try {
        //first we will check if the user exist by comparing the data in the db with the email provided by the user
        const reqBody = await request.json()
        const { email } = reqBody
        //findOne just returns an object if found and not an array
        const user = await User.findOne({ email })
        if (user) {
            //what happens if the user is found we should send an email
            await sendEmail({ email, emailType: "RESET", userId: user._id })
            
        } else {
            throw new Error("not able to find the User! try other email")
        }
        return NextResponse.json({
        message: "Check your email",
        success: true
});
    } catch (err: unknown) {
        const mssg = err instanceof Error ? err.message : "Something went wrong"
        return NextResponse.json({err:mssg },{status:500})
    }
}