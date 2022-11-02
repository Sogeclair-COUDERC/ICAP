import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGears,
  faUserGear,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "../Menu/Menu";
import MenuItem from "../MenuItem/MenuItem";
import Button from "../button/button";
import { Link } from "react-router-dom";
import "./style.css";

const MenuChiffrages = () => {
  const specs = [
    {
      id: "item_chiffrage",
      icon: <FontAwesomeIcon icon={faBars} />,
      text: "Chiffrage",
    },
    {
      id: "item_rules",
      icon: <FontAwesomeIcon icon={faGears} />,
      text: "Règles métier",
    },
    {
      id: "item_users",
      icon: <FontAwesomeIcon icon={faUserGear} />,
      text: "Rôles utilisateurs",
    },
  ];

  const items = specs.map((spec) => (
    <MenuItem
      key={`${spec.id}`}
      id={spec.id}
      icon={spec.icon}
      text={spec.text}
    />
  ));

  const user = JSON.parse(sessionStorage.getItem("user"));

  const addIcon = <FontAwesomeIcon icon={faCirclePlus} />;

  return (
    <div id="navbar">
      {user.role.toLowerCase() === "direction" ? (
        <Link to="/direction">
          <Button
            type="button"
            icon={addIcon}
            title="Nouvelle estimation"
            intent="success"
          />
        </Link>
      ) : (
        <Button
          type="button"
          icon={addIcon}
          title="Nouvelle estimation"
          intent="success"
          disabled={true}
        />
      )}
      <Menu items={items} />;
    </div>
  );
};

export default MenuChiffrages;
