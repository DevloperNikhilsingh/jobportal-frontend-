import React, { useState } from 'react'
import { motion } from 'framer-motion';

const HireFormSection = () => {

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const employerEmail = localStorage.getItem("userEmail");
        const authToken = localStorage.getItem("authToken");
        const userRole = localStorage.getItem("userRole");

        // ---- Login check ----
        if (!authToken || !employerEmail) {
            showAlert("error", "Please login first to submit this form.");
            return;
        }

        // ---- Role check ----
        if (userRole === "JOBSEEKER") {
            showAlert("error", "You are logged in as a Jobseeker. Only Employers can post a job.");
            return;
        }

        if (userRole !== "EMPLOYER") {
            showAlert("error", "Please login with an Employer account to submit this form.");
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
            data.append("employerEmail", employerEmail);
            if (formData.image) {
                data.append("image", formData.image);
            }

            const response = await fetch("http://localhost:8080/api/want-to-hire", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + authToken,
                },
                body: data,
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            showAlert("success", "Job Post Request Submitted Successfully!");

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

        } catch (error) {
            console.error(error);
            showAlert("error", "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section class="py-6 px-4 bg-[#f4f3f8] mt-4" >
            <div class="max-w-7xl mt-6">
                <motion.h1 
                    class="text-xl md:text-4xl text-center font-poppins font-bold text-black "
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >Fill This
                    Form to Hire Talent</motion.h1>
                <div class="flex flex-col sm:flex-row justify-evenly gap-16 mt-6 ">
                    {/* <!-- left box --> */}
                    <motion.div 
                        class="p-2 w-full sm:w-1/2 sm:px-10"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 class="text-4xl font-semibold font-poppins ">Want to <span
                            class="text-blue-600">Hire</span>
                        </h2>
                        <p class="text-sm ml-1 text-gray-700 font-poppins">Post Your Job Within 1 Min
                        </p>

                        {alert.show && (
                            <motion.div
                                className={`mt-4 p-4 rounded-lg text-white font-medium ${alert.type === "success" ? "bg-green-500" : "bg-red-500"}`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {alert.message}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} class="mt-4 ">
                            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
                                <input type="text" id="Cname" name="companyName" placeholder="Company Name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    class="p-3 rounded bg-white focus:outline-none border border-gray-200" />

                                <input type="text" id="Jrole" name="jobTitle" placeholder="Job Position"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    class="p-3 rounded bg-white focus:outline-none border border-gray-200" />

                                <input type="text" id="JDescription" name="jobDescription"
                                    placeholder="Job Description"
                                    value={formData.jobDescription}
                                    onChange={handleChange}
                                    class="p-3 rounded bg-white focus:outline-none border border-gray-200" />

                                <div className="relative">

                                    {!showOtherLocation ? (
                                        <select
                                            value={jobLocation}
                                            onChange={handleLocationChange}
                                            className="p-3 rounded bg-white border border-gray-200 text-gray-700"
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
                                                className="w-full p-3 rounded border"
                                                required
                                            />

                                            <button
                                                type="button"
                                                onClick={handleBackToDropdown}
                                                className="mt-2 text-violet-600 hover:underline"
                                            >
                                                ← Choose from List
                                            </button>
                                        </>
                                    )}

                                </div>

                                <select name="experience" id="ERequired"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    class="p-3 rounded bg-white focus:outline-none border border-gray-200 text-gray-400 appearance-none">
                                    <option value="">Experience Required</option>
                                    <option value="Intern">Intern</option>
                                    <option value="Fresher">Fresher</option>
                                    <option value="Min 6 Month">Min 6 Month</option>
                                    <option value="Min 1 year">Min 1 Year</option>
                                    <option value="Min 2 & 3 Year">Min 2 & 3 Year</option>
                                    <option value="3 year+">3 Year +</option>
                                </select>

                                <select name="salary" id="Salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    class="p-3 rounded bg-white focus:outline-none border border-gray-200  appearance-none text-gray-400 ">
                                    <option value="">Salary</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Anum">Anum (Yearly)</option>
                                    <option value="Hourly">Hourly</option>
                                    <option value="Project">Per Project</option>
                                    <option value="Fixed">Fixed + Incentive</option>
                                    <option value="Incentive">Incentive Only</option>
                                </select>

                                <select name="workHour" id="WHour"
                                    value={formData.workHour}
                                    onChange={handleChange}
                                    class="p-3 rounded bg-white focus:outline-none border border-gray-200 text-gray-400 appearance-none">
                                    <option value="">Work Hour</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Per Project">Per Project (Any Time)</option>
                                </select>

                                <select name="jobType" id="JobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    class="p-3 rounded bg-white focus:outline-none border border-gray-200 text-gray-400 appearance-none">
                                    <option value="">Job Type</option>
                                    <option value="Remote">Remote</option>
                                    <option value="On Site">On Site</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>

                                <input type="text" id="skills" name="skills"
                                    placeholder="Required skill e.g. Java, Spring Boot, React"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    class="w-full p-3 rounded bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500" />

                                <div>
                                    <label for="" class="block text-sm font-inter font-bold">Upload your
                                        Post</label>
                                    <input type="file" id="post" name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        class=" rounded bg-white file:w-50 file:h-12.5 file:border file:border-gray-600 file:rounded-xl focus-outline-none mt-2" />
                                </div>
                            </div>

                            <div class="w-full flex justify-center ">
                                <motion.button 
                                    type="submit"
                                    disabled={loading}
                                    class="bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-200%_auto hover:bg-right transition-all duration-500 w-37.5 h-10 text-white rounded-md mt-4 "
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {loading ? "Posting..." : "Post Job"}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    {/* <!-- Right Side --> */}
                    <motion.div 
                        class="w-full sm:w-1/2 flex justify-center items-center relative overflow-hidden"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div
                            class="absolute w-62.5 h-62.5 sm:w-[320px] sm:h-80 bg-violet-500/10 blur-3xl rounded-full">
                        </div>

                        <div
                            class="absolute top-10 right-10 w-3 h-3 bg-violet-400 rounded-full animate-pulse">
                        </div>

                        <motion.img 
                            src="Image3.webp" alt=""
                            class="w-70 h-70 sm:w-100 sm:h-100 object-contain animate-float"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        />

                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default HireFormSection