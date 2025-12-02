import { NextResponse } from "next/server";

export async function GET() {
   try {
       const response = NextResponse.json({
           message: "logout successful",
           success:true
       })
       response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
       return response
   } catch (error:unknown) {
       const mssg = error instanceof Error ? error.message : "Something went wrong"
       return NextResponse.json({error:mssg},{status:500})
   } 
}