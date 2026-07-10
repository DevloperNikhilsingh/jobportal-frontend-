import React, { useState } from "react";

const OtpForm = ({ email, role, onVerifySuccess }) => {

    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!otp.trim()) {
            setError("Please enter the OTP sent to your email.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://https://jobportal-backend-cm33.onrender.com/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                }),
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || "Invalid OTP");
            }

            onVerifySuccess();

        } catch (err) {
            console.error(err);
            setError(err.message || "OTP verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
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
                    Verify Your Email
                </h3>

                <p className="text-gray-500 dark:text-slate-400 text-sm">
                    Enter the OTP sent to <span className="font-semibold">{email}</span>
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm text-center">
                    {error}
                </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1">
                    <label
                        htmlFor="otpInput"
                        className="block text-xs uppercase tracking-wider text-gray-700 dark:text-slate-300 font-semibold font-poppins"
                    >
                        OTP Code
                    </label>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <i className="fa-solid fa-key"></i>
                        </div>

                        <input
                            type="text"
                            id="otpInput"
                            value={otp}
                            onChange={(e) => {
                                setOtp(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200 tracking-widest"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-[200%_auto] hover:bg-right text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2"
                >
                    <span>{loading ? "Verifying..." : "Verify OTP"}</span>
                    {!loading && <i className="fa-solid fa-circle-check text-xs"></i>}
                </button>
            </form>
        </div>
    );
};

export default OtpForm;
