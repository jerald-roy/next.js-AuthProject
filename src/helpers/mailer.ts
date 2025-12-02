import nodemailer from 'nodemailer'
import User from '../models/userModel'
import bcryptjs from 'bcryptjs'

type SendEmailParams = {
    email: string;
    emailType: "VERIFY" | "RESET";
    userId : string
}
export async function sendEmail({email , emailType  , userId  }: SendEmailParams) {
    try {
       //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        // console.log(userId)
        if (emailType === "VERIFY") {
             await User.findByIdAndUpdate(userId, {
            verifyToken: hashedToken,
            verifyTokenExpiry:Date.now() + 3600000
        }  )} else if (emailType === "RESET") {
             await User.findByIdAndUpdate(userId, {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry:Date.now() + 3600000
             }  )
        }
       
        const transporter = nodemailer.createTransport({
             host: "sandbox.smtp.mailtrap.io",
             port: 2525,
             auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD
            }
        })

         let mailOptions
        if (emailType == "VERIFY") {
            mailOptions = {
            from: 'jeraldroyj143@gmail.com',
            to: email,
            subject: "Verify your email",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to  verify your email </p>`
              } 
        } else {
              mailOptions = {
            from: 'jeraldroyj143@gmail.com',
            to: email,
            subject: "Reset your password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemailPass?token=${hashedToken}">here</a> to reset your password </p>`
            } 
        }

        await transporter.sendMail(mailOptions)
   } catch (error:unknown) {
       const mssg = error instanceof Error ? error.message : "something went wrong"
       throw new Error(mssg)
   }
}