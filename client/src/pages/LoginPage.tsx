import axios, { isAxiosError } from "axios"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../utils"
import toast, { Toaster } from "react-hot-toast"
import userStore from "../store/userStore"

const LoginPage = () => {

    const { setUser } = userStore();

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                email,
                password
            }, { withCredentials: true })
            // console.log(response.data.user)
            setUser(response.data.user)
            setEmail("");
            setPassword("")
            toast.success("Login Successful", {
                duration: 1000
            })
            setTimeout(() => {
                navigate('/home')
            }, 1500)
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data.message || "Something Went Wrong", {
                    duration: 2000
                })
            }
            console.log(error)
            setEmail("")
            setPassword("")
        }
    }

    return (
        <>
            <Toaster />
            <div className="text-white border-[1px] border-zinc-500 shadow rounded-xl w-96 font-[Albert_Sans] flex flex-col justify-center p-5 gap-7 py-8">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="text-sm font-medium text-zinc-500">Sign in to your account to continue</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium text-sm">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300" placeholder="john12@gmail.com " />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium text-sm">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300" placeholder="*******" />
                        <p className="text-sm text-zinc-300">(Minimum 8 characters)</p>
                    </div>

                    <button onClick={handleLogin} className="bg-white mt-2 text-black p-2 rounded-md font-medium cursor-pointer hover:bg-zinc-200 transition-all duration-300">Login</button>

                    <p className="text-sm">Already have an account? <NavLink to={'/register'} className="font-bold text-blue-500">Login</NavLink></p>

                </div>

            </div>
        </>
    )
}

export default LoginPage