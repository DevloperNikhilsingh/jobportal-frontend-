import React from 'react'
import { motion } from 'framer-motion';

const HeroSection = ({searchTitle, setSearchTitle, searchLocation, setSearchLocation, searchJobs}) => {

  return (
    <section className="overflow-hidden">
                <div className="w-full rounded mx-auto px-6 lg:px-8 pt-10 pb-10 lg:pb-0 bg-cover bg-bottom" style={{
                    backgroundImage: "url('/HerroBannerLightMOde.png')",
                }}>
                    <div className="flex flex-col  lg:flex-row items-center justify-between gap-10">
                        {/* <!-- Left Content (Yaha lg:pb-10 add kiya hai taaki left UI ka spacing barakar rahe) --> */}
                        <motion.div 
                            className="w-full lg:w-[60%] lg:pb-10"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <motion.p 
                                className="leading-tight font-['Poppins'] font-bold text-lg uppercase tracking-wide"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            > YOUR GATEWAY TO SUCCESS</motion.p>

                            <motion.h1
                                className="typing mt-6 text-5xl lg:text-7xl font-inter font-bold text-black leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Learn. Apply. Grow.
                            </motion.h1>

                            <motion.p 
                                className="mt-6 text-2xl font-inter text-gray-700"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                Discover jobs, internships and career opportunities
                                from trusted companies.
                            </motion.p>

                            <motion.div 
                                className="mt-10 bg-white rounded-2xl shadow-md overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-4">
                                    {/* <!-- Search Box-1 --> */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search jobs by title"
                                            value={searchTitle}
                                            onChange={(e) => setSearchTitle(e.target.value)}
                                            className="p-5 outline-none "
                                        />

                                        {/* <!-- ye ek Suggestion box hai  --> */}
                                        <div id="titleSuggestions"
                                            className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg hidden z-50">
                                        </div>
                                    </div>
                                    {/* <!-- Search Box-2 --> */}
                                    <div className="relative">
                                        <select id="searchExp" className="p-5 outline-none ">
                                            <option>Your Experience</option>
                                            <option>Fresher</option>
                                            <option>1-2 Years</option>
                                            <option>3-5 Years</option>
                                        </select>
                                        {/* <!-- ye ek Suggestion Box hai  --> */}
                                        <div id="locationSuggestions"
                                            className="absolute left-0 right-0 bg-white border rounded-lg shadow-lg hidden z-50">
                                        </div>
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                        className="p-5 outline-none "
                                    />

                                    <motion.button
                                        onClick={searchJobs}
                                        className="rounded-xl font-semibold text-white bg-gradient-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA]"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        Search Jobs
                                    </motion.button>
                                </div>
                            </motion.div>

                            <motion.div 
                                className="overflow-hidden mt-16"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 1 }}
                            >
                                <h3 className="text-[24px] font-inter md:text-2xl font-semibold text-black">
                                    Top Placement Recruiter
                                </h3>

                                <div className="logo-track mt-4">
                                    <img src="Brand-1.jpg" className="h-10" />
                                    <img src="Brand-2.png" className="h-10" />
                                    <img src="Brand-3.png" className="h-10" />
                                    <img src="Brand-4.png" className="h-10" />
                                    <img src="Brand-6.png" className="h-10" />
                                    <img src="Brand-5.png" className="h-10" />
                                    <img src="Brand-7.png" className="h-10" />
                                    <img src="Brand-9.png" className="h-10" />
                                    <img src="Brand-8.png" className="h-10" />
                                    <img src="Brand-10.png.jpeg" className="h-10" />
                                    <img src="Brand-11.jpeg" className="h-10" />

                                    {/* <!-- Duplicate Logos --> */}
                                    <img src="Brand-9.png" className="h-10" />
                                    <img src="Brand-4.png" className="h-10" />
                                    <img src="Brand-5.png" className="h-10" />
                                    <img src="Brand-6.png" className="h-10" />
                                    <img src="Brand-10.png.jpeg" className="h-10" />
                                    <img src="Brand-2.png" className="h-10" />
                                    <img src="Brand-11.jpeg" alt="" className="h-10" />
                                    <img src="Brand-3.png" className="h-10" />
                                    <img src="Brand-1.jpg" className="h-10" />
                                    <img src="Brand-7.png" className="h-10" />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* <!-- Right Student Image --> */}
                        <motion.div 
                            className="hidden lg:flex lg:w-[40%] self-end items-end justify-end relative"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >

                            {/* <!-- Glow --> */}
                            <div
                                className="absolute w-112.5 h-[450px] bg-violet-500/20 blur-[120px] rounded-full animate-pulse-slow">
                            </div>

                            {/* <!-- Rotating Ring -->
                                        <!-- <div className="absolute w-[500px] h-[500px] rounded-full ring-animation"></div> --> */}

                            {/* <!-- Floating Dots --> */}
                            <div className="particle particle-1"></div>
                            <div className="particle particle-2"></div>
                            <div className="particle particle-3"></div>
                            <div className="particle particle-4"></div>
                            <div className="particle particle-5"></div>

                            {/* <!-- Student Image --> */}
                            <motion.img 
                                src="student.png" alt="Student"
                                className="h-[650px] object-contain block -mb-10 lg:-mb-[50px] floating-student relative z-10"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            />
                        </motion.div>

                    </div>
                </div>
            </section>
  )
}

export default HeroSection
