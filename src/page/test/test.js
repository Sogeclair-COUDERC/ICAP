import React from "react";
import Button from "../../component/button/button";
import Background from "../../component/frame_background/background";
import Icon from "../../component/icon/Icon";
import Milestone from "../../component/milestone/Milestone";
import MenuItem from "../../component/MenuItem/MenuItem";
import FileUpload from "../../component/FileUpload/FileUpload";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGears, faUserGear } from "@fortawesome/free-solid-svg-icons";

const Test = () => {
  const icon1 = <FontAwesomeIcon icon={faBars} />;
  const icon2 = <FontAwesomeIcon icon={faGears} />;
  const icon3 = <FontAwesomeIcon icon={faUserGear} />;
  const base = process.env.REACT_APP_API_URL;

  return (
    <>
      <Background />
      <div id="container-test">
        <div className="demo" id="demo-intent">
          <h3> Intent </h3>
          <Button title="Cancel"></Button>
          <Button title="Cancel" intent="success"></Button>
          <Button title="Cancel" intent="warning"></Button>
        </div>
        {/* <div className="demo" id="demo-button-icap">
          <h3> ICAP </h3>
          <Button title="Sign In"></Button>
          <Button title="Cancel" intent="warning"></Button>
          <Button title="Create" intent="success"></Button>
          <Button title="Save" intent="success"></Button>
          <Button title="Save"></Button>
          <Button title="Nouvelle estimation" intent="success"></Button>
          <Button
            title="Nouvelle estimation"
            intent="success"
            icon={{ src: "./icon_add.png" }}
          ></Button>
          <Button title="Générer le chiffrage" intent="success"></Button>
          <Button title="Nouveau moyen" intent="success"></Button>
          <Button title="Nouvelle règle" intent="success"></Button>
        </div> */}
        {/* <div className="demo" id="demo-milestone">
          <Milestone
            id="TRL1"
            label="TRL1"
            value="2022-09-01"
            handleChange={(v) => console.log("TRL1 : ", v)}
          />
        </div>
        <div className="demo" id="demo-menuItem">
          <MenuItem id="item-chiffrage" icon={icon1} text="Chiffrage" />
          <MenuItem id="item-rules" icon={icon2} text="Règles métier" />
          <MenuItem id="item-roles" icon={icon3} text="Rôles utilisateurs" />
          <MenuItem id="item-chiffrage2" icon={icon1} />
          <MenuItem id="item-chiffrage3" text="Chiffrage" />
        </div> */}
        <div className="demo" id="demo-importXLSX">
          <FileUpload />
        </div>
        <Icon />
      </div>
    </>
  );
};

export default Test;
