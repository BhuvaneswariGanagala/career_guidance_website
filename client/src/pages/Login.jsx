import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
const URL = "https://my-career-compass.onrender.com/api/auth/login";
export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const Navigate = useNavigate();
const {storeTokenInLS} = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            console.log("login form", res);
            if (res.ok) {
                const res_data = await res.json();
                // storing token in local storage
                // localStorage.setItem("token",res_data.token);
                storeTokenInLS(res_data.token);
                setFormData({ email: '', password: '' });
                alert("login successfull");
                Navigate("/");
            } else {
                alert("invalid credencials");
                console.log("invalid credencials");
            }

        } catch (error) {
            console.error("Login error:", error);
            alert("Failed to login. Check the console for more info.");
        }
    };

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center flex items-center justify-center p-4"
            style={{ backgroundImage: "url('/images/login_background.jpeg')" }}
        >
            <div className="flex flex-col md:flex-row w-[90%] max-w-4xl bg-opacity-80 rounded-lg overflow-hidden shadow-lg">
                {/* Left Side - Login */}
                <div className="w-full md:w-1/2 p-6 md:p-10 text-white">
                    <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
                    <p className="text-sm mb-8">
                        Step in. Discover your potential. Build your career.
                    </p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Password Field with Toggle */}
                        <div className="relative">
                            <input
                                // type={showPassword ? "text" : "password"}
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                            />
                            <div
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 mb-4"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-orange-400 hover:bg-orange-500 rounded-lg font-bold text-white"
                        >
                            Login
                        </button>
                        <p className="text-xs text-center mt-3 underline cursor-pointer">
                            Forgot Password?
                        </p>
                    </form>
                </div>

                {/* Right Side - Sign Up */}
                <div className="w-full md:w-1/2 p-6 md:pl-16 flex flex-col justify-center items-start text-left text-black bg-opacity-90">
                    <h2 className="text-2xl font-bold mb-4 md:ml-12">New Here?</h2>
                    <p className="mb-6 text-sm md:ml-12">
                        Unlock personalized guidance and powerful resources.
                        Sign up now and shape the career you deserve.
                    </p>
                    <a href="/register">
                        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg md:ml-12">
                            Sign Up
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};
