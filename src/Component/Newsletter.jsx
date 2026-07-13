import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('https://jobportal-backend-production-9a5e.up.railway.app/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      alert('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      console.error('Subscribe error:', err);
      alert(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section class="mt-12 " >
                            <div
                                class="w-full mx-auto  overflow-hidden bg-linear-to-br from-white via-violet-50 to-purple-100 ">

                                <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 p-8 lg:p-16">

                                    {/* <!-- Left Content --> */}
                                    <motion.div 
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                    >

                                        <span
                                            class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-200 text-violet-700 font-medium">
                                            ✉️ Newsletter
                                        </span>

                                        <h2 class="mt-6 text-4xl lg:text-6xl font-bold leading-tight">
                                            Stay Updated,
                                            <span
                                                class="bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-clip-text text-transparent">
                                                Stay Ahead
                                            </span>
                                        </h2>

                                        <p class="mt-6 text-gray-600 text-lg">
                                            Subscribe to our newsletter and get the latest job opportunities,
                                            career tips, and platform updates directly in your inbox.
                                        </p>

                                        {/* <!-- Email Box --> */}
                                        <form onSubmit={handleSubscribe}
                                            class="mt-8 flex flex-col sm:flex-row bg-white rounded-2xl shadow-md overflow-hidden">

                                            <input type="email" name="newsletter_email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email address"
                                                class="flex-1 px-5 py-4 outline-none" required />

                                            <motion.button 
                                                type="submit"
                                                disabled={submitting}
                                                class="px-8 py-4 text-white font-semibold bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] disabled:opacity-60"
                                                whileHover={{ scale: submitting ? 1 : 1.05 }}
                                                whileTap={{ scale: submitting ? 1 : 0.95 }}
                                            >
                                                {submitting ? 'Subscribing...' : 'Subscribe'}
                                            </motion.button>

                                        </form>

                                        {/* <!-- Features --> */}
                                        <div class="flex flex-wrap gap-6 mt-6 text-gray-600">

                                            <span>🛡 No Spam</span>
                                            <span>🔒 Unsubscribe Anytime</span>
                                            <span>🔔 Weekly Updates</span>

                                        </div>

                                    </motion.div>

                                    {/* <!-- Right Illustration --> */}
                                    <motion.div 
                                        class="relative flex justify-center"
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                    >

                                        {/* <!-- Glow --> */}
                                        <div
                                            class="absolute w-87.5 h-87.5 bg-violet-500/20 blur-3xl rounded-full">
                                        </div>

                                        {/* <!-- Main Card --> */}
                                        <motion.div
                                            class="relative bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                        >

                                            <div
                                                class="w-52 h-40 bg-linear-to-br from-[#6D28D9] to-[#9333EA] rounded-3xl relative">

                                                <div
                                                    class="absolute inset-4 bg-white rounded-2xl flex items-center justify-center text-2xl font-bold text-violet-700">
                                                    Newsletter
                                                </div>

                                            </div>

                                            {/* <!-- Bell --> */}
                                            <div
                                                class="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-linear-to-r from-[#6D28D9] to-[#9333EA] flex items-center justify-center text-white text-3xl shadow-xl">
                                                🔔
                                            </div>

                                            {/* <!-- Plane --> */}
                                            <div class="absolute -top-6 -right-8 text-5xl rotate-12">
                                                📨
                                            </div>

                                        </motion.div>

                                    </motion.div>

                                </div>

                            </div>
                        </section>
  )
}

export default Newsletter