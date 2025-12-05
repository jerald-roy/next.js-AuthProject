"use client"

import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { useEffect } from "react"
// import { url } from "inspector"
import { toast } from "react-hot-toast"

export default function VerifyEmailPage() {
    
    const [error, setError] = useState(false)
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    console.log("hello")
   //as soon as there is change in the token run the below useEffect
    useEffect(() => {
        if (token.length > 0) {
            async function verifyUserEmail() {
                try {
              console.log("just before connection")
                    const response = await axios.post('/api/users/verifyemail', {token})
                    console.log(response)
                    console.log("after the connection")
            
            setVerified(true)
              toast.success("successfully signed in!");
        } catch (error: unknown) {
            const mssg = error instanceof Error ? error.message : "Something went wrong"
                    setError(true)
                    console.log("failed connection")
            console.log(`error : ${mssg}`)
        }
           }  
        verifyUserEmail()  
        }
    
    },[token])
    
    //as soon as the user see this page or loads this page run the below useEffect
    useEffect(() => {
        //we are trying to take the params from the URL
        console.log("hello")
        async function gettingToken() {
            const urlToken = window.location.search.split("=")[1]
          setToken(urlToken || "")  
        } 
        gettingToken()
    }, [])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 mt-2 text-black bg-red-500 rounded-md">{token ? `${token}` : "no token"}</h2>
            {verified && (
                <div>
                    <h2 className="text-2xl pt-4">
                        Email Verified
                    </h2>
                    <div className="text-2xl mt-4 text-blue-500">
                    <Link href="/login">
                    Login
                    </Link>
                    </div>
                    
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl pt-4">
                        Error
                    </h2>
                    <div className="text-blue-500">
                       <Link href="/signUp ">
                    Signup
                    </Link>
                    </div>
                    
                </div>
            )}
        </div>
    )
}