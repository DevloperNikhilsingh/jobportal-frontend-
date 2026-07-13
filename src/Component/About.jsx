import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Await } from 'react-router-dom';

const About = () => {

  const [placement, setPlacement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlacements = async() => {
      try {
         const response = await fetch('https://jobportal-backend-production-9a5e.up.railway.app/api/placements');
        if (!response.ok) throw new Error('Failed to fetch placements');
        const data = await response.json();

        setPlacement(data);
      } catch (error) {
         console.error('Error fetching placements:', error);
        setError('Failed to load placements');
      } finally{
        setLoading(false);
      }
    }
    fetchPlacements();
  }, []);

  return (
    <>
    <section id="about" className="py-16 px-4 overflow-hidden bg-white" >
                            <div className="max-w-7xl mx-auto">

                                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                                    {/* <!-- Left Content --> */}
                                    <motion.div 
                                        className="w-full lg:w-1/2"
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                    >

                                        <span
                                            className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
                                            ABOUT US
                                        </span>

                                        <h1 className="mt-6 text-5xl lg:text-7xl font-bold font-poppins leading-tight">
                                            Empowering Careers,
                                            <span
                                                className="bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-clip-text text-transparent">
                                                Building Futures.
                                            </span>
                                        </h1>

                                        <p className="mt-6 text-lg text-gray-600 font-inter leading-relaxed">
                                            IP TECH is a placement-driven career platform that connects
                                            talented individuals with trusted companies and helps them
                                            grow professionally through meaningful opportunities.
                                        </p>

                                        {/* <!-- Feature Points --> */}
                                        <div className="flex flex-wrap gap-8 mt-10">

                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                                                    👥
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Trusted by</h4>
                                                    <p className="text-sm text-gray-500">Thousands</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                                                    🏢
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Top Companies</h4>
                                                    <p className="text-sm text-gray-500">Hiring</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                                                    🚀
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">Grow Your</h4>
                                                    <p className="text-sm text-gray-500">Career</p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* <!-- Button --> */}

                                        <a href="#jobs"><motion.button
                                                className="mt-10 px-8 py-4 rounded-2xl text-white font-semibold bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA]"
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                Explore Opportunities →
                                            </motion.button></a>

                                    </motion.div>

                                    {/* <!-- Right Illustration --> */}
                                    <motion.div 
                                        className="w-full lg:w-1/2 relative flex justify-center items-center overflow-hidden"
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                    >

                                        {/* <!-- Bottom Right Glow --> */}
                                        <div
                                            className="absolute right-0 bottom-0 w-112.5 h-112.5 bg-violet-500/15 blur-[120px] rounded-full translate-x-24 translate-y-24">
                                        </div>

                                        {/* <!-- Top Right Dot --> */}
                                        <div
                                            className="absolute top-[15%] right-[10%] w-4 h-4 bg-violet-500 rounded-full animate-pulse">
                                        </div>

                                        {/* <!-- Bottom Right Dot --> */}
                                        <div
                                            className="absolute bottom-[20%] right-[15%] w-3 h-3 bg-purple-400 rounded-full animate-pulse">
                                        </div>

                                        {/* <!-- Image --> */}
                                        <motion.img 
                                            src="About_Herp.png" 
                                            alt="About Us"
                                            className="relative z-10 w-full max-w-162.5"
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                        />

                                    </motion.div>

                                </div>

                            </div>
                        </section>
                        
                         <section className="py-10 sm:py-16 px-4 overflow-hidden bg-white">
      <div className="w-full m-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <span className="inline-block font-inter text-violet-700 px-4 py-2 bg-violet-100 rounded-full text-center">
              Recent Placement
            </span>

            <motion.h1
              className="text-black mt-2 text-[17px] md:text-3xl font-bold font-poppins"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our <span className="text-violet-700">Students Placed </span>in Top
              Companies
            </motion.h1>
          </div>

          {/* Placement Cards */}
          {loading ? (
            <p className="text-center text-gray-500 mt-14">Loading placements...</p>
          ) : placement.length === 0 ? (
            <p className="text-center text-gray-500 mt-14">No placements yet.</p>
          ) : (
            <div
              id="placementContainer"
              className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-14"
            >
              {placement.map((p, index) => (
                <motion.div
                  key={p.id}
                  className="w-full rounded p-4 shadow-lg"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <div className="relative">
                    <img
                      src={p.imageUrl ? `https://jobportal-backend-production-9a5e.up.railway.app${p.imageUrl}` : "student.png"}
                      onError={(e) => {
                        e.target.src = "student.png";
                      }}
                      alt={p.studentName}
                      className="w-full h-64 object-cover object-top"
                    />

                    <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      ● Placed
                    </span>
                  </div>

                  <div className="p-4">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">
                      {p.studentName}
                    </h2>

                    <p className="text-violet-600 font-semibold mt-1 text-center">
                      {p.jobRole}
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-sm">
                      💰 {p.packageCtc}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                      📍 {p.location}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                      🎓 {p.batchYear}
                    </span>
                  </div>

                  <div className="mt-6 bg-violet-50 rounded-2xl p-4">
                    <p className="italic text-gray-700 text-center">
                      "{p.testimonial || "Dream. Learn. Achieve."}"
                    </p>

                    <p className="text-center text-sm text-violet-700 mt-2 font-semibold">
                      Successfully Placed at {p.companyName}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
                        
                        </>
  )
}

export default About
