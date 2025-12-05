"use client"
import Link from "next/link"
import { useState} from "react"

import  axios  from "axios"
import {toast} from "react-hot-toast"

export default function SignUp() {
    const [removeLoginButton , setRemoveLoginButton] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",
        username:""
    })
 
    const buttonDisabled = !(user.email.length > 0 && user.password.length > 0 && user.username.length > 0)
    
    const [loading, setLoading] = useState(false)
    
    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signUp', user)
            // console.log(response)
            console.log("SignUp success", response.data.message)
            toast.success("check your email!", {
                duration: 8000
            });
            
           
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message)
            } else {
                toast.error("Something went wrong")
            }
            console.log(`signup failed : ${err}`)
            
        } finally {
            setUser({
                email: "",
                password: "",
                username:""
            })
            setLoading(false)
            setRemoveLoginButton(true)
        }
    }
   
    return <div className="flex flex-col justify-center items-center min-h-screen text-2xl font-mono max-sm:text-xl sm:p-4">
        <h1 className="pb-4 font-bold text-4xl max-sm:text-2xl">{ loading ? "processing" : "SignUp"}</h1>
        <div className="border flex flex-col  p-4 rounded-md max-sm:p-2">
            <div className="flex flex-col pb-6">
              <label htmlFor="username" className="pb-2">username</label>
        <input
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
            className="border border-white  p-3  focus:outline-none rounded-lg max-sm:pl-1 max-sm:pr-1 "
        ></input>  
            </div>
            <div className="flex flex-col pb-6">
        <label htmlFor="email" className="pb-2">email</label>
        <input
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
                    className="border border-white  p-3  focus:outline-none rounded-lg max-sm:pl-1 max-sm:pr-1"
                    autoComplete="off"
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
        <button className={`p-2 mt-2 rounded-md max-sm:text-xl max-sm:p-1 ${buttonDisabled ? "text-white" : "text-black bg-white"}`} onClick={onSignup}>{buttonDisabled ? "need to fill all the fields" : "Signup"}</button>
        
        {buttonDisabled ? <p className="text-white">{removeLoginButton ? "":   "or"}</p> : ""}
        
        { removeLoginButton ? null :<Link href="/login" className="text-white pt-2">login</Link>}
    </div>
}
