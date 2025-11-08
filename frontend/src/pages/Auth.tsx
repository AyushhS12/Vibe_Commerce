import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";

const API_URL = import.meta.env.VITE_API_URL as string; // your backend base URL

function Auth() {
    const [isLogin, setIsLogin] = useState(true); // toggle form type
    const location = useLocation()
    const auth = useAuth()
    useEffect(()=>{
        if(location.state==="login"){
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    },[location])
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    // handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isLogin) {
                // --- LOGIN ---
                const res = await axios.post(`${API_URL}/api/auth/login`, {
                    email: formData.email,
                    password: formData.password,
                });
                if(res.data.err){
                    toast.error(res.data.err as string)
                    return
                }
                console.log(res.data)
                auth.setValue(res.data)
                localStorage.setItem("token", res.data.token || "");
                toast.success("Login successful!");
                navigate("/");
            } else {
                // --- SIGNUP ---
                await axios.post(`${API_URL}/api/auth/signup`, {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                toast.success("Signup successful! Please log in.");
                setIsLogin(true);
            }
        } catch (err) {
            console.error(err);
            toast.error(
                "Something went wrong. Try again."
            );
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center text-gray-900">
            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
                {/* Header */}
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
                    {isLogin ? "Welcome Back 👋" : "Create an Account 🚀"}
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="Enter your name"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
                    >
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                {/* Toggle link */}
                <p className="text-center mt-5 text-sm text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-indigo-600 font-medium hover:underline"
                    >
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate("/")}
                        className="text-sm text-gray-500 hover:text-indigo-600"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>

            <footer className="mt-10 text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Vibe Commerce
            </footer>
        </div>
    );
}

export default Auth;
