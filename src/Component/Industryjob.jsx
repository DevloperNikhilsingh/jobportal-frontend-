import React from 'react'
import { motion } from 'framer-motion';

const Industryjob = () => {
  const categories = [
    { emoji: "💻", name: "Web/App Development" },
    { emoji: "🎨", name: "Graphic Design" },
    { emoji: "📈", name: "Digital Marketing" },
    { emoji: "🎬", name: "Vedio Editing" },
    { emoji: "💰", name: "Sales" },
    { emoji: "🧑‍🏫", name: "Counsellor" },
    { emoji: "🏨", name: "Hotel Management" },
    { emoji: "🛎️", name: "Reception / Front Desk" },
    { emoji: "📞", name: "Tele Caller" },
    { emoji: "🔍", name: "SEO Expert" },
    { emoji: "🖥️", name: "Basic Computer Operator" },
    { emoji: "⌨️", name: "Data Entry Operator" },
    { emoji: "🧾", name: "Accounting" },
    { emoji: "📈", name: "Digital Marketing" }
  ];

  return (
    <section className="py-6 px-4" >
                <div className="mx-w-7xl mt-12">
                    <motion.h1 
                        className="text-3xl font-bold text-center font-poppins"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >Job On Demand</motion.h1>
                    <div className="custom-scrollbar w-full py-8 p-2 flex overflow-x-auto gap-8 mt-6 px-4">

                        {categories.map((category, index) => (
                          <motion.div
                            key={index}
                            className="min-w-37.5 flex flex-col gap-5 bg-white p-6 rounded-xl shadow-lg"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ y: -5, scale: 1.05 }}
                          >
                            {/* <!-- left --> */}
                            <div className="flex justify-center">
                                <h1 className="w-17.5 text-center p-2 bg-gray-200 rounded-lg">{category.emoji}</h1>
                            </div>
                            {/* <!-- right --> */}
                            <div>
                                <h1 className="text-[18px] font-inter font-semibold text-center">{category.name}</h1>
                            </div>
                          </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4 md:mt-6">
                        <motion.button
                            className="bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-200%_auto hover:bg-right transition-all duration-500 w-55.5 h-8.75 rounded-xl text-white flex items-center justify-center gap-3 font-bold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >View
                            All Job Category<span><img src="right-arrow-svgrepo-com.svg" alt="right arrow"
                                className="w-6 h-6 rounded-2xl" /></span></motion.button>
                    </div>
                </div>
            </section>
  )
}

export default Industryjob
