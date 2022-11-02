import React from "react";
import "./style.css";

const MenuItem = ({ id, icon, text }) => {
  return (
    <div className="menuItem" id={id}>
      {icon && <span className="menuItem-icon">{icon}</span>}
      {text && <span className="menuItem-text">{text}</span>}
    </div>
  );
};

export default MenuItem;
