import React from 'react'
import { useState } from 'react';
import { motion } from 'framer-motion';

const AplyFormSection = ({jobId}) => {

    const [showApplyOtherLocation, setShowApplyOtherLocation] = useState(false);
    const [applyJobLocation, setApplyJobLocation] = useState("");
    const [applyOtherLocation, setApplyOtherLocation] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phonenumber: "",
        address: "",
        experience: "",
        workHour: "",
        jobType: "",
        skills: "",
        location: "",
        otherLocation: "",
        applyDate: "",
        qualification: "",
        coverLetter: "",
        resume: null,
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const [alert, setAlert] = useState({
        show: false,
        type: "",
        message: "",
    });

    // handle Input Change Function
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Form validation
    const validateForm = () => {

        let newErrors = {};

        // Full Name
        if (!formData.name.trim()) {
            newErrors.name = "Full Name is required";
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email = "Invalid email address";
        }

        // Phone
        if (!formData.phonenumber.trim()) {
            newErrors.phonenumber = "Phone Number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phonenumber)) {
            newErrors.phonenumber = "Phone Number must be 10 digits";
        }

        // Address
        if (!formData.address.trim()) {
            newErrors.address = "Permanent Address is required";
        }

        // Experience
        if (!formData.experience) {
            newErrors.experience = "Please select experience";
        }

        // Work Hour
        if (!formData.workHour) {
            newErrors.workHour = "Please select work hour";
        }

        // Job Type
        if (!formData.jobType) {
            newErrors.jobType = "Please select job type";
        }

        // Skills
        if (!formData.skills.trim()) {
            newErrors.skills = "Skills are required";
        }

        // Location
        if (!formData.location) {
            newErrors.location = "Please select location";
        }

        if (
            formData.location === "Other" &&
            !formData.otherLocation.trim()
        ) {
            newErrors.otherLocation = "Enter Job Location";
        }

        // Date
        if (!formData.applyDate) {
            newErrors.applyDate = "Please select date";
        }

        // Qualification
        if (!formData.qualification) {
            newErrors.qualification = "Please select qualification";
        }

        // Resume
        if (!formData.resume) {
            newErrors.resume = "Resume is required";
        } else {

            const allowedTypes = [
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];

            if (!allowedTypes.includes(formData.resume.type)) {
                newErrors.resume = "Only PDF, DOC and DOCX allowed";
            }

            if (formData.resume.size > 2 * 1024 * 1024) {
                newErrors.resume = "Resume must be less than 2MB";
            }
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!jobId) {
        showAlert("error", "Please select a job first by clicking 'Apply Jobs'.");
        return;
    }


        if (!validateForm()) {
            showAlert("error", "Please fill all required fields.");
            return;
        }

        setLoading(true);

        try {
            // const jobId = document.getElementById("jobId").value;

            const data = new FormData();
            data.append("jobId", jobId);
            data.append("applicantName", formData.name);
            data.append("applicantEmail", formData.email);
            data.append("applicantPhone", formData.phonenumber);
            data.append("coverLetter", formData.coverLetter || "");
            data.append("address", formData.address);
            data.append("experience", formData.experience);
            data.append("workHour", formData.workHour);
            data.append("jobType", formData.jobType);
            data.append("skills", formData.skills);
            data.append(
                "location",
                formData.location === "Other" ? formData.otherLocation : formData.location
            );
            data.append("applyDate", formData.applyDate);
            data.append("qualification", formData.qualification);
            data.append("resume", formData.resume);

            const response = await fetch("http://localhost:8080/api/apply-job", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("authToken"),
                },
                body: data,
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            showAlert("success", "Application Submitted Successfully!");

            setFormData({
                name: "",
                email: "",
                phonenumber: "",
                address: "",
                experience: "",
                workHour: "",
                jobType: "",
                skills: "",
                location: "",
                otherLocation: "",
                applyDate: "",
                qualification: "",
                coverLetter: "",
                resume: null,
            });

            setShowApplyOtherLocation(false);

        } catch (error) {
            console.error(error);
            showAlert("error", "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleApplyLocationChange = (e) => {

        const value = e.target.value;

        setFormData((prev) => ({
            ...prev,
            location: value,
        }));

        if (value === "Other") {
            setShowApplyOtherLocation(true);
        }
    };

    const handleBackToApplyDropdown = () => {

        setShowApplyOtherLocation(false);

        setFormData((prev) => ({
            ...prev,
            location: "",
            otherLocation: "",
        }));
    };

    // Show alert Function
    const showAlert = (type, message) => {

        setAlert({
            show: true,
            type,
            message,
        });

        setTimeout(() => {
            setAlert({
                show: false,
                type: "",
                message: "",
            });
        }, 3000);

    };
    return (
        <section class="py-6 px-4 " id="ApplyJob" >
            <div class="max-w-7xl mt-6">

                <motion.h1
                    class="text-xl md:text-4xl text-center font-poppins font-bold text-black"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >Fill This
                    Form To Get Hired Now</motion.h1>

                <div class="flex flex-col sm:flex-row gap-16 justify-evenly">
                    {/* <!-- right box --> */}
                    <motion.div
                        class="hidden sm:block w-50% flex justify-center items-center"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <img src="Image2.png" alt=""
                            class="w-100 h-100 bg-[#f4f3f8] rounded-md " />
                    </motion.div>
                    {/* <!-- left box --> */}
                    <motion.div
                        class="p-2 w-50%"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 class="text-4xl font-semibold font-inter">Apply For <span
                            class="text-blue-600">Job</span></h2>
                        <p class="text-sm ml-1 text-gray-700 font-inter mt-1">Fill the form Below to
                            Apply for Job</p>
                        {alert.show && (
                            <motion.div
                                className={`mb-5 p-4 rounded-lg text-white font-medium ${alert.type === "success"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                    }`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                {alert.message}
                            </motion.div>
                        )}
                        <form onSubmit={handleSubmit}
                            class="mt-4 ">
                            <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
                                <input type="text" placeholder="Full Name" id="name" name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="p-3 rounded bg-white border border-gray-200 focus:outline-none text-gray-800 placeholder:text-gray-500" />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name}
                                    </p>
                                )}
                                <input type="email" placeholder="E-mail" id="email" name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="p-3 rounded bg-white border border-gray-200 focus:outline-none text-gray-800 placeholder:text-gray-500" />
                                {errors.email &&
                                    <p className="text-red-500 text-xs">
                                        {errors.email}
                                    </p>}
                                <input type="tel" placeholder="Phone Number" id="phonenumber"
                                    name="phonenumber" pattern="[0-9]{10}" required
                                    value={formData.phonenumber}
                                    onChange={handleChange}
                                    className="p-3 rounded bg-white border border-gray-200 focus:outline-none text-gray-800 placeholder:text-gray-500" />
                                {errors.phonenumber &&
                                    <p className="text-red-500 text-xs">
                                        {errors.phonenumber}
                                    </p>}
                                <input type="text" placeholder="Permanent Address" id="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="p-3 rounded bg-white border border-gray-200 focus:outline-none text-gray-800 placeholder:text-gray-500" />
                                {errors.address &&
                                    <p className="text-red-500 text-xs">
                                        {errors.address}
                                    </p>}
                                <select class="p-3 rounded bg-white border border-gray-200 text-gray-700"
                                    id="experiance" name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}>
                                    <option value="">Select Experience</option>
                                    <option value="Fresher">Fresher</option>
                                    <option value="1 Month">1 Month</option>
                                    <option value="6 Month">6 Month</option>
                                    <option value="1-2 year">1-2 Years</option>
                                    <option value="3-5 year">3-5 Years</option>
                                </select>
                                {errors.experience &&
                                    <p className="text-red-500 text-xs">
                                        {errors.experience}
                                    </p>}
                                <select name="workHour" id="WHour" required
                                    class="p-3 rounded bg-white border border-gray-200 text-gray-700"
                                    value={formData.workHour}
                                    onChange={handleChange}>
                                    <option value="" selected disabled>Select Work Hour</option>
                                    <option value="Part Time">Part Time</option>
                                    <option value="Full Time">Full Time</option>
                                    <option value="Per Project">Per Project</option>
                                </select>
                                {errors.workHour &&
                                    <p className="text-red-500 text-xs">
                                        {errors.workHour}
                                    </p>}
                                <select name="jobType" id="ApplyJobType" required
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    class="p-3 rounded bg-white border border-gray-200 text-gray-700">
                                    <option value="" selected disabled>Select Job Type</option>
                                    <option value="Remote">Remote</option>
                                    <option value="On Site">On Site</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                                {errors.jobType &&
                                    <p className="text-red-500 text-xs">
                                        {errors.jobType}
                                    </p>}
                                <input type="text" id="skills" name="skills"
                                    placeholder="Required skill e.g. Java, Spring Boot, React"
                                    class="w-full p-3 rounded bg-white border border-gray-200 focus:outline-none "
                                    value={formData.skills}
                                    onChange={handleChange} />
                                {errors.skills &&
                                    <p className="text-red-500 text-xs">
                                        {errors.skills}
                                    </p>}

                                <div className="relative">

                                    {!showApplyOtherLocation ? (
                                        <>
                                            <select
                                                name="location"
                                                value={formData.location}
                                                onChange={handleApplyLocationChange}
                                                className="w-full p-3 rounded bg-white border border-gray-200 text-gray-700"
                                            >
                                                <option value="">Select Job Location</option>
                                                <option value="Varanasi">Varanasi</option>
                                                <option value="Outside Varanasi">Outside Varanasi</option>
                                                <option value="Other">Other</option>
                                            </select>

                                            {errors.location && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.location}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <input
                                                type="text"
                                                name="otherLocation"
                                                value={formData.otherLocation}
                                                onChange={handleChange}
                                                placeholder="Enter Job Location"
                                                className="w-full p-3 rounded bg-white border border-gray-200"
                                            />

                                            {errors.otherLocation && (
                                                <p className="text-red-500 text-xs mt-1">
                                                    {errors.otherLocation}
                                                </p>
                                            )}

                                            <button
                                                type="button"
                                                onClick={handleBackToApplyDropdown}
                                                className="mt-2 text-sm text-violet-600 hover:underline"
                                            >
                                                ← Choose from List
                                            </button>
                                        </>
                                    )}

                                </div>
                                <div class="w-full flex flex-col gap-2">
                                    <label class="font-medium text-[14px]">Job Apply Date</label>
                                    <input type="date" placeholder="Job Apply Date" name="applyDate"
                                        id="JDate"
                                        value={formData.applyDate}
                                        onChange={handleChange}
                                        className="p-3 rounded bg-white border border-gray-200 focus:outline-none text-gray-800 placeholder:text-gray-500" />
                                </div>
                                {errors.applyDate &&
                                    <p className="text-red-500 text-xs">
                                        {errors.applyDate}
                                    </p>}




                                <select className="p-3 rounded bg-white border border-gray-200 text-gray-700"
                                    id="Qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    name="qualification">
                                    <option value="">Select Qualification</option>
                                    <option value="10th">10th</option>
                                    <option value="12th">12th</option>
                                    <option value="BCA">BCA</option>
                                    <option value="B-Tech">B-Tech</option>
                                    <option value="B.Sc">B.Sc (Computer Science)</option>
                                    <option value="M.Sc">M.Sc (Computer Science)</option>
                                    <option value="MCA">MCA</option>
                                    <option value="M-Tech">M-Tech</option>
                                </select>
                                {errors.qualification &&
                                    <p className="text-red-500 text-xs">
                                        {errors.qualification}
                                    </p>}

                                {/* <!-- Ye Job ki Id le jane ke liye hai jise admin ko pata chale ki user kis job ke liye apply kiya hai  --> */}
                                <input type="hidden" id="jobId" name="jobId" value={jobId || ""}/>

                                <div>
                                    <label for="" class="block text-sm font-inter font-bold">Upload your
                                        Resume</label>
                                    <input type="file" id="resume" name="resume"
                                        accept=".pdf,.doc,.docx" required
                                        onChange={handleChange}
                                        class="rounded bg-white file:w-full file:h-12.5 file:border file:border-gray-600 file:rounded-xl mt-2" />
                                    {errors.resume &&
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.resume}
                                        </p>}
                                </div>
                            </div>
                            <textarea name="coverLetter" id="coverLetterArea"
                                placeholder="Cover Letter (Optional)"
                                value={formData.coverLetter}
                                onChange={handleChange}
                                class="mt-6 w-full px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 resize-none shadow-sm"></textarea>

                            <div class="w-full flex justify-center ">
                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    class="bg-linear-to-r from-[#4338CA] via-[#6D28D9] to-[#9333EA] bg-size-200%_auto hover:bg-right transition-all duration-500 w-37.5 h-10 text-white rounded-md mt-4 "
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {loading ? "Submitting..." : "Apply Job"}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    <div class=" sm:hidden w-50% flex justify-center items-center">
                        <img src="Image2.png" alt=""
                            class="w-100 h-100 bg-[#f4f3f8] rounded-md " />
                    </div>

                </div>
            </div>
        </section>
    )
}

export default AplyFormSection
