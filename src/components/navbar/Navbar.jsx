// src/components/navbar/Navbar.jsx
import React, { useState } from "react";
import { examsData } from "../../data/examData";
import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value) {
      const filteredResults = examsData.filter((item) =>
        item.jobTitle.toLowerCase().includes(value)
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="" />
      </div>
      <div className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li>
      </div>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Search for Jobs..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <div className="searchResults">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Link to={`/job/${result.id}`} key={result.id}>
                  <div className="resultItem">{result.jobTitle}</div>
                </Link>
              ))
            ) : (
              <div className="noResults">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
