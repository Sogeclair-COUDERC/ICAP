import React, { useState } from "react";
import InputItem from "../inputItem/InputItem";
import "./style.css";

const Milestone = ({ id, className, label, value, handleChange }) => {
  let initial = value ? value : "";
  const [date, setDate] = useState(initial);

  return (
    <div id={id} className="milestone">
      <div className="milestone-label">{label}</div>
      <div className="milestone-status"></div>
      <InputItem
        className="milestone-date"
        type="date"
        value={date}
        handleChange={(val) => {
          setDate(val);
          handleChange(val);
        }}
      />
    </div>
  );
};

export default Milestone;
