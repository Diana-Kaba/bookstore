import React, { useState } from "react";

const SortPanel = ({ onUpdateSort }) => {
  const [isChecked, setIsChecked] = useState(false);


  const toggleChange = (e) => {
  const newValue = !isChecked;
  setIsChecked(newValue);
  onUpdateSort(newValue);
 };

  return (
    <div className="container">
      <div className="form-check">
        <input
          type="checkbox"
          id="sort-by-name"
          className="form-control form-check-input mt-0 p-1"
          defaultChecked={isChecked}
          onChange={toggleChange}
        />
        <label htmlFor="sort-by-name" className="form-check-label">
          Сортувати по імені
        </label>
      </div>
    </div>
  );
};

export default SortPanel;
