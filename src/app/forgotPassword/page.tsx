"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"


export default function ForgotPassword() {
    const [email, setEmail] = useState("")
    //here we will try to get the token from the URL (its the Password token)
    const [token, setToken] = useState("")

    function onSubmit() {
        axios.post('/api/users/forgotPassword' ,{ email , token})
            .then(res => {
                toast.success("check your email")
                console.log(res)
            })
            .catch (err => console.log(err))
    }
    useEffect(() => {
        async function gettingToken() {
            const urlToken = window.location.search.split("=")[1]
            setToken(urlToken || "")
        }
        gettingToken()
    },[])
    // useEffect(() => {
    //     async function 
    // },[token])
    return <>
    <div className="flex flex-col justify-center items-center min-h-screen text-2xl font-mono max-sm:text-xl sm:p-4">
            <div className="pb-2 text-center">enter the email for password verification</div>
            {/* <label htmlFor="email" className="pb-2">email</label> */}
              <input
            id="email"
            type="text"
            autoComplete="off"    
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="border border-white  p-3  focus:outline-none rounded-lg max-sm:pl-1 max-sm:pr-1"
            ></input>
            {
                email ? <div onClick={onSubmit} className="text-2xl max-sm:text-xl p-2 rounded-md mt-8 max-sm:p-1 cursor-pointer border-2">submit</div> :""}
            <Link href="/login">
            <button className="bg-blue-400 text-white p-2 rounded-md mt-8 max-sm:text-xl max-sm:p-1 cursor-pointer">
                Back
            </button></Link>
    </div>
    </>
}