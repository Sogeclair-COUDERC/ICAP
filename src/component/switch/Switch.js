import React, { useEffect, useState } from "react";
import "./_switch.scss";

const Switch = ({ label, checkStatus, className, disabled, handleChange }) => {
  const [checkedState, setCheckedState] = useState(false);
  const [disableState, setDisableState] = useState(false);

  const eventClick = (e) => {
    if (!disableState) {
      const newState = !checkedState;
      setCheckedState(newState);
      handleChange(newState);
    }
  };

  useEffect(() => {
    if (checkStatus) {
      setCheckedState(true);
      handleChange(true);
    }
    if (disabled) setDisableState(true);
  }, []);

  return (
    <div
      className={`switch_container ${className}${
        checkedState ? "active" : ""
      } ${disableState ? "disable" : ""} ${className}`}
    >
      <label className="switch">
        <input
          className="checkbox_slide"
          type="checkbox"
          checked={checkedState}
          disabled={disableState}
          onClick={(e) => {
            eventClick(e);
          }}
        />
        <span className="slider round"></span>
      </label>
      <label className="switch_label">{label}</label>
    </div>
  );
};

export default Switch;
