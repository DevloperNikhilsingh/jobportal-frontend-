import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Faq = () => {
    const [openfaq, setOpenfaq] = useState(null);
    const toggleFaq = (id) => {
        setOpenfaq((prev) => (prev === id ? null : id));
    };
    return (
        <section id="faq" class="relative z-10 max-w-5xl mx-auto px-4 pb-28 mt-16">
            <div class="text-center mb-12">
                <motion.h2 
                    class="text-3xl font-bold font-poppins text-black dark:text-white mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >Frequently
                    Asked Questions</motion.h2>
                <p class="text-gray-500 dark:text-slate-400 text-sm">Find fast answers to common
                    inquiries about IP TECH.
                </p>
            </div>

            <div class="space-y-4" id="faqContainer">

                {/* <!-- FAQ item 1 --> */}
                <motion.div
                    class="bg-gray-50 border border-gray-200 dark:bg-[#0d1626]/50 dark:border-slate-800/80 rounded-2xl overflow-hidden transition duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                    <motion.button 
                        type="button" 
                        onClick={() => toggleFaq(1)}
                        class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <span
                            class="text-sm md:text-base font-semibold text-slate-900 dark:text-white font-poppins">How
                            is
                            IP TECH different from standard job portals?</span>
                        <span id="faq-icon-1"
                            className={`transition-all duration-300 ${openfaq === 1
                                ? "rotate-45 text-purple-600 dark:text-purple-400"
                                : "rotate-0 text-indigo-600 dark:text-indigo-400"
                            }`}><i
                                class="fa-solid fa-plus"></i></span>
                    </motion.button>
                    <motion.div id="faq-answer-1"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: openfaq === 1 ? "auto" : 0, opacity: openfaq === 1 ? 1 : 0 }}
                        className={`px-6 text-xs md:text-sm text-gray-600 dark:text-slate-400 leading-relaxed border-t border-gray-200 dark:border-slate-800/40 overflow-hidden ${openfaq === 1 ? "pt-4 pb-6" : ""}`}
                    >
                        IP TECH is built on a placement-driven approach. We establish close corporate
                        alliances, offer
                        verified career mentorship, and host dynamic recruiter pipelines that directly
                        link talent with real
                        job opportunities.
                    </motion.div>
                </motion.div>

                {/* <!-- FAQ item 2 --> */}
                <motion.div
                    class="bg-gray-50 border border-gray-200 dark:bg-[#0d1626]/50 dark:border-slate-800/80 rounded-2xl overflow-hidden transition duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                    <motion.button 
                        type="button" 
                        onClick={() => toggleFaq(2)}
                        class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <span
                            class="text-sm md:text-base font-semibold text-slate-900 dark:text-white font-poppins">Is
                            there a fee for job seekers to apply on IP TECH?</span>
                        <span id="faq-icon-2"
                            className={`transition-all duration-300 ${openfaq === 2
                                ? "rotate-45 text-purple-600 dark:text-purple-400"
                                : "rotate-0 text-indigo-600 dark:text-indigo-400"
                            }`}><i
                                class="fa-solid fa-plus"></i></span>
                    </motion.button>
                    <motion.div id="faq-answer-2"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: openfaq === 2 ? "auto" : 0, opacity: openfaq === 2 ? 1 : 0 }}
                        className={`px-6 text-xs md:text-sm text-gray-600 dark:text-slate-400 leading-relaxed border-t border-gray-200 dark:border-slate-800/40 overflow-hidden ${openfaq === 2 ? "pt-4 pb-6" : ""}`}
                    >
                        No! Browsing jobs, uploading resumes, and applying for vacancies on IP TECH is
                        completely free for
                        all job seekers.
                    </motion.div>
                </motion.div>

                {/* <!-- FAQ item 3 --> */}
                <motion.div
                    class="bg-gray-50 border border-gray-200 dark:bg-[#0d1626]/50 dark:border-slate-800/80 rounded-2xl overflow-hidden transition duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                    <motion.button 
                        type="button" 
                        onClick={() => toggleFaq(3)}
                        class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <span
                            class="text-sm md:text-base font-semibold text-slate-900 dark:text-white font-poppins">How
                            can
                            employers partner with IP TECH?</span>
                        <span id="faq-icon-3"
                            className={`transition-all duration-300 ${openfaq === 3
                                ? "rotate-45 text-purple-600 dark:text-purple-400"
                                : "rotate-0 text-indigo-600 dark:text-indigo-400"
                            }`}><i
                                class="fa-solid fa-plus"></i></span>
                    </motion.button>
                    <motion.div id="faq-answer-3"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: openfaq === 3 ? "auto" : 0, opacity: openfaq === 3 ? 1 : 0 }}
                        className={`px-6 text-xs md:text-sm text-gray-600 dark:text-slate-400 leading-relaxed border-t border-gray-200 dark:border-slate-800/40 overflow-hidden ${openfaq === 3 ? "pt-4 pb-6" : ""}`}
                    >
                        Employers can submit recruitment requests using our custom "Want to Hire"
                        dashboard on the home
                        page, or switch to the Employer tab on this contact form to request custom
                        placement partnerships.
                    </motion.div>
                </motion.div>

                {/* <!-- FAQ item 4 --> */}
                <motion.div
                    class="bg-gray-50 border border-gray-200 dark:bg-[#0d1626]/50 dark:border-slate-800/80 rounded-2xl overflow-hidden transition duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                    <motion.button 
                        type="button" 
                        onClick={() => {toggleFaq(4)}}
                        class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <span
                            class="text-sm md:text-base font-semibold text-slate-900 dark:text-white font-poppins">What
                            is
                            the typical response time?</span>
                        <span id="faq-icon-4"
                            className={`transition-all duration-300 ${openfaq === 4
                                ? "rotate-45 text-purple-600 dark:text-purple-400"
                                : "rotate-0 text-indigo-600 dark:text-indigo-400"
                            }`}><i
                                class="fa-solid fa-plus"></i></span>
                    </motion.button>
                    <motion.div id="faq-answer-4"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: openfaq === 4 ? "auto" : 0, opacity: openfaq === 4 ? 1 : 0 }}
                        className={`px-6 text-xs md:text-sm text-gray-600 dark:text-slate-400 leading-relaxed border-t border-gray-200 dark:border-slate-800/40 overflow-hidden ${openfaq === 4 ? "pt-4 pb-6" : ""}`}
                    >
                        Our team strives to process all tickets and message requests within 4 working
                        hours during standard
                        business hours.
                    </motion.div>
                </motion.div>

            </div>
        </section>
    )
}

export default Faq