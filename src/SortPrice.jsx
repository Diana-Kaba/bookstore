import React, { useState } from "react";

const SortPrice = ({ onUpdateSortByPrice }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onUpdateSortByPrice(newValue);
  };

  return (
    <div className="container">
      <div className="form-check">
        <input
          type="checkbox"
          id="sort-by-price"
          className="form-control form-check-input mt-0 p-1"
          defaultChecked={isChecked}
          onChange={toggleChange}
        />
        <label htmlFor="sort-by-price" className="form-check-label">
          Сортувати за ціною
        </label>
      </div>
    </div>
  );
};

export default SortPrice;
