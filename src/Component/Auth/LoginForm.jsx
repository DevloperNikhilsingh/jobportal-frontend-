import React, { useState } from "react";

const LoginForm = ({ role, goToRegister, goToForgotPassword }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            setError("Please enter email and password.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://https://jobportal-backend-cm33.onrender.com/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userRole", data.role || (role === "seeker" ? "JOBSEEKER" : "EMPLOYER"));
            localStorage.setItem("userName", data.name || formData.email.split("@")[0]);
            localStorage.setItem("userEmail", formData.email);

            window.location.reload();

        } catch (err) {
            console.error(err);
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
            {/* Heading */}
            <div className="text-center mb-6">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 ${role === "seeker"
                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                            : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                        }`}
                >
                    {role === "seeker" ? "Job Seeker" : "Employer"}
                </span>

                <h3 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-1">
                    Account Login
                </h3>

                <p className="text-gray-500 dark:text-slate-400 text-sm">
                    Enter your credentials below
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm text-center">
                    {error}
                </div>
            )}

            {/* Login Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="space-y-1">
                    <label
                        htmlFor="loginEmail"
                        className="block text-xs uppercase tracking-wider text-gray-700 dark:text-slate-300 font-semibold font-poppins"
                    >
                        Email Address
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <i className="fa-regular fa-envelope"></i>
                        </div>

                        <input
                            type="email"
                            id="loginEmail"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="name@example.com"
                            className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="loginPassword"
                            className="block text-xs uppercase tracking-wider text-gray-700 dark:text-slate-300 font-semibold font-poppins"
                        >
                            Password
                        </label>

                        <button
                            type="button"
                            onClick={goToForgotPassword}
                            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <i className="fa-solid fa-lock"></i>
                        </div>

                        <input
                            type="password"
                            id="loginPassword"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200"
                        />
                    </div>
                </div>

                {/* Hidden Role */}
                <input type="hidden" value={role === "seeker" ? "JOBSEEKER" : "EMPLOYER"} />

                {/* Login Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-[200%_auto] hover:bg-right text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2"
                >
                    <span>{loading ? "Logging in..." : "Log In"}</span>

                    {!loading && <i className="fa-solid fa-arrow-right-to-bracket text-xs"></i>}
                </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6 text-xs text-gray-500 dark:text-slate-400">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={goToRegister}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default LoginForm;