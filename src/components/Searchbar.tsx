//* Packages Imports */
import React, { useState } from "react";

//* Styles Imports */
import "./../styles/Searchbar.css";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  //* Handle key down event
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(query.toLowerCase());
    }
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search Song, Artist"
      />
      <button
        onClick={() => handleSearch(query.toLowerCase())}
        className="searchButton"
      >
        <img src="https://img.icons8.com/search" alt="search" />
      </button>
    </div>
  );
};

export default SearchBar;
