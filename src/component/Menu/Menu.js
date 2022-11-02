import React from "react";
import "./style.css";

const Menu = ({ items }) => {
  return <div className="menu">{items && items}</div>;
};

export default Menu;
