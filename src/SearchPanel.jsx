import React, { useState } from "react";

const SearchPanel = ({ onUpdateSearch }) => {
  const [term, setTerm] = useState("");

  const handleUpdateSearch = (e) => {
    const term = e.target.value;
    setTerm(term);
    onUpdateSearch(term);
  };

  return (
    <div className="container text-center">
      <input
        type="text"
        className="form-control search-input"
        placeholder="Search"
        value={term}
        onChange={handleUpdateSearch}
      />
    </div>
  );
};

export default SearchPanel;
