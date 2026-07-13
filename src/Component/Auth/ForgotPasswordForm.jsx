import React, { useState } from "react";

const ForgotPasswordForm = ({ goToLogin }) => {

    const [step, setStep] = useState("email"); // "email" -> "reset"
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    // Step 1: Send OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");

        if (!email) {
            setError("Please enter your email.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://jobportal-backend-production-9a5e.up.railway.app/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error("Email not found. Please check and try again.");
            }

            setStep("reset");
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Reset Password using OTP
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");

        if (!otp || !newPassword) {
            setError("Please enter OTP and new password.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://jobportal-backend-production-9a5e.up.railway.app/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            if (!response.ok) {
                throw new Error("Invalid or expired OTP. Please try again.");
            }

            // Show success toast
            setShowSuccessToast(true);

            setTimeout(() => {
                setShowSuccessToast(false);
                goToLogin();
            }, 2000);

        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">

            {/* Success Toast */}
            {showSuccessToast && (
                <div className="fixed top-6 right-6 z-[100] bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-xl shadow-lg flex items-center gap-2">
                    <i className="fa-solid fa-circle-check"></i>
                    Your password has been changed
                </div>
            )}

            {/* Heading */}
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-1">
                    {step === "email" ? "Forgot Password" : "Reset Password"}
                </h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm">
                    {step === "email"
                        ? "Enter your email to receive an OTP"
                        : `Enter the OTP sent to ${email}`}
                </p>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm text-center">
                    {error}
                </div>
            )}

            {/* Step 1: Email */}
            {step === "email" && (
                <form className="space-y-4" onSubmit={handleSendOtp}>
                    <div className="space-y-1">
                        <label
                            htmlFor="forgotEmail"
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
                                id="forgotEmail"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                placeholder="name@example.com"
                                className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-[200%_auto] hover:bg-right text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </form>
            )}

            {/* Step 2: OTP + New Password */}
            {step === "reset" && (
                <form className="space-y-4" onSubmit={handleResetPassword}>
                    <div className="space-y-1">
                        <label
                            htmlFor="resetOtp"
                            className="block text-xs uppercase tracking-wider text-gray-700 dark:text-slate-300 font-semibold font-poppins"
                        >
                            OTP
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <i className="fa-solid fa-key"></i>
                            </div>
                            <input
                                type="text"
                                id="resetOtp"
                                value={otp}
                                onChange={(e) => { setOtp(e.target.value); setError(""); }}
                                placeholder="Enter 6-digit OTP"
                                className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="resetNewPassword"
                            className="block text-xs uppercase tracking-wider text-gray-700 dark:text-slate-300 font-semibold font-poppins"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <i className="fa-solid fa-lock"></i>
                            </div>
                            <input
                                type="password"
                                id="resetNewPassword"
                                value={newPassword}
                                onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                                placeholder="••••••••"
                                className="w-full bg-gray-50 dark:bg-slate-950/40 border border-gray-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-600 dark:focus:border-indigo-500 outline-none transition duration-200"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-[200%_auto] hover:bg-right text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-500 transform active:scale-95 flex items-center justify-center gap-2"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            )}

            {/* Footer */}
            <div className="text-center mt-6 text-xs text-gray-500 dark:text-slate-400">
                Remembered your password?{" "}
                <button
                    type="button"
                    onClick={goToLogin}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;