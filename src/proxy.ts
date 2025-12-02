import { NextRequest, NextResponse } from "next/server";


export function proxy(request: NextRequest) {
    //we are finding out what path we are entering into using this below line
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signUp' || path === '/verifyemail' || path === '/verifyemailPass'

    /*
     so what you wanna exactly do with the middleware
     1.if somebody has the access token they should not be able to visit the public path like [singup , login]
     
     2.there are some protected path and those who have not logged it should not jump to those protected paths through the url
    */
    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/profile',request.url))
    }

    //we added verify to the public path because where verify is not public and there is no token with us it will redirect us to login page according to the below logic
    if (!isPublicPath && !token) {
        
        return NextResponse.redirect(new URL('/login',request.url))
    }
    
}   

//this matcher is very imp - it tell which are the routes this middleware should run for and without this matcher given this middleare logic goona run for every route
export const config = {
    matcher: [
        '/',
        '/profile',
        '/profile/:path*',
        '/login',
        '/signup',
        '/verifyemail',
        '/verifyemailPass'
    ]
}