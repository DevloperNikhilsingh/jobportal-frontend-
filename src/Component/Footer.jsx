import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AdminLoginModal from './AdminLoginModal'

const Footer = () => {
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
  
  return (
    <>
      <AdminLoginModal 
        isOpen={isAdminLoginOpen} 
        onClose={() => setIsAdminLoginOpen(false)} 
      />
      <footer className="bg-[#0F172A] text-white py-6 px-4 overflow-x-hidden" >

                            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 py-6">

                                {/* <!-- Box-1 --> */}
                                <motion.div 
                                    className="flex flex-col"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >

                                    {/* <!-- Logo --> */}
                                    <div className="mb-4">
                                        <a href="/home"><img src="logo2.png" alt="IP TECH Logo"
                                            className="w-36 h-auto object-contain -mb-15.75" />
                                            </a>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-7">
                                        Find the right opportunity, showcase your skills, and get hired faster.
                                        <span className="font-semibold text-gray-300">IP TECH</span> helps job
                                        seekers and employers connect through a simple, reliable,
                                        and placement-driven platform.
                                    </p>

                                </motion.div>

                                {/* <!-- Box-2 --> */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <h2 className="text-xl font-bold font-poppins">Quick Links</h2>

                                    <div className="flex flex-col gap-3 mt-6">
                                        <a href="index.jsp" className="hover:text-violet-400 transition">Home</a>
                                        <a href="#jobs" className="hover:text-violet-400 transition">Job &amp;
                                            Opportunity</a>
                                        <a href="#about" className="hover:text-violet-400 transition">About Us</a>
                                        <a href="#contact" className="hover:text-violet-400 transition">Contact Us</a>
                                    </div>
                                </motion.div>

                                {/* <!-- Box-3 --> */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                >
                                    <h2 className="text-xl font-bold font-poppins">For Employers</h2>

                                    <div className="flex flex-col gap-3 mt-6">
                                        <a href="#" className="hover:text-violet-400 transition">Post Job</a>
                                        <a href="#" className="hover:text-violet-400 transition">Browse Candidates</a>
                                        <a href="#" className="hover:text-violet-400 transition">Pricing</a>
                                        <a href="#" className="hover:text-violet-400 transition">FAQs</a>
                                    </div>
                                </motion.div>

                                {/* <!-- Box-4 --> */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    <h2 className="text-xl font-bold font-poppins">For Job Seekers</h2>

                                    <div className="flex flex-col gap-3 mt-6">
                                        <a href="#" className="hover:text-violet-400 transition">Browse Jobs</a>
                                        <a href="#" className="hover:text-violet-400 transition">Job Alerts</a>
                                        <a href="#" className="hover:text-violet-400 transition">Career Advice</a>
                                        <a href="#" className="hover:text-violet-400 transition">FAQs</a>
                                    </div>
                                </motion.div>

                                {/* <!-- Box-5 --> */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                >
                                    <h2 className="text-xl font-bold font-poppins">Follow Us</h2>

                                    <div className="flex flex-wrap items-center gap-3 mt-6">

                                        <motion.img 
                                            src="LinkedIn (2).svg" 
                                            alt="LinkedIn"
                                            className="w-10 h-10 rounded-full bg-white p-2 shadow-md cursor-pointer transition duration-300"
                                            whileHover={{ scale: 1.1 }}
                                        />

                                        <motion.img 
                                            src="Twitter.svg" 
                                            alt="Twitter"
                                            className="w-10 h-10 rounded-full bg-white p-2 shadow-md cursor-pointer transition duration-300"
                                            whileHover={{ scale: 1.1 }}
                                        />

                                        <motion.img 
                                            src="Instagram.svg" 
                                            alt="Instagram"
                                            className="w-10 h-10 rounded-full bg-white p-2 shadow-md cursor-pointer transition duration-300"
                                            whileHover={{ scale: 1.1 }}
                                        />

                                        <motion.img 
                                            src="Facebook (2).svg" 
                                            alt="Facebook"
                                            className="w-10 h-10 rounded-full bg-white p-2 shadow-md cursor-pointer transition duration-300"
                                            whileHover={{ scale: 1.1 }}
                                        />

                                    </div>
                                </motion.div>

                            </div>

                            {/* Admin Login Button */}
                            <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-gray-800 flex justify-end">
                                <motion.button
                                    onClick={() => setIsAdminLoginOpen(true)}
                                    className="text-xs text-gray-500 hover:text-violet-400 transition"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Admin Login
                                </motion.button>
                            </div>

                        </footer>
    </>
  )
}

export default Footer
