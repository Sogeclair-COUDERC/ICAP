import React from "react";
import Icon from "../icon/Icon";
import "./style.css";

function buttonIntent(intent) {
  switch (intent) {
    case "success":
      return "button-intent-success";
    case "warning":
      return "button-intent-warning";
    default:
      return "button-intent-default";
  }
}

const Button = ({ type, icon, title, intent, disabled, handleClick }) => {
  let t = type || "button";

  return (
    <>
      <button
        type={t}
        className={`icap-button ${buttonIntent(intent)} ${
          disabled && disabled == true ? "button-disabled" : ""
        }`}
        disabled={disabled || false}
        onClick={(e) => handleClick(e)}
      >
        {icon && <div className="icap-button-icon">{icon}</div>}
        <div className="icap-button-text">{title}</div>
      </button>
    </>
  );
};

export default Button;
