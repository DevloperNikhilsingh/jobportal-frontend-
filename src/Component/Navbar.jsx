import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion";

export default function Navbar({ openAuthModal }) {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const popupRef = useRef(null);

    // Page load hote hi check karo login hai ya nahi
    useEffect(() => {
        const name = localStorage.getItem("userName");
        if (name) setUser({ name });
    }, []);

    // Popup ke bahar click karne par band ho jaye
    useEffect(() => {
        function handleClickOutside(e) {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setShowLogoutPopup(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRole");
        setUser(null);
        setShowLogoutPopup(false);
    };

    return (
        <motion.header 
            className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
        >
            <div className="max-w-7xl mx-auto px-5">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <motion.div 
                        className="flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                    >
                        <a href="/home">
                        <img
                            src="/Logo1.png"
                            alt="Logo"
                            className="w[100px] h-33.25 text-2xl"
                        />
                        </a>
                    </motion.div>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-10">

                        <motion.a 
                            href="/home"
                            className="text-black font-inter dark:text-white hover:text-orange-400  font-medium transition"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Home
                        </motion.a>

                        <motion.a 
                            href="#jobs"
                            class="text-black font-inter dark:text-white hover:text-orange-400 font-medium transition"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Job &amp; Opportunity
                        </motion.a>

                        <motion.a 
                            href="#about"
                            class="text-black font-inter dark:text-white hover:text-orange-400 font-medium transition"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            About
                        </motion.a>

                        <motion.a 
                            href="#contact"
                            class="text-black font-inter dark:text-white hover:text-orange-400  font-medium transition"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Contact
                        </motion.a>
                    </nav>

                    {/* Right Side */}
                    <div className="hidden md:flex items-center gap-5">

                        {user ? (
                            <div className="relative" ref={popupRef}>
                                <motion.div
                                    onClick={() => setShowLogoutPopup(!showLogoutPopup)}
                                    className="w-10 h-10 rounded-full bg-linear-to-r from-red-500 to-rose-600 text-white flex items-center justify-center font-semibold cursor-pointer select-none"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {user.name.charAt(0).toUpperCase()}
                                </motion.div>

                                {showLogoutPopup && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-12 bg-white shadow-lg rounded-xl py-2 w-36 border"
                                    >
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 rounded-lg"
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </div>
                        ) : (
                            <motion.button
                                onClick={openAuthModal}
                                className="px-6 py-2 rounded-full bg-linear-to-r from-red-500 to-rose-600 text-white text-sm font-semibold duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                Login
                            </motion.button>
                        )}

                    </div>

                    {/* Mobile Button */}

                    <motion.button
                        className="md:hidden"
                        onClick={() => setOpen(!open)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {open ? <X /> : <Menu />}
                    </motion.button>

                </div>

            </div>

            {/* Mobile Menu */}

            {open && (
                <motion.div 
                    className="md:hidden bg-white border-t"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >

                    <div className="flex flex-col py-5 ">

                        <a href="index.jsp"
                            class="text-black font-inter dark:text-white hover:text-orange-400  font-medium transition">
                            Home
                        </a>

                        <a href="#jobs"
                            class="text-black font-inter dark:text-white hover:text-orange-400 font-medium transition">
                            Job &amp; Opportunity
                        </a>

                        <a href="#about"
                            class="text-black font-inter dark:text-white hover:text-orange-400 font-medium transition">
                            About
                        </a>

                        <a href="#contact"
                            class="text-black font-inter dark:text-white hover:text-orange-400  font-medium transition">
                            Contact
                        </a>

                        <div className="px-6 mt-4">

                            {user ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-linear-to-r from-red-500 to-rose-600 text-white flex items-center justify-center font-semibold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <motion.button
                                        onClick={handleLogout}
                                        className="w-full rounded-full bg-linear-to-r from-red-500 to-rose-600 py-3 text-white"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Logout
                                    </motion.button>
                                </div>
                            ) : (
                                <motion.button 
                                    onClick={openAuthModal}
                                    className="w-full rounded-full bg-linear-to-r from-red-500 to-rose-600 py-3 text-white"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Login
                                </motion.button>
                            )}

                        </div>

                    </div>

                </motion.div>
            )}
        </motion.header>
    );
}