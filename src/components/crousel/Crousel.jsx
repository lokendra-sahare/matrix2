// src/components/crousel/Crousel.jsx
import React, { useState } from "react";
import { examsData } from "../../data/examData";
import { Link } from "react-router-dom";
import "./crousel.scss";

const Crousel = () => {
  const newJobs = examsData.filter((job) => job.tag === "new");
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newJobs.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + newJobs.length) % newJobs.length
    );
  };

  return (
    <div className="crousel">
      <div className="wrapper">
        <img
          src={newJobs[currentIndex].imageUrl}
          alt={newJobs[currentIndex].jobTitle}
        />
        <div className="layer">
          <div className="buttons">
            <Link to={`/job/${newJobs[currentIndex].id}`}>
              <button>View Details</button>
            </Link>

            <a
              href={newJobs[currentIndex].websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Apply Now</button>
            </a>
          </div>
          <div className="navigation">
            <button onClick={prevSlide} className="prev">
              &#8592;
            </button>
            <button onClick={nextSlide} className="next">
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crousel;
