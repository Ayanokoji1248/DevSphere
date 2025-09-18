import { useState, type FormEvent } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"
import { userLogin } from "../schemas/auth.schema"
import Button from "../components/Button"
import { useAuthStore } from "../store/authStore"

const LoginPage = () => {

    const { login } = useAuthStore()

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState<{ [key: string]: string }>({})


    // const getUserFollowingList = async () => {
    //     try {
    //         const response = await axios.get(`${BACKEND_URL}/user/following`, {
    //             withCredentials: true
    //         });
    //         // console.log(response.data)
    //         setUserFollowing(response.data.userFollowing)
    //         // setFollowingUserList(response.data.userFollowing);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const result = userLogin.safeParse({
            email,
            password
        });

        if (!result.success) {
            const fieldErrors: { [key: string]: string } = {}
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0] as string] = err.message
                }
            })

            setError(fieldErrors);
            return
        }

        try {
            await login(email, password);
            toast.success("Login Successful", { duration: 1000 });
            setTimeout(() => navigate('/home'), 1200);
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong", { duration: 2000 })
        }
        setEmail("");
        setPassword("");

    }

    return (
        <>
            <Toaster />
            <div className="text-white border-[1px] border-zinc-500 shadow rounded-xl w-96 font-[Albert_Sans] flex flex-col justify-center p-5 gap-7 py-8">

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="text-sm font-medium text-zinc-500">Sign in to your account to continue</p>
                </div>
                <form onSubmit={(e: FormEvent) => handleLogin(e)} method="POST">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-medium text-sm">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300" placeholder="john12@gmail.com " />
                            {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password" className="font-medium text-sm">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300" placeholder="*******" />
                            <p className="text-sm text-zinc-300">(Minimum 8 characters)</p>
                            {error.password && <p className="text-red-500 text-xs">{error.password}</p>}
                        </div>

                        {/* <button onClick={handleLogin} className="bg-white mt-2 text-black p-2 rounded-md font-medium cursor-pointer hover:bg-zinc-200 transition-all duration-300">Login</button> */}

                        <Button type="submit" text="Login" variant="secondary" size="md" widthFull={true} className="font-medium rounded-md" />

                        <p className="text-sm">Don't have an account? <NavLink to={'/register'} className="font-bold text-blue-500">Register</NavLink></p>

                    </div>
                </form>

            </div>
        </>
    )
}

export default LoginPage