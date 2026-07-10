import React, { useEffect, useState, useRef } from "react";
// import jobs from "../Data/jobdata";   <-- ye line hata do (ab zaroorat nahi)
import HeroSection from "../Component/HeroSection";
import JobSection from "../Component/JobSection";
import Industryjob from "../Component/Industryjob";
import HireFormSection from "../Component/HireFormSection";
import AplyFormSection from "../Component/AplyFormSection";
import Navbar from "../Component/Navbar";
import About from "../Component/About";
import Contact from "../Component/Contact";
import Newsletter from "../Component/Newsletter";
import Faq from "../Component/Faq";
import Footer from "../Component/Footer";
import AuthModal from "../Component/Auth/AuthModal";

function Home() {
    const [allJobs, setAllJobs] = useState([]);        // original fetched data
    const [filteredJobs, setFilteredJobs] = useState([]); // search ke baad wala data
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const applyFormRef = useRef(null);
    const [selectedJobId, setSelectedJobId] = useState(null);

    // Backend se jobs fetch karo
    useEffect(() => {
        fetch("http://localhost:8080/api/jobs")
            .then((res) => res.json())
            .then((data) => {
                setAllJobs(data);
                setFilteredJobs(data);
            })
            .catch((err) => console.error("Failed to fetch jobs:", err));
    }, []);

    const scrollToApplyForm = (jobId) => {
        setSelectedJobId(jobId);
        applyFormRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    const applyJob = (id) => {
        console.log(id);
    };

    // Search Logic - ab allJobs (fetched data) pe filter hoga
    const searchJobs = () => {
        const filtered = allJobs.filter((job) => {
            return (
                job.jobTitle.toLowerCase().includes(searchTitle.toLowerCase()) &&
                job.location.toLowerCase().includes(searchLocation.toLowerCase())
            );
        });
        setFilteredJobs(filtered);
    };

    return (
        <div>
            <Navbar openAuthModal={() => setShowAuthModal(true)} />

            <section id="home" className="mt-16">
                <HeroSection
                    searchTitle={searchTitle}
                    setSearchTitle={setSearchTitle}
                    searchLocation={searchLocation}
                    setSearchLocation={setSearchLocation}
                    searchJobs={searchJobs}
                />
            </section>

            <section id="jobs">
                <JobSection
                    filteredJobs={filteredJobs}
                    applyJob={applyJob}
                    scrollToApplyForm={scrollToApplyForm}
                />
            </section>

            <section id="">
                <Industryjob />
            </section>

            <section className="hire">
                <HireFormSection />
            </section>

            <section ref={applyFormRef} className="apply">
                <AplyFormSection jobId={selectedJobId} />
            </section>

            <section id="about">
                <About />
            </section>

            <section id="contact">
                <Contact />
            </section>

            <section>
                <Newsletter />
            </section>

            <section>
                <Faq />
            </section>

            <section>
                <Footer />
            </section>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </div>
    );
}

export default Home