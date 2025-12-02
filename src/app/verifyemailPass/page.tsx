"use client"

import axios from "axios"
import { useState , useEffect} from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

export default function VerifyEmailPass() {
    const [data, setData] = useState({
        newPassword: "",
        confirmPassword:""
    })
    const router = useRouter()
    const [token, setToken] = useState("")
      //as soon as the user see this page or loads this page run the below useEffect
            useEffect(() => {
                //we are trying to take the params from the URL
                async function gettingToken() {
                    const urlToken = window.location.search.split("=")[1]
                  setToken(urlToken || "")  
                } 
                gettingToken()
            }, [])
    function onSubmit() {
        // we will make sure that both newPassword and confirm Password both are present and both should be not empty
        if (data.newPassword.length == 0 || data.confirmPassword.length == 0) {
            toast.error("need to fill all the fields given")
            return
        }
        //should match 3 things here that is 1.is both the pass are same 2. is token valid 3.time limit
        if (!(data.newPassword === data.confirmPassword)) {
            toast.error("password not matching")
        }
        //we need to get the token from the URL
        axios.post('/api/users/verifyemailPass', { token, password: data.newPassword })
            .then((res) => {
                console.log(res)
                toast.success("password was updated successfully")
                router.push("/login")
            })
            .catch((err) => {
                console.log(err)
                toast.error("something went wrong")
            })
        
    }
    return <>
        <div className="flex flex-col justify-center items-center min-h-screen text-2xl font-mono max-sm:text-xl sm:p-4 ">
            <div className="border flex flex-col  p-4 rounded-md max-sm:p-2">
                    <p className="pb-2">Enter the new Password</p>
             <input
            id="newPassword"
            type="text"
            value={data.newPassword}
            onChange={(e)=>setData({...data , newPassword:e.target.value})}
            placeholder="new password"
            autoComplete="off"        
            className="border border-white  p-3  focus:outline-none rounded-lg max-sm:pl-1 max-sm:pr-1 max-sm:placeholder:text-lg"
                    
        ></input>
            <p className="pb-2 pt-4">confirm Password</p>
             <input
            id="confirmPassword"
            type="text"
            value={data.confirmPassword}
            onChange={(e)=>setData({...data , confirmPassword:e.target.value})}
                    placeholder="confirm password"
                    autoComplete="off"
            className="border border-white  p-3  focus:outline-none rounded-lg max-sm:pl-1 max-sm:pr-1 max-sm:placeholder:text-lg"
            ></input>
                <button className="mt-6 bg-blue-500 text-white p-2 max-sm:p-1 rounded-md cursor-pointer" onClick={onSubmit}
                >Submit</button>
            </div>
           
    </div>
    </>
}