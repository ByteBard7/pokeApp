import React from "react";

const Search = ({ searchQuery, handleSearch }) => {
  const handleInputChange = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleInputChange}
      placeholder="Search Pokémon..."
      className="border p-2 rounded w-full mb-4"
    />
  );
};

export default Search;
