import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";
//JwtPayload is a built in type from the jsonwebtoken package 
import type { JwtPayload } from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || ''

        const decodedToken = Jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload | string

        if (typeof decodedToken === 'string') throw new Error("Invalid Token")
        
        return decodedToken.id
    } catch (error:unknown) {
        const mssg = error instanceof Error ? error.message : "something went wrong"
        throw new Error(mssg)
    }
}