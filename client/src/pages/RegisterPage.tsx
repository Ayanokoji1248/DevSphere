import { NavLink } from "react-router-dom"

const RegisterPage = () => {
    return (
        <div className="text-white border-[1px] border-zinc-500 shadow rounded-xl w-96 font-[Albert_Sans] flex flex-col justify-center p-5 gap-7 py-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Join DevSphere</h1>
                <p className="text-sm font-medium text-zinc-500">Create your developer profile and start connecting</p>
            </div>

            <div className="flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                    <label htmlFor="fullName" className="font-medium text-sm">Fullname</label>
                    <input type="text" className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300" placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="font-medium text-sm">Username</label>
                    <input type="text" className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300" placeholder="joe" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium text-sm">Email</label>
                    <input type="email" className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300" placeholder="john12@gmail.com " />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-medium text-sm">Password</label>
                    <input type="password" className="p-2 outline-none border-[1px] border-zinc-600 rounded-md focus:ring-2 focus:ring-white transition-all duration-300" placeholder="*******" />
                    <p className="text-sm text-zinc-300">(Minimum 8 characters)</p>
                </div>

                <button className="bg-white mt-2 text-black p-2 rounded-md font-medium cursor-pointer hover:bg-zinc-200 transition-all duration-300">Register</button>

                <p className="text-sm">Already have an account? <NavLink to={'/login'} className="font-bold text-blue-500">Login</NavLink></p>

            </div>

        </div>
    )
}

export default RegisterPage