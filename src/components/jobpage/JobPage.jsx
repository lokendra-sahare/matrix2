import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { examsData } from "../../data/examData";
import "./jobpage.scss";

const JobPage = () => {
  const { jobId } = useParams();
  const job = examsData.find((job) => job.id === parseInt(jobId, 10));

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");
  const [category, setCategory] = useState("");
  const [eligibilityChecked, setEligibilityChecked] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!job) {
    return <p>Job not found.</p>;
  }

  const checkEligibility = () => {
    if (!age || !education || !category) return false;

    const ageNumber = Number(age);

    // Check age, education, and category
    const isAgeEligible = ageNumber >= job.minAge && ageNumber <= job.maxAge;
    const isEducationEligible =
      job.qualificationRequired.toLowerCase() === education.toLowerCase();
    const isCategoryEligible = job.category.includes(category.toLowerCase());

    return isAgeEligible && isEducationEligible && isCategoryEligible;
  };

  const handleEligibilitySubmit = (e) => {
    e.preventDefault();
    setEligibilityChecked(true);
  };

  const isEligible = checkEligibility();

  return (
    <div className="jobPage">
      {/* Sidebar Toggle Button */}
      <button className="home-icon" onClick={toggleSidebar}>
        {sidebarOpen ? "×" : "☰"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="form-container">
          <h5>Check Your Eligibility</h5>
          <form onSubmit={handleEligibilitySubmit}>
            <div>
              <label>Enter your age:</label>
              <input
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label>Select your education:</label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              >
                <option value="">Select Education</option>
                <option value="10th Pass">10th Pass</option>
                <option value="12th Pass">12th Pass</option>
                <option value="Graduate">Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
            </div>
            <div>
              <label>Select your category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="OBC">OBC</option>
                <option value="EWS">EWS</option>
                <option value="PWD">PWD</option>
                <option value="General">General</option>
              </select>
            </div>
            <button type="submit">Check Eligibility</button>
            {eligibilityChecked && (
              <>
                {isEligible ? (
                  <p className="eligible">You are eligible for this job!</p>
                ) : (
                  <p className="not-eligible">
                    You are not eligible for this job.
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      </div>

      {/* Job Page Content */}
      <div className="jobContentContainer">
        <div className="ContentContainer">
          <div className="job-title">
            <h1>Name Of Job :-</h1>
            <h1 className="color">{job.jobTitle}</h1>
          </div>
          <div className="job-description">
            <p className="description-title">Job Description</p>
            <span>:</span>
            <p>{job.description}</p>
          </div>
          <div className="applicationDate">
            <p>Application Starts</p>
            <span>:</span>
            <p>{job.applicationStartDate}</p>
          </div>
          <div className="endingDate">
            <p>Application Last Date</p>
            <span>:</span>
            <p>{job.applicationEndDate}</p>
          </div>
          <div className="qualification">
            <p>Required Qualification</p>
            <span>:</span>
            <p>{job.qualificationRequired}</p>
          </div>
        </div>

        <hr />

        <div className="age-container">
          <h2>Age Criteria</h2>
          <ul>
            <li>
              <div className="min-age">
                <p>Minimum Age</p>
                <span>:</span>
                <p>{job.minAge} Years</p>
              </div>
            </li>
            <li>
              <div className="max-age">
                <p>Maximum Age</p>
                <span>:</span>
                <p>{job.maxAge} Years</p>
              </div>
            </li>
            <li>
              <p>
                Age Relaxation:{" "}
                {job.ageRelaxation || "As per government rules."}
              </p>
            </li>
          </ul>
        </div>

        <hr />

        <div className="myButton">
          <a href={job.websiteUrl} target="_blank" rel="noopener noreferrer">
            <button className="button">
              <p>Apply Now</p>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
