import React, { useState } from "react";
import "./_inputItem.scss";

/**
 * Composent Input
 * @className add personnal className
 * @label add label
 * @type add type like Number Text Password
 * @value add Value
 * @placeholder add default Value
 * @validation add Alert Message
 * @alertMessage change AlertMessage
 * @footLabel add foot label
 * @handleChange add onChange
 */
const InputItem = ({
  className,
  label,
  type,
  value,
  validation,
  alertMessage,
  footLabel,
  placeholder,
  handleChange,
}) => {
  const [changeState, setChangeState] = useState(false);

  const handleChangeInput = (e) => {
    handleChange(e);
  };

  return (
    <div className={`inputItem ${className}`}>
      {label && <label className={`label`}>{label}</label>}
      <input
        type={type ? type : "text"}
        className={`input`}
        value={value}
        onChange={(e) => {
          handleChangeInput(e.target.value);
        }}
        placeholder={placeholder ? placeholder : ""}
      />
      {validation && changeState && (
        <div
          className={`invalid-input ${
            className && "invalid-input_" + className
          }`}
        >
          {alertMessage ? alertMessage : "Ce champ est obligatoire !"}
        </div>
      )}
      {footLabel && (
        <div className={`footLabel ${className && "footLabel_" + className}`}>
          {footLabel}
        </div>
      )}
    </div>
  );
};

export default InputItem;
