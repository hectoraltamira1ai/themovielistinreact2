import React, { useState } from "react";
import "../styles/Header.css";

const Header = ({ onSearch, onReset }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const handleSearch = () => {
    onSearch(title, year);
  };

  const handleReset = () => {
    setTitle(""); // Clear the title input
    setYear(""); // Clear the year input
    onReset(); // Call the reset function to reset the movie list
  };

  return (
    <header className="app-header">
      <div className="search-container">
        <h1 className="app-title">The Movie List</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="header-input"
        />
        <input
          type="text"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          className="header-input"
        />
        <button onClick={handleSearch} className="button">
          Search
        </button>
        <button onClick={handleReset} className="button">
          Reset
        </button>
      </div>
    </header>
  );
};

export default Header;
