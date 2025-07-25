import { useFormik } from "formik";
import axiosHandler from "../../config/Axioshandler";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/authcontext";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axiosHandler.post("/api/login", values);
        localStorage.setItem("tk", res?.data?.token);
        setToken(res?.data?.token);
        navigate("/admin");
        toast.success(res?.data?.message);
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      }
    },
  });

  return (
    <div className="relative w-full h-screen flex items-center justify-center p-6 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/manufacturing-productio.mp4"
      />

      <div className="relative z-20 flex flex-1 flex-col max-w-md justify-center h-auto w-full rounded-2xl shadow-2xl bg-[#e3e3e3] p-10">
        <div className="mb-8">
          <div className="w-full flex justify-center">
            <img className="w-26 h-20 " src="/logoCmpny.png" alt="" />
          </div>
          <h2 className="text-4xl text-center font-bold text-sky-700">
            Sign In
          </h2>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-6"
          autoComplete="off"
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="username"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-200"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-lg transition duration-300"
          >
            Login
          </button>

          {/* Separator */}
          <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
            <span className="w-1/4 h-px bg-gray-300" />
            or
            <span className="w-1/4 h-px bg-gray-300" />
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => navigate("/")}
            type="button"
            className="w-full py-3 border border-sky-500 text-sky-600 hover:bg-sky-600 hover:text-white font-semibold rounded-lg shadow-lg transition duration-300"
          >
            Back to Home Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
