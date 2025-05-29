 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store/auth";
const URL = "https://my-career-compass-website.onrender.com/api/auth/register";
export const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const Navigate = useNavigate();
    const {storeTokenInLS} = useAuth();
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(formData);
        const { username, email, password } = formData;

        if (!username || !email || !password) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            console.log("Response from backend:", res);

            if (res.ok) {
                const res_data = await res.json();
                console.log("res from server", res_data);
                // storing token in local storage
                storeTokenInLS(res_data.token);
                setFormData({ username: '', email: '', password: '' });
                alert("Registration successfull");
                Navigate("/login");
            } else {
                alert("Registration unsuccessfull please check the input fields");
                console.log("invalid credencials");
            }

        } catch (error) {
            console.error("Error during registration:", error);
            alert("Failed to register. Check the console for details.");
        }
    };


    return (
        <div className="flex flex-col md:flex-row justify-center items-center mt-10 px-6 md:px-20">
            {/* Illustration */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 flex justify-center">
                <img src="/images/login_img1.jpeg" alt="Login Illustration" className="w-80 md:w-96" />
            </div>

            {/* Login Form */}
            <div className="w-full md:w-1/2 max-w-md bg-blue-400 rounded-md p-8 shadow-lg">
                <div className="flex justify-center mb-4">
                    <div className="bg-white rounded-full p-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A4 4 0 017 15h10a4 4 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-center text-white text-2xl font-semibold mb-6">Register</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 mb-4 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 mb-6 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:text-lg transition duration-200 cursor-pointer">
                        Register
                    </button>
                </form>

                <p className="text-center text-white mt-4">
                    Don't have an account? <a className="text-white underline" href="/register">create</a>
                </p>
            </div>
        </div>
    );
};