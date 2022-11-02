import React from "react";
import "./style.css";

const Select = ({ id, label, options, handleChange, disabled, value }) => {
  return (
    <div className="select" id={`select-${id}`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        onChange={(e) => handleChange(e.target.value)}
        disabled={disabled || false}
      >
        {options.map((option) => {
          return (
            <option
              key={option.id}
              value={option.id}
              selected={(value && value === option.id) || false}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
