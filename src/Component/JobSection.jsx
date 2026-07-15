import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, X } from 'lucide-react';

const JobSection = ({ filteredJobs, applyJob, scrollToApplyForm }) => {
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const handleApplyClick = (jobId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }
    scrollToApplyForm(jobId);
  };

  return (
    <section className="bg-[#f4f3f8] overflow-hidden py-6 px-4" id="jobs">
      <div className="w-full mt-8">
        <motion.h1
          className="text-3xl font-bold text-center font-[Poppins]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Latest Job By IP TECH
        </motion.h1>

        <div className="custom-scrollbar w-full overflow-x-auto mt-8">
          <div className="flex gap-6 w-max px-4 py-2">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="min-w-90 max-w-90 md:min-w-175 md:max-w-175 flex flex-col md:flex-row gap-6 bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              >
                <div className="shrink-0">
                  <img
                    src={job.imageUrl ? `${job.imageUrl}` : "/placeholder.jpg"}
                    alt={job.jobTitle}
                    className="w-full h-62.5 md:w-75 md:h-75 object-contain sm:object-cover object-top border-2 rounded-lg"
                  />
                </div>

                <div className="flex flex-col gap-2 min-w-0 flex-1 justify-center">
                  <h2 className="text-2xl font-bold truncate">{job.jobTitle}</h2>
                  <p className="text-gray-500 text-lg truncate">{job.companyName}</p>
                  <p className="truncate">📍 {job.location}</p>
                  <p className="truncate">💰 {job.salary}</p>
                  <p className="truncate">⏰ {job.workHour}</p>
                  <p
                    className="text-sm overflow-hidden"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                    title={job.skills}
                  >
                    🧑‍💻 {job.skills}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <motion.button
                      type="button"
                      onClick={() => handleApplyClick(job.id)}
                      className="px-4 py-2 rounded-xl cursor-pointer font-semibold text-white bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA]"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply Jobs
                    </motion.button>

                    <a href="tel:6392258503">
                      <motion.button
                        className="w-10 h-10 cursor-pointer flex items-center justify-center border rounded-full hover:bg-gray-400"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <img src="Call.svg" alt="Call" className="w-5 h-5" />
                      </motion.button>
                    </a>

                    <a href="https://wa.me/9161737428" target="_blank" rel="noopener noreferrer">
                      <motion.button
                        className="w-10 h-10 cursor-pointer flex items-center justify-center border rounded-full hover:bg-gray-400"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <img src="Whatsap.svg" alt="WhatsApp" className="w-5 h-5" />
                      </motion.button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-4 md:mt-12">
          <motion.button
            className="bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-200%_auto cursor-pointer hover:bg-right transition-all duration-500 w-50 h-8.75 rounded-xl text-white flex items-center justify-center gap-3 font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Recent Jobs
            <span>
              <img src="right-arrow-svgrepo-com.svg" alt="right arrow" className="w-6 h-6 rounded-2xl" />
            </span>
          </motion.button>
        </div>
      </div>

      {/* ---- Naya Login Prompt Modal ---- */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 mx-auto rounded-full bg-violet-100 flex items-center justify-center mb-4">
                <LogIn className="w-8 h-8 text-violet-600" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">Login Required</h3>
              <p className="text-gray-600 mb-6">
                Please login to your account before applying for this job.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default JobSection