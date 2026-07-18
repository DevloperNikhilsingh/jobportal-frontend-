// import React, { useState } from 'react'
// import { motion } from 'framer-motion';

// const HireFormSection = () => {

//     const [showOtherLocation, setShowOtherLocation] = useState(false);
//     const [jobLocation, setJobLocation] = useState("");
//     const [otherLocation, setOtherLocation] = useState("");

//     const [loading, setLoading] = useState(false);
//     const [alert, setAlert] = useState({ show: false, type: "", message: "" });

//     const [formData, setFormData] = useState({
//         companyName: "",
//         jobTitle: "",
//         jobDescription: "",
//         experience: "",
//         salary: "",
//         workHour: "",
//         jobType: "",
//         skills: "",
//         image: null,
//     });

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (files) {
//             setFormData((prev) => ({ ...prev, [name]: files[0] }));
//         } else {
//             setFormData((prev) => ({ ...prev, [name]: value }));
//         }
//     };

//     const handleLocationChange = (e) => {
//         const value = e.target.value;
//         setJobLocation(value);
//         if (value === "Other") {
//             setShowOtherLocation(true);
//         }
//     };

//     const handleBackToDropdown = () => {
//         setShowOtherLocation(false);
//         setJobLocation("");
//         setOtherLocation("");
//     };

//     const showAlert = (type, message) => {
//         setAlert({ show: true, type, message });
//         setTimeout(() => setAlert({ show: false, type: "", message: "" }), 3000);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const employerEmail = localStorage.getItem("userEmail");
//         const authToken = localStorage.getItem("authToken");
//         const userRole = localStorage.getItem("userRole");

//         // ---- Login check ----
//         if (!authToken || !employerEmail) {
//             showAlert("error", "Please login first to submit this form.");
//             return;
//         }

//         // ---- Role check ----
//         if (userRole === "JOBSEEKER") {
//             showAlert("error", "You are logged in as a Jobseeker. Only Employers can post a job.");
//             return;
//         }

//         if (userRole !== "EMPLOYER") {
//             showAlert("error", "Please login with an Employer account to submit this form.");
//             return;
//         }

//         if (!formData.companyName || !formData.jobTitle || !formData.jobDescription) {
//             showAlert("error", "Please fill all required fields.");
//             return;
//         }

//         setLoading(true);

//         try {
//             const data = new FormData();
//             data.append("companyName", formData.companyName);
//             data.append("jobTitle", formData.jobTitle);
//             data.append("jobDescription", formData.jobDescription);
//             data.append("location", jobLocation === "Other" ? otherLocation : jobLocation);
//             data.append("experience", formData.experience);
//             data.append("salary", formData.salary);
//             data.append("workHour", formData.workHour);
//             data.append("jobType", formData.jobType);
//             data.append("skills", formData.skills);
//             data.append("employerEmail", employerEmail);
//             if (formData.image) {
//                 data.append("image", formData.image);
//             }

//             const response = await fetch("https://jobportal-backend-production-9a5e.up.railway.app/api/want-to-hire", {
//                 method: "POST",
//                 headers: {
//                     Authorization: "Bearer " + authToken,
//                 },
//                 body: data,
//             });

//             if (!response.ok) {
//                 throw new Error("Submission failed");
//             }

//             showAlert("success", "Job Post Request Submitted Successfully!");

//             setFormData({
//                 companyName: "",
//                 jobTitle: "",
//                 jobDescription: "",
//                 experience: "",
//                 salary: "",
//                 workHour: "",
//                 jobType: "",
//                 skills: "",
//                 image: null,
//             });
//             setJobLocation("");
//             setOtherLocation("");
//             setShowOtherLocation(false);

//         } catch (error) {
//             console.error(error);
//             showAlert("error", "Something went wrong. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const inputClass = "p-3.5 rounded-xl bg-white focus:outline-none border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 hover:border-gray-300 placeholder:text-gray-400";
//     const selectClass = "p-3.5 rounded-xl bg-white focus:outline-none border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 hover:border-gray-300 text-gray-500 appearance-none cursor-pointer";

//     return (
//         <section id="Postjob" class="py-6 px-4 bg-[#f4f3f8] mt-4" >
//             <div class="max-w-7xl mt-6">
//                 <motion.h1 
//                     class="text-xl md:text-4xl text-center font-poppins font-bold text-black "
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5 }}
//                 >Fill This
//                     Form to Hire Talent</motion.h1>
//                 <div class="flex flex-col sm:flex-row justify-evenly gap-16 mt-6 ">
//                     {/* <!-- left box --> */}
//                     <motion.div 
//                         class="p-2 w-full sm:w-1/2 sm:px-10"
//                         initial={{ opacity: 0, x: -50 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <h2 class="text-4xl font-semibold font-poppins ">Want to <span
//                             class="text-blue-600">Hire</span>
//                         </h2>
//                         <p class="text-sm ml-1 text-gray-700 font-poppins">Post Your Job Within 1 Min
//                         </p>

//                         {alert.show && (
//                             <motion.div
//                                 className={`mt-4 p-4 rounded-xl text-white font-medium shadow-lg flex items-center gap-2 ${alert.type === "success" ? "bg-green-500 shadow-green-500/20" : "bg-red-500 shadow-red-500/20"}`}
//                                 initial={{ opacity: 0, y: -20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                             >
//                                 <span className={`w-2 h-2 rounded-full bg-white ${alert.type === "success" ? "animate-pulse" : ""}`}></span>
//                                 {alert.message}
//                             </motion.div>
//                         )}

//                         <form onSubmit={handleSubmit} class="mt-4 ">
//                             <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5">
//                                 <input type="text" id="Cname" name="companyName" placeholder="Company Name"
//                                     value={formData.companyName}
//                                     onChange={handleChange}
//                                     class={inputClass} />

//                                 <input type="text" id="Jrole" name="jobTitle" placeholder="Job Position"
//                                     value={formData.jobTitle}
//                                     onChange={handleChange}
//                                     class={inputClass} />

//                                 <input type="text" id="JDescription" name="jobDescription"
//                                     placeholder="Job Description"
//                                     value={formData.jobDescription}
//                                     onChange={handleChange}
//                                     class={`${inputClass} sm:col-span-2`} />

//                                 <div className="relative">

//                                     {!showOtherLocation ? (
//                                         <select
//                                             value={jobLocation}
//                                             onChange={handleLocationChange}
//                                             className={`w-full ${selectClass}`}
//                                         >
//                                             <option value="">Select Job Location</option>
//                                             <option value="Varanasi">Varanasi</option>
//                                             <option value="Outside Varanasi">Outside Varanasi</option>
//                                             <option value="Other">Other</option>
//                                         </select>
//                                     ) : (
//                                         <>
//                                             <input
//                                                 type="text"
//                                                 value={otherLocation}
//                                                 onChange={(e) => setOtherLocation(e.target.value)}
//                                                 placeholder="Enter Job Location"
//                                                 className={`w-full ${inputClass}`}
//                                                 required
//                                             />

//                                             <button
//                                                 type="button"
//                                                 onClick={handleBackToDropdown}
//                                                 className="mt-2 text-sm text-violet-600 hover:text-violet-800 hover:underline transition-colors"
//                                             >
//                                                 ← Choose from List
//                                             </button>
//                                         </>
//                                     )}

//                                 </div>

//                                 <select name="experience" id="ERequired"
//                                     value={formData.experience}
//                                     onChange={handleChange}
//                                     class={selectClass}>
//                                     <option value="">Experience Required</option>
//                                     <option value="Intern">Intern</option>
//                                     <option value="Fresher">Fresher</option>
//                                     <option value="Min 6 Month">Min 6 Month</option>
//                                     <option value="Min 1 year">Min 1 Year</option>
//                                     <option value="Min 2 & 3 Year">Min 2 & 3 Year</option>
//                                     <option value="3 year+">3 Year +</option>
//                                 </select>

//                                 <select name="salary" id="Salary"
//                                     value={formData.salary}
//                                     onChange={handleChange}
//                                     class={selectClass}>
//                                     <option value="">Salary</option>
//                                     <option value="Monthly">Monthly</option>
//                                     <option value="Anum">Anum (Yearly)</option>
//                                     <option value="Hourly">Hourly</option>
//                                     <option value="Project">Per Project</option>
//                                     <option value="Fixed">Fixed + Incentive</option>
//                                     <option value="Incentive">Incentive Only</option>
//                                 </select>

//                                 <select name="workHour" id="WHour"
//                                     value={formData.workHour}
//                                     onChange={handleChange}
//                                     class={selectClass}>
//                                     <option value="">Work Hour</option>
//                                     <option value="Part Time">Part Time</option>
//                                     <option value="Full Time">Full Time</option>
//                                     <option value="Per Project">Per Project (Any Time)</option>
//                                 </select>

//                                 <select name="jobType" id="JobType"
//                                     value={formData.jobType}
//                                     onChange={handleChange}
//                                     class={selectClass}>
//                                     <option value="">Job Type</option>
//                                     <option value="Remote">Remote</option>
//                                     <option value="On Site">On Site</option>
//                                     <option value="Hybrid">Hybrid</option>
//                                 </select>

//                                 <input type="text" id="skills" name="skills"
//                                     placeholder="Required skill e.g. Java, Spring Boot, React"
//                                     value={formData.skills}
//                                     onChange={handleChange}
//                                     class={`w-full ${inputClass} sm:col-span-2`} />

//                                 <div class="sm:col-span-2">
//                                     <label for="post" class="block text-sm font-inter font-bold text-gray-700 mb-1">Upload your
//                                         Post</label>
//                                     <input type="file" id="post" name="image"
//                                         accept="image/*"
//                                         onChange={handleChange}
//                                         class="w-full text-sm text-gray-500 rounded-xl bg-white border border-gray-200 p-1.5 file:mr-3 file:px-4 file:py-2.5 file:border-0 file:rounded-lg file:bg-violet-50 file:text-violet-700 file:font-medium hover:file:bg-violet-100 file:transition-colors file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500" />
//                                 </div>
//                             </div>

//                             <div class="w-full flex justify-center ">
//                                 <motion.button 
//                                     type="submit"
//                                     disabled={loading}
//                                     class="bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-200%_auto hover:bg-right transition-all duration-500 w-37.5 h-10 text-white rounded-md mt-6 font-medium shadow-lg shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//                                     whileHover={{ scale: loading ? 1 : 1.05 }}
//                                     whileTap={{ scale: loading ? 1 : 0.95 }}
//                                 >
//                                     {loading && (
//                                         <motion.span
//                                             className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full"
//                                             animate={{ rotate: 360 }}
//                                             transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
//                                         />
//                                     )}
//                                     {loading ? "Posting..." : "Post Job"}
//                                 </motion.button>
//                             </div>
//                         </form>
//                     </motion.div>

//                     {/* <!-- Right Side --> */}
//                     <motion.div 
//                         class="w-full sm:w-1/2 flex justify-center items-center relative overflow-hidden"
//                         initial={{ opacity: 0, x: 50 }}
//                         whileInView={{ opacity: 1, x: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <div
//                             class="absolute w-62.5 h-62.5 sm:w-[320px] sm:h-80 bg-violet-500/10 blur-3xl rounded-full">
//                         </div>

//                         <div
//                             class="absolute top-10 right-10 w-3 h-3 bg-violet-400 rounded-full animate-pulse">
//                         </div>

//                         <div
//                             class="absolute bottom-14 left-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}>
//                         </div>

//                         <motion.img 
//                             src="Image3.webp" alt=""
//                             class="w-70 h-70 sm:w-100 sm:h-100 object-contain animate-float"
//                             animate={{ y: [0, -10, 0] }}
//                             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//                         />

//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default HireFormSection

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

            const response = await fetch("https://jobportal-backend-production-9a5e.up.railway.app/api/want-to-hire", {
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

    const inputClass = "p-3.5 rounded-xl bg-white focus:outline-none border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 hover:border-gray-300 placeholder:text-gray-400";
    const selectClass = "p-3.5 rounded-xl bg-white focus:outline-none border border-gray-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 hover:border-gray-300 text-gray-500 appearance-none cursor-pointer";

    return (
        <section id="Postjob" class="py-10 px-4 bg-[#f4f3f8] mt-4" >
            <div class="max-w-7xl mx-auto mt-6">
                <motion.h1 
                    class="text-2xl md:text-4xl text-center font-poppins font-bold text-black tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >Fill This
                    Form to Hire Talent</motion.h1>
                <p class="text-center text-gray-500 text-sm mt-2 font-poppins">Post a role, reach the right people — takes under a minute.</p>
                <div class="flex flex-col sm:flex-row justify-evenly gap-10 sm:gap-16 mt-8 ">
                    {/* <!-- left box --> */}
                    <motion.div 
                        class="p-6 sm:p-8 w-full sm:w-1/2 rounded-3xl bg-white shadow-xl shadow-violet-500/5 border border-gray-100"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div class="flex items-center gap-2">
                            <span class="w-8 h-1.5 rounded-full bg-blue-600"></span>
                            <h2 class="text-3xl font-semibold font-poppins ">Want to <span
                                class="text-blue-600">Hire</span>
                            </h2>
                        </div>
                        <p class="text-sm ml-1 mt-1 text-gray-700 font-poppins">Post Your Job Within 1 Min
                        </p>

                        {alert.show && (
                            <motion.div
                                className={`mt-4 p-4 rounded-xl text-white font-medium shadow-lg flex items-center gap-2 ${alert.type === "success" ? "bg-emerald-500 shadow-emerald-500/20" : "bg-rose-500 shadow-rose-500/20"}`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <span className={`w-2 h-2 rounded-full bg-white ${alert.type === "success" ? "animate-pulse" : ""}`}></span>
                                {alert.message}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} class="mt-5 ">
                            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                                <input type="text" id="Cname" name="companyName" placeholder="Company Name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    class={inputClass} />

                                <input type="text" id="Jrole" name="jobTitle" placeholder="Job Position"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    class={inputClass} />

                                <input type="text" id="JDescription" name="jobDescription"
                                    placeholder="Job Description"
                                    value={formData.jobDescription}
                                    onChange={handleChange}
                                    class={`${inputClass} sm:col-span-2`} />

                                <div className="relative">

                                    {!showOtherLocation ? (
                                        <select
                                            value={jobLocation}
                                            onChange={handleLocationChange}
                                            className={`w-full ${selectClass}`}
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
                                                className={`w-full ${inputClass}`}
                                                required
                                            />

                                            <button
                                                type="button"
                                                onClick={handleBackToDropdown}
                                                className="mt-2 text-sm text-violet-600 hover:text-violet-800 hover:underline transition-colors"
                                            >
                                                ← Choose from List
                                            </button>
                                        </>
                                    )}

                                </div>

                                <select name="experience" id="ERequired"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    class={selectClass}>
                                    <option value="">Experience Required</option>
                                    <option value="Intern">Intern</option>
                                    <option value="Fresher">Fresher</option>
                                    <option value="Min 6 Month">Min 6 Month</option>
                                    <option value="Min 1 year">Min 1 Year</option>
                                    <option value="Min 2 & 3 Year">Min 2 & 3 Year</option>
                                    <option value="3 year+">3 Year +</option>
                                </select>

                                {/* <select name="salary" id="Salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    class={selectClass}>
                                    <option value="">Salary</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Anum">Anum (Yearly)</option>
                                    <option value="Hourly">Hourly</option>
                                    <option value="Project">Per Project</option>
                                    <option value="Fixed">Fixed + Incentive</option>
                                    <option value="Incentive">Incentive Only</option>
                                </select> */}
                                <input type="text" className={`${inputClass} sm:col-span-2`} 
                                placeholder="Salary"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                id="Salary"
                                />

                                <select name="workHour" id="WHour"
                                    value={formData.workHour}
                                    onChange={handleChange}
                                    class={selectClass}>
                                    <option value="">Work Hour</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Per Project">Per Project (Any Time)</option>
                                </select>

                                <select name="jobType" id="JobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    class={selectClass}>
                                    <option value="">Job Type</option>
                                    <option value="Remote">Remote</option>
                                    <option value="On Site">On Site</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>

                                <input type="text" id="skills" name="skills"
                                    placeholder="Required skill e.g. Java, Spring Boot, React"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    class={`w-full ${inputClass} sm:col-span-2`} />

                                <div class="sm:col-span-2">
                                    <label for="post" class="block text-sm font-inter font-bold text-gray-700 mb-1">Upload your
                                        Post</label>
                                    <input type="file" id="post" name="image"
                                        accept="image/*"
                                        onChange={handleChange}
                                        class="w-full text-sm text-gray-500 rounded-xl bg-white border border-gray-200 p-1.5 file:mr-3 file:px-4 file:py-2.5 file:border-0 file:rounded-lg file:bg-violet-50 file:text-violet-700 file:font-medium hover:file:bg-violet-100 file:transition-colors file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500" />
                                </div>
                            </div>

                            <div class="w-full flex justify-center ">
                                <motion.button 
                                    type="submit"
                                    disabled={loading}
                                    class="bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-200%_auto hover:bg-right transition-all duration-500 w-40 h-11 text-white rounded-md mt-7 font-medium shadow-lg shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    whileHover={{ scale: loading ? 1 : 1.05 }}
                                    whileTap={{ scale: loading ? 1 : 0.95 }}
                                >
                                    {loading && (
                                        <motion.span
                                            className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                                        />
                                    )}
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

                        <div
                            class="absolute bottom-14 left-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}>
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