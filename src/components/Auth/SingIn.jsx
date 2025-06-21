import { useFormik } from "formik";
import axiosHandler from "../../config/Axioshandler";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/authcontext";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";


const SignIn = () => {

    const navigate = useNavigate()
    const { setToken } = useAuthContext()
    const [showPassword, setShowPassword] = useState(false)
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                const res = await axiosHandler.post("/api/login", values)
                localStorage.setItem("tk", res.data.token)
                setToken(res.data.token);
                navigate('/admin')
                console.log(res?.data)
            } catch (error) {
                console.log(error)
            }
        }
    })



    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-gray-200 p-6">
            {/* Left Illustration Section - Hidden on small screens */}
            <div className="hidden md:flex flex-1 items-center justify-center p-10 h-full">
                <img
                    src="/ecommerce-web-page-concept-illustration.png"
                    alt="Illustration of e-commerce"
                    className="h-full w-full object-contain z-10"
                />
            </div>


            <div className="flex flex-1 flex-col  max-w-md  justify-center h-[70%] w-full rounded-lg shadow-2xl bg-[#ffffff7a] p-10 backdrop-blur-md">
                <h2 className="text-3xl text-start font-bold text-gray-800 mb-2">Hello,</h2>
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">Welcome back</h3>

                <form onSubmit={formik.handleSubmit} className="w-full space-y-5" autoComplete="off">
                    <div>
                        <label htmlFor="username" className="sr-only">Username or email</label>
                        <input
                            type="text"
                            id="username"
                            name="email"
                            placeholder="Enter your email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-200"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="  Enter Your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full px-4 py-3  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-200"
                            required
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3  ">{showPassword ? <Eye size={20} /> : <EyeOff size={20}  />} </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>


    );
};

export default SignIn;
