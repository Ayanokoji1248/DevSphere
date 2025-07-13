import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils";
import userStore from "../store/userStore";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { userRegisteration } from "../schemas/auth.schema";

const RegisterPage = () => {
    const navigate = useNavigate();
    const { setUser } = userStore();

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<{ [key: string]: string }>({});

    const handleRegister = async () => {
        try {
            // Validate with Zod
            const result = userRegisteration.safeParse({
                fullName,
                username,
                email,
                password,
            });

            if (!result.success) {
                const fieldErrors: { [key: string]: string } = {};
                result.error.issues.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as string] = err.message;
                    }
                });
                setError(fieldErrors);
                return;
            }

            // Clear previous errors
            setError({});

            // Send request
            const response = await axios.post(
                `${BACKEND_URL}/auth/register`,
                {
                    fullName,
                    username,
                    email,
                    password,
                },
                { withCredentials: true }
            );

            // Clear inputs
            setFullName("");
            setUsername("");
            setEmail("");
            setPassword("");
            setUser(response.data.user);

            toast.success("User Registered Successfully");

            setTimeout(() => {
                navigate("/home");
            }, 1500);
        } catch (error) {
            console.log(error);
            toast.error("Registration failed");
        }
    };

    return (
        <>
            <Toaster />
            <div className="text-white border-[1px] border-zinc-500 shadow rounded-xl w-96 font-[Albert_Sans] flex flex-col justify-center p-5 gap-7 py-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Join DevSphere</h1>
                    <p className="text-sm font-medium text-zinc-500">
                        Create your developer profile and start connecting
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fullName" className="font-medium text-sm">
                            Fullname
                        </label>
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            name="fullName"
                            type="text"
                            className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300"
                            placeholder="John Doe"
                        />
                        {error.fullName && (
                            <p className="text-red-500 text-xs">{error.fullName}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-medium text-sm">
                            Username
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            name="username"
                            type="text"
                            className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300"
                            placeholder="joe"
                        />
                        {error.username && (
                            <p className="text-red-500 text-xs">{error.username}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium text-sm">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
                            className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300"
                            placeholder="john12@gmail.com"
                        />
                        {error.email && (
                            <p className="text-red-500 text-xs">{error.email}</p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium text-sm">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            type="password"
                            className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300"
                            placeholder="*******"
                        />
                        <p className="text-sm text-zinc-300">(Minimum 8 characters)</p>
                        {error.password && (
                            <p className="text-red-500 text-xs">{error.password}</p>
                        )}
                    </div>

                    <button
                        onClick={handleRegister}
                        className="bg-white mt-2 text-black p-2 rounded-md font-medium cursor-pointer hover:bg-zinc-200 transition-all duration-300"
                    >
                        Register
                    </button>

                    <p className="text-sm">
                        Already have an account?{" "}
                        <NavLink to={"/login"} className="font-bold text-blue-500">
                            Login
                        </NavLink>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
