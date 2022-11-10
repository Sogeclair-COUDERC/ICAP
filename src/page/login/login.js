import React from "react";
import Log from "../../component/log_form/Log";
import "./style.css";

const Login = () => {
  return (
    <>
      <div id="container-loginPage-content">
        <img id="img-background" src="./icap_fond_login_3.jpg"></img>
        <div id="container-loginPage-title">
          <h1>ICAP</h1>
        </div>
        {/* <img id="img-trappe" src="./icap_trappe.png" alt="trappe avion" /> */}
      </div>
      <Log />
    </>
  );
};

export default Login;
