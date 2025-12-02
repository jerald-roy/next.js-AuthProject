"use client"
import Link from "next/link"
import {useState} from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function Login() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const buttonDisabled = !(user.email.length >  0  &&  user.password.length > 0)
    const onLogin = async () => {
        
        try {
            setLoading(true)
            const response = await axios.post("/api/users/login", user)
            console.log(response.data.message)
            toast.success("logged in successfully!")
            router.push("/profile")

        } catch (error:unknown) {
            const mssg = error instanceof Error ? error.message : "Something went wrong"
            toast.error(mssg)
        } finally {
            setLoading(false)
            setUser({
                email: "",
                password:""
            })
        }

    }
    return <div className="flex flex-col justify-center items-center min-h-screen text-2xl font-mono max-sm:text-xl sm:p-4">
        <h1 className="pb-4 font-bold text-4xl max-sm:text-2xl">{loading ? "Processing" :"Login"}</h1>
        <div className="border flex flex-col  p-4 rounded-md max-sm:p-2">
            <div className="flex flex-col pb-6">
        <label htmlFor="email" className="pb-2">email</label>
        <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            className="border border-white  p-3  focus:outline-none rounded-lg max-sm:pl-1 max-sm:pr-1"
        ></input>
            </div>
            <div className="flex flex-col pb-6">
        <label htmlFor="password" className="pb-2">password</label>
        <input
            id="password"
            type="text"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            className="border border-white  p-3  focus:outline-none rounded-lg max-sm:pl-1 max-sm:pr-1 max-sm:placeholder:text-lg"
        ></input>
            </div>
      
        </div>
        <button className={`p-2 mt-2 rounded-md max-sm:text-xl max-sm:p-1 ${buttonDisabled ? "text-white" : "text-black bg-white"}`} onClick={onLogin}>{buttonDisabled ?"fill in all the details" :"Login"}</button>
        <Link href="/signUp" className="text-white pt-2">visit Signup</Link>
        <Link href="/forgotPassword" className="text-white pt-4">forgotPassword</Link>
    </div>
}
