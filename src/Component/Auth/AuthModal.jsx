import React, { useState } from "react";
import RoleSelection from "./RoleSelection";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import OtpForm from "./OtpForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const AuthModal = ({ isOpen, onClose }) => {

  const [screen, setScreen] = useState("role");
  const [selectedRole, setSelectedRole] = useState("seeker");
  const [pendingEmail, setPendingEmail] = useState("");

  const closeModal = () => {
    setScreen("role");
    setSelectedRole("seeker");
    setPendingEmail("");
    onClose();
  };

  const handleBack = () => {
    if (screen === "login") {
      setScreen("role");
    } else if (screen === "register") {
      setScreen("login");
    } else if (screen === "otp") {
      setScreen("register");
    } else if (screen === "forgot") {
      setScreen("login");
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setScreen("login");
  };

  const goToRegister = () => {
    setScreen("register");
  };

  const goToLogin = () => {
    setScreen("login");
  };

  const goToForgotPassword = () => {
    setScreen("forgot");
  };

  const handleRegisterSuccess = (email) => {
    setPendingEmail(email);
    setScreen("otp");
  };

  const handleVerifySuccess = () => {
    setPendingEmail("");
    setScreen("login");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-300">

      <div
        onClick={closeModal}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      ></div>

      <div className="relative w-full max-w-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-200/50 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 font-inter">

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-white"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {screen !== "role" && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 font-semibold"
          >
            <i className="fa-solid fa-arrow-left-long"></i>
            Back
          </button>
        )}

        {screen === "role" && (
          <RoleSelection
            onSelectRole={handleRoleSelect}
          />
        )}

        {screen === "login" && (
          <LoginForm
            role={selectedRole}
            goToRegister={goToRegister}
            goToForgotPassword={goToForgotPassword}
          />
        )}

        {screen === "register" && (
          <RegisterForm
            role={selectedRole}
            goToLogin={goToLogin}
            onRegisterSuccess={handleRegisterSuccess}
          />
        )}

        {screen === "otp" && (
          <OtpForm
            email={pendingEmail}
            role={selectedRole}
            onVerifySuccess={handleVerifySuccess}
          />
        )}

        {screen === "forgot" && (
          <ForgotPasswordForm
            goToLogin={goToLogin}
          />
        )}

      </div>
    </div>
  );
};

export default AuthModal;