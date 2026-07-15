import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';


// Admin "Add Job" modal — same UI style as HireFormSection,
// but submits DIRECTLY to the jobs table (no approval / request flow).
// Usage: <AddJobModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onJobAdded={fetchJobs} />

const AddJobModal = ({ isOpen, onClose, onJobAdded }) => {
  const [showOtherLocation, setShowOtherLocation] = useState(false);
  const [jobLocation, setJobLocation] = useState("");
  const [otherLocation, setOtherLocation] = useState("");

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobDescription: "",
    experience: "",
    salary: "",
    workHour: "",
    jobType: "",
    skills: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setJobLocation(value);
    if (value === "Other") {
      setShowOtherLocation(true);
    }
  };

  const handleBackToDropdown = () => {
    setShowOtherLocation(false);
    setJobLocation("");
    setOtherLocation("");
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      jobTitle: "",
      jobDescription: "",
      experience: "",
      salary: "",
      workHour: "",
      jobType: "",
      skills: "",
      image: null,
    });
    setJobLocation("");
    setOtherLocation("");
    setShowOtherLocation(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      showAlert("error", "Session expired. Please login again.");
      return;
    }

    if (!formData.companyName || !formData.jobTitle || !formData.jobDescription) {
      showAlert("error", "Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("companyName", formData.companyName);
      data.append("jobTitle", formData.jobTitle);
      data.append("jobDescription", formData.jobDescription);
      data.append("location", jobLocation === "Other" ? otherLocation : jobLocation);
      data.append("experience", formData.experience);
      data.append("salary", formData.salary);
      data.append("workHour", formData.workHour);
      data.append("jobType", formData.jobType);
      data.append("skills", formData.skills);
      if (formData.image) {
        data.append("image", formData.image);
      }

      // Direct create endpoint — admin only, no approval step
      const response = await fetch(
        "https://jobportal-backend-production-9a5e.up.railway.app/api/admin/jobs",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + authToken,
          },
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const newJob = await response.json();

      showAlert("success", "Job Posted Successfully!");
      resetForm();

      // Tell parent (AdminJobs page) to refresh the jobs list
      if (onJobAdded) onJobAdded(newJob);

      // Close modal after a short delay so user sees the success message
      setTimeout(() => {
        onClose();
      }, 1000);

    } catch (error) {
      console.error(error);
      showAlert("error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    setAlert({ show: false, type: "", message: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            onClick={handleClose}
          />

          {/* Modal box */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white flex items-center justify-between px-6 py-4 border-b border-gray-200 rounded-t-2xl z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Add New <span className="text-violet-600">Job</span>
                </h2>
                <p className="text-sm text-gray-500">Fill the form to post a job directly</p>
              </div>
              <motion.button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {alert.show && (
                <motion.div
                  className={`mb-4 p-4 rounded-lg text-white font-medium ${
                    alert.type === "success" ? "bg-green-500" : "bg-red-500"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {alert.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="p-3 rounded bg-white focus:outline-none border border-gray-200 focus:ring-2 focus:ring-violet-500"
                  />

                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Position"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="p-3 rounded bg-white focus:outline-none border border-gray-200 focus:ring-2 focus:ring-violet-500"
                  />

                  <input
                    type="text"
                    name="jobDescription"
                    placeholder="Job Description"
                    value={formData.jobDescription}
                    onChange={handleChange}
                    className="p-3 rounded bg-white focus:outline-none border border-gray-200 focus:ring-2 focus:ring-violet-500 sm:col-span-2"
                  />

                  <div className="relative">
                    {!showOtherLocation ? (
                      <select
                        value={jobLocation}
                        onChange={handleLocationChange}
                        className="w-full p-3 rounded bg-white border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                      >
                        <option value="">Select Job Location</option>
                        <option value="Varanasi">Varanasi</option>
                        <option value="Outside Varanasi">Outside Varanasi</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <>
                        <input
                          type="text"
                          value={otherLocation}
                          onChange={(e) => setOtherLocation(e.target.value)}
                          placeholder="Enter Job Location"
                          className="w-full p-3 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={handleBackToDropdown}
                          className="mt-2 text-violet-600 hover:underline text-sm"
                        >
                          ← Choose from List
                        </button>
                      </>
                    )}
                  </div>

                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="p-3 rounded bg-white focus:outline-none border border-gray-200 text-gray-600 appearance-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Experience Required</option>
                    <option value="Intern">Intern</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Min 6 Month">Min 6 Month</option>
                    <option value="Min 1 year">Min 1 Year</option>
                    <option value="Min 2 & 3 Year">Min 2 & 3 Year</option>
                    <option value="3 year+">3 Year +</option>
                  </select>

                  <select
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="p-3 rounded bg-white focus:outline-none border border-gray-200 appearance-none text-gray-600 focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Salary</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Anum">Anum (Yearly)</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Project">Per Project</option>
                    <option value="Fixed">Fixed + Incentive</option>
                    <option value="Incentive">Incentive Only</option>
                  </select>

                  <select
                    name="workHour"
                    value={formData.workHour}
                    onChange={handleChange}
                    className="p-3 rounded bg-white focus:outline-none border border-gray-200 text-gray-600 appearance-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Work Hour</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Per Project">Per Project (Any Time)</option>
                  </select>

                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="p-3 rounded bg-white focus:outline-none border border-gray-200 text-gray-600 appearance-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="">Job Type</option>
                    <option value="Remote">Remote</option>
                    <option value="On Site">On Site</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>

                  <input
                    type="text"
                    name="skills"
                    placeholder="Required skill e.g. Java, Spring Boot, React"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full p-3 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 sm:col-span-2"
                  />

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Upload Job Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={handleChange}
                      className="rounded bg-white file:px-4 file:py-2 file:mr-4 file:border file:border-gray-300 file:rounded-xl file:bg-gray-50 file:text-gray-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="w-full flex justify-center gap-4 mt-6">
                  <motion.button
                    type="button"
                    onClick={handleClose}
                    className="px-6 h-11 rounded-md border border-gray-300 text-gray-700 font-medium"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-200%_auto hover:bg-right transition-all duration-500 px-8 h-11 text-white rounded-md font-medium disabled:opacity-60"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {loading ? "Posting..." : "Post Job"}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddJobModal;