import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Contact = () => {
  const [activeRole, setActiveRole] = useState('jobseeker');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    jobSector: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      alert('Please agree to the Privacy Policy before submitting.');
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = {
        ...formData,
        role: activeRole, // 'jobseeker' or 'employer' -> backend uppercases it
      };

      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Contact submit failed:', response.status, text);
        setSubmitStatus('error');
        return;
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', jobSector: '', subject: '', message: '' });
      setAgree(false);
    } catch (err) {
      console.error('Contact submit error:', err);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section class="py-12 md:py-24 bg-white" >
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-12">
          <motion.h1
            class="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Contact with Our <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Expert Team</span>
          </motion.h1>
          <motion.p
            class="text-gray-500 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Have questions about jobs, recruitment solutions, or technical integrations? <br />
            Write to us and let our team support your career goals.
          </motion.p>
        </div>

        <div class="grid lg:grid-cols-5 gap-8">
          {/* Left Column - 2 parts */}
          <div class="lg:col-span-2 space-y-6">
            {/* Role Selection */}
            <motion.div
              class="bg-gray-50 p-6 rounded-3xl border border-gray-200"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 class="font-semibold text-gray-900 mb-2">Choose Your Support Path</h3>
              <p class="text-gray-500 text-xs mb-4">Select your category to help us route your query correctly</p>

              <div class="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  onClick={() => setActiveRole('jobseeker')}
                  class={`p-4 rounded-2xl border-2 transition-all ${activeRole === 'jobseeker'
                    ? 'bg-indigo-50 border-indigo-400'
                    : 'bg-white border-gray-200 hover:border-indigo-300'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div class="text-indigo-500 text-2xl mb-1">
                    <i class="fas fa-graduation-cap"></i>
                  </div>
                  <h4 class={`font-semibold text-sm ${activeRole === 'jobseeker' ? 'text-indigo-700' : 'text-gray-700'}`}>Job Seeker</h4>
                  <p class="text-xs text-gray-500">Find Internships & Jobs</p>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => setActiveRole('employer')}
                  class={`p-4 rounded-2xl border-2 transition-all ${activeRole === 'employer'
                    ? 'bg-indigo-50 border-indigo-400'
                    : 'bg-white border-gray-200 hover:border-indigo-300'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div class="text-gray-500 text-2xl mb-1">
                    <i class="fas fa-building"></i>
                  </div>
                  <h4 class={`font-semibold text-sm ${activeRole === 'employer' ? 'text-indigo-700' : 'text-gray-700'}`}>Employer</h4>
                  <p class="text-xs text-gray-500">Post Jobs & Recruit</p>
                </motion.button>
              </div>

              <div class="mt-4 flex items-start gap-2 text-xs text-indigo-600">
                <div class="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <i class="fas fa-info text-xs"></i>
                </div>
                <p>
                  You have selected <span class="font-semibold">{activeRole === 'jobseeker' ? 'Job Seeker' : 'Employer'}</span> Support.
                  {activeRole === 'jobseeker' ? ' Direct inquiries about resume building, profile highlights and application status will be prioritized.' : ' Direct inquiries about job postings, candidate search and bulk hiring will be prioritized.'}
                </p>
              </div>
            </motion.div>

            {/* Contact Info Cards */}
            <div class="grid grid-cols-2 gap-4">
              <motion.div
                class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-3">
                  <i class="fas fa-phone"></i>
                </div>
                <h4 class="text-xs font-semibold text-gray-400 mb-1">CALL SUPPORT</h4>
                <p class="text-gray-900 font-semibold text-sm">+91 98765 43210</p>
                <p class="text-[10px] text-green-600 flex items-center gap-1 mt-1">
                  <span class="w-2 h-2 rounded-full bg-green-500"></span>
                  Mon - Sat, 9AM - 6PM
                </p>
              </motion.div>

              <motion.div
                class="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-3">
                  <i class="fas fa-envelope"></i>
                </div>
                <h4 class="text-xs font-semibold text-gray-400 mb-1">EMAIL INQUIRIES</h4>
                <p class="text-gray-900 font-semibold text-sm">support@iptech.com</p>
                <p class="text-[10px] text-gray-500 mt-1">Response under 6 hours</p>
              </motion.div>
            </div>

            {/* Location Card */}
            <motion.div
              class="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div class="flex items-center gap-3 mb-4">
                <div class="w-8 h-8 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">IP TECH Institute</h4>
                  <p class="text-xs text-gray-500">Pandeypur, Varanasi, Uttar Pradesh, India</p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div class="rounded-2xl overflow-hidden border border-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28847.034357574907!2d82.98241118680349!3d25.34183113506093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2f881a620663%3A0x2127901a22b00fb4!2sIPTECH%20DIGITAL%20SOLUTIONS!5e0!3m2!1sen!2sin!4v1782884178358!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="IP TECH Institute Location"
                ></iframe>

              </div>
              <a href="https://share.google/E9WHb4k2jJW3tweHe"
                target="_blank"
                rel="noopener noreferrer">
                <motion.button
                  class="w-full mt-4 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i class="fas fa-location-arrow mr-2"></i>
                  View Live Map
                </motion.button>
              </a>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <div class="lg:col-span-3">
            <motion.div
              class="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div class="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {activeRole === "jobseeker"
                    ? "Send a Message"
                    : "Employer Inquiry"}
                </h2>
                <p className="text-gray-500 text-sm">
                  {activeRole === "jobseeker"
                    ? "Fill out the form and our Candidate Support team will contact you shortly."
                    : "Fill out the form and our Recruitment Support team will contact you shortly."}
                </p>
              </div>

              {submitStatus === 'success' && (
                <div class="mb-5 p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium">
                  Your message has been sent successfully! Our team will contact you shortly.
                </div>
              )}
              {submitStatus === 'error' && (
                <div class="mb-5 p-4 rounded-xl bg-red-50 text-red-700 text-sm font-medium">
                  Something went wrong while sending your message. Please try again.
                </div>
              )}

              <form class="space-y-5" onSubmit={handleSubmit}>
                {/* Row 1 */}
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Full Name</label>
                    <div class="relative">
                      <i class="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g., XYZ Singh"
                        class="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Email Address</label>
                    <div class="relative">
                      <i class="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g., nikhil@example.com"
                        class="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Phone Number</label>
                    <div class="relative">
                      <i class="fas fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g., +91 98765 XXXXX"
                        class="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Desired Job Sector</label>
                    <div class="relative">
                      <i class="fas fa-briefcase absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="jobSector"
                        value={formData.jobSector}
                        onChange={handleChange}
                        class="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder={
                          activeRole === "jobseeker"
                            ? "e.g., Frontend Developer"
                            : "e.g., Hiring React Developers"
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Subject</label>
                  <div class="relative">
                    <i class="fas fa-comment-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Brief summary of your query"
                      class="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Detail your inquiry here..."
                    class="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Terms Checkbox */}
                <div class="flex items-start gap-3">
                  <motion.div
                    class="w-5 h-5 rounded border border-gray-300 flex items-center justify-center cursor-pointer mt-0.5"
                    onClick={() => setAgree(!agree)}
                    whileHover={{ scale: 1.1 }}
                  >
                    {agree && <i class="fas fa-check text-indigo-600 text-xs"></i>}
                  </motion.div>
                  <label class="text-xs text-gray-500 leading-relaxed cursor-pointer" onClick={() => setAgree(!agree)}>
                    I agree to the <a href="#" class="text-indigo-600 font-medium hover:underline">Privacy Policy</a> and authorize IP TECH to contact me regarding my query.
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  class="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-60"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {submitting ? "SENDING..." : "SEND SECURE MESSAGE"}
                  <i class="fas fa-paper-plane ml-2"></i>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact