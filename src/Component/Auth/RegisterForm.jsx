import React, { useState } from "react";

const RegisterForm = ({ role, goToLogin, onRegisterSuccess }) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

        if (!formData.name || !formData.email || !formData.phone || !formData.password) {
            setError("Please fill all fields.");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("https://jobportal-backend-production-9a5e.up.railway.app/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    role: role === "seeker" ? "JOBSEEKER" : "EMPLOYER",
                }),
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || "Registration failed");
            }

            // Move to OTP verification screen, passing the email along
            onRegisterSuccess(formData.email);

        } catch (err) {
            console.error(err);
            setError(err.message || "Registration failed. Please try again.");
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
                    Create Account
                </h3>

                <p className="text-gray-500 dark:text-slate-400 text-sm">
                    Join IP TECH platform today
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm text-center">
                    {error}
                </div>
            )}

            {/* Register Form */}
            <form className="space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar px-1" onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="space-y-1">
                    <label
                        htmlFor="regName"
                        className="block text-xs uppercase tracking-wider text-gray-700 dark:text-slate-300 font-semibold font-poppins"
                    >
                        Full Name
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <i className="fa-regular fa-user"></i>
                        </div>

                        <input
                            type="text"
                            id="regName"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Nikhil Singh"
                            className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200"
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label
                        htmlFor="regEmail"
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
                            id="regEmail"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. nikhil@example.com"
                            className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200"
                        />
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                    <label
                        htmlFor="regPhone"
                        className="block text-xs uppercase tracking-wider text-gray-700 dark:text-slate-300 font-semibold font-poppins"
                    >
                        Phone Number
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <i className="fa-solid fa-phone-volume"></i>
                        </div>

                        <input
                            type="tel"
                            id="regPhone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. +91 98765 XXXXX"
                            className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label
                        htmlFor="regPassword"
                        className="block text-xs uppercase tracking-wider text-gray-700 dark:text-slate-300 font-semibold font-poppins"
                    >
                        Password
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <i className="fa-solid fa-lock"></i>
                        </div>

                        <input
                            type="password"
                            id="regPassword"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Min 6 characters"
                            className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200"
                        />
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                    <label
                        htmlFor="regConfirmPassword"
                        className="block text-xs uppercase tracking-wider text-gray-700 dark:text-slate-300 font-semibold font-poppins"
                    >
                        Confirm Password
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>

                        <input
                            type="password"
                            id="regConfirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Re-enter password"
                            className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200"
                        />
                    </div>
                </div>

                {/* Hidden Role */}
                <input type="hidden" value={role === "seeker" ? "JOBSEEKER" : "EMPLOYER"} />

                {/* Register Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-[200%_auto] hover:bg-right text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2 mt-4"
                >
                    <span>{loading ? "Registering..." : "Register Now"}</span>
                    {!loading && <i className="fa-solid fa-user-plus text-xs"></i>}
                </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6 text-xs text-gray-500 dark:text-slate-400">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={goToLogin}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                    Log In
                </button>
            </div>
        </div>
    );
};

export default RegisterForm;
