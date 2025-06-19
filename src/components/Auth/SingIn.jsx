import React from "react";

const SignIn = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-gray-200 p-6">
            {/* Left Illustration Section - Hidden on small screens */}
            <div className="hidden md:flex flex-1 items-center justify-center p-10 h-full">
                <img
                    src="https://www.spiraltechnolabs.com/wp-content/uploads/2024/09/ecomshop-768x512.png"
                    alt="Illustration of e-commerce"
                    className="h-full w-full object-contain z-10"
                />
            </div>

          
            <div className="flex flex-1 flex-col  max-w-md  w-full rounded-lg shadow-2xl bg-[#ffffff7a] p-10 backdrop-blur-md">
                <h2 className="text-3xl text-start font-bold text-gray-800 mb-2">Hello,</h2>
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">Welcome back</h3>

                <form className="w-full space-y-5" autoComplete="off">
                    <div>
                        <label htmlFor="username" className="sr-only">Username or email</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username or email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-200"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition duration-200"
                            required
                        />
                    </div>

                    {/* Remember Me & Forgot Link */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2 accent-sky-600" />
                            Remember me
                        </label>
                        <a href="#" className="text-sky-600 hover:underline transition duration-150">Forgot password?</a>
                    </div>

                    {/* Submit Button */}
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
