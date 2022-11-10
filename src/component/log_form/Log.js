import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import User from './user.json';

const Log = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const ipServ = process.env.REACT_APP_API_URL;

  // Verification Login Password + Droits Utilisateur
  const handleLogin = async (e) => {
    e.preventDefault();

    let ldap_Check = await validationLDAP();
    console.log("ldap_Check : " + ldap_Check);
  };

  function connection() {
    const array = [];

    for(var i in User.User) {
      array.push([User.User[i].login,User.User[i].password, User.User[i].role_id]);
    }
    console.log(login);
    console.log(password);
    for(var y = 0; y < array.length; y++){
      if(array[y][0] === login && array[y][1] === password){
        return [login, password, array[y][2]];
      }
    }
  };
  
  

  // Verification login password sur le LDAP
  const validationLDAP = async () => {
    let isUserAuthentified = false;
    if (login !== "" && password !== "") {
      try {
        let user = connection();
        if (user) {
          isUserAuthentified = true;
          sessionStorage.setItem("user", JSON.stringify(user));
          window.location = "/chiffrages";
        } else {
          alert("Probleme Login ou Password");
        }
      } catch (error) {
        alert(`Probleme d'identification`);
        console.log(error);
      }
    }

    return isUserAuthentified;
  };

  return (
    <div className="connection-form">
      <h3>Login</h3>
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        <div className="login error"></div>
        <input
          type="text"
          id="login"
          placeholder="Enter your login"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
        />
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input id="submit" type="submit" value="Sign in" />
      </form>
    </div>
  );
};

export default Log;
