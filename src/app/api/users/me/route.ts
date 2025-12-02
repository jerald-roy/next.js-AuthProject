import { connect } from "@/src/dbConfig/dbConfig"

import { getDataFromToken } from "@/src/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server"

import User from "@/src/models/userModel";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findById({ _id: userId }).select("-password -isAdmin")
        return NextResponse.json({
            message: "User found",
            data:user
        })
        
    } catch (error:unknown) {
        const mssg = error instanceof Error ? error.message : "Something went wrong"
        // you dont need toast here because here its just pure backend and the place where you call this route from the frontend is the place where you wanna actually use react toast
        return NextResponse.json({error:mssg},{status:500})
    }
}