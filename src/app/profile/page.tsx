"use client"
import axios from "axios"
import { useState } from "react"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
export default function Profile() {
    const router = useRouter()
    const [userData , setUserData] = useState(null)
   async function logout() {
        try {
            await axios.get('/api/users/logout')
              toast.success("Successfully logged in!")
            router.push('/login')
          
        } catch (error:unknown) {
            const mssg = error instanceof Error ? error.message : "Something went wrong"
            console.log(mssg)
            toast.error(mssg)
            


        }
    }
    async function getUserDetails() {
        const res = await axios.get('/api/users/me')
        console.log(res.data.data._id)
        setUserData(res.data.data._id)
    }
    return <div className="flex min-h-screen justify-center items-center">
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-4xl">Profile</h1>
            <br />
            <p className="text-2xl">Profile page</p>
            <hr className=""></hr>
            <br />
           
            <br />
            <button className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 cursor-pointer" onClick={logout}>
                Logout
            </button>
            <button className="bg-blue-400 text-white p-2 mt-4 rounded-md hover:bg-blue-500 cursor-pointer" onClick={getUserDetails}>
                userDetails
            </button>
             <h2 className="text-blue-500 text-2xl pt-2">
                {userData ? <Link href={`/profile/${userData}`} >click me</Link>
                :""    
            }</h2>
        </div>
    </div>
}