// src/components/routes/Sidebar/Sidebar.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "./Sidebar.css";

const Sidebar = ({ onWordGroupsChange }) => {
  const [showCalendar, setShowCalendar] = useState({
    start: false,
    end: false,
  });

  const [wordGroups, setWordGroups] = useState({
    positive: [],
    negative: [],
    neutral: [],
  });

  const [selectedGroups, setSelectedGroups] = useState({
    positive: false,
    negative: false,
    neutral: false,
  });

  const [customCategories, setCustomCategories] = useState([]); 

  // Fetch word groups from the backend API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/word-groups/")
      .then((response) => {
        setWordGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching word groups", error);
      });
  }, []);

  // Toggle calendar visibility
  const toggleCalendar = (type) => {
    setShowCalendar((prevState) => ({
      ...prevState,
      [type]: !prevState[type],
    }));
  };

  // Toggle checkbox for word groups and notify parent component
  const handleCheckboxChange = (group) => {
    setSelectedGroups((prevState) => {
      const newSelectedGroups = {
        ...prevState,
        [group]: !prevState[group]
      };

      // Update the parent component about the word groups changes
      onWordGroupsChange(newSelectedGroups);

      return newSelectedGroups;
    });
  };

  // Send selected words to the parent component
  const handleSearch = () => {
    const selectedWords = {
      positive: selectedGroups.positive ? wordGroups.positive : [],
      negative: selectedGroups.negative ? wordGroups.negative : [],
      neutral: selectedGroups.neutral ? wordGroups.neutral : [],
      custom: customCategories 
    };

    // Ensure to not trigger this inside render or during a state update
    onWordGroupsChange(selectedWords);
  };

  // Handle adding a new category
  const handleAddCategory = (newCategory) => {
    setCustomCategories([...customCategories, newCategory]);
  };

  return (
    <div>
      <div className="sidebar-container">
        <div className="sidebar-heading">Search by Session</div>
        <div className="sidebar-search-containers">
          {/* Start Date Input */}
          <div className="input-group input-group-sm mb-3 sedi">
            <span className="input-group-text inpu" id="inputGroup-sizing-sm">
              Start Date
            </span>
            <input
              type ="date"
              className="form-control inp"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>

          {/* End Date Input */}
          <div className="input-group input-group-sm mb-3 sedi endi">
            <span className="input-group-text inpu " id="inputGroup-sizing-sm">
              End Date
            </span>
            <input
              type ="date"
              className="form-control inp"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>

          {/* Word Groups Section */}
          <h3 className="categorization">Categorization</h3>
          <div className="word-groupss">
            <div>
              <input
                type="checkbox"
                id="positive"
                checked={selectedGroups.positive}
                onChange={() => handleCheckboxChange("positive")}
              />
              <label className="wordss" htmlFor="positive">
                Positive
              </label>
              {selectedGroups.positive && (
                <ul className="listi">
                  {wordGroups.positive.map((word, index) => (
                    <li key={index}>{word}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <input
                type="checkbox"
                id="negative"
                checked={selectedGroups.negative}
                onChange={() => handleCheckboxChange("negative")}
              />
              <label className="wordss" htmlFor="negative">
                Negative
              </label>
              {selectedGroups.negative && (
                <ul className="listi">
                  {wordGroups.negative.map((word, index) => (
                    <li key={index}>{word}</li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <input
                type="checkbox"
                id="neutral"
                checked={selectedGroups.neutral}
                onChange={() => handleCheckboxChange("neutral")}
              />
              <label className="wordss" htmlFor="neutral">
                Neutral
              </label>
              {selectedGroups.neutral && (
                <ul className="listi">
                  {wordGroups.neutral.map((word, index) => (
                    <li key={index}>{word}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          {/* Search Button */}
          <button
            type="button"
            className="btn btn-primary btns si-srch"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
