// src/components/eligibility/EligibilitySearch.jsx
import React, { useState } from "react";
import { examsData } from "../../data/examData";
import { Link } from "react-router-dom";
import "./eligibilitySearch.scss";

const EligibilitySearch = () => {
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");
  const [category, setCategory] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState(6);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleEligibilitySearch = (e) => {
    e.preventDefault();

    if (!age || !education || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const ageNumber = Number(age);

    if (ageNumber < 18) {
      alert("You are not eligible for these jobs as your age is below 18.");
      setFilteredJobs([]);
      return;
    }

    const eligibleJobs = examsData.filter((job) => {
      const minAge = Number(job.minAge);
      const maxAge = Number(job.maxAge);
      return (
        ageNumber >= minAge &&
        ageNumber <= maxAge &&
        job.qualificationRequired.toLowerCase() === education.toLowerCase() &&
        job.category.includes(category.toLowerCase())
      );
    });

    setFilteredJobs(eligibleJobs);
    setSearchPerformed(true);
  };

  const loadMoreJobs = () => {
    setVisibleJobs((prevVisibleJobs) => prevVisibleJobs + 6);
  };

  return (
    <div className="eligibility-search">
      <h2>Eligibility Search</h2>
      <form onSubmit={handleEligibilitySearch}>
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
        <button type="submit">Find Eligible Jobs</button>
      </form>

      <div className="results">
        {!searchPerformed ? (
          <p>Your results will show here</p>
        ) : filteredJobs.length > 0 ? (
          <>
            <div className="jobs-grid">
              {filteredJobs.slice(0, visibleJobs).map((job) => (
                <div className="job-card" key={job.id}>
                  <h3>{job.jobTitle}</h3>
                  <p>{job.description.substring(0, 100)}...</p>
                  <p>
                    <strong>Age Limit:</strong> {job.minAge} - {job.maxAge}{" "}
                    Years
                  </p>
                  <p>
                    <strong>Categories:</strong> {job.category.join(", ")}
                  </p>
                  <div className="job-actions">
                    <Link to={`/job/${job.id}`}>
                      <button>View Details</button>
                    </Link>
                    <a
                      href={job.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button>Apply Now</button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {visibleJobs < filteredJobs.length && (
              <button className="load-more" onClick={loadMoreJobs}>
                Load More
              </button>
            )}
          </>
        ) : (
          <p>No jobs found matching your eligibility.</p>
        )}
      </div>
    </div>
  );
};

export default EligibilitySearch;
