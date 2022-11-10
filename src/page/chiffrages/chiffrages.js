import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "../../component/frame_background/background";
import MenuChiffrages from "../../component/menu_chiffrages/menuChiffrages";
import TableRow from "../../component/tableRow/TableRow";
import Icon from "../../component/icon/Icon";
import "./style.css";
import estimation from './estimation.json';

const Chiffrages = () => {
  const base = process.env.REACT_APP_API_URL;
  // States
  const [data, setData] = useState([]);

  // Permet la récupération des données assessment 
  function dataattribut(){
    const array = [];
    const tab = [];
    for(var i in estimation.assessment) {
        array["customer"] = [customerID(estimation.assessment[i].customer_id)];
        array["estimation"] = [estimation.assessment[i].estimation];
        array["firstdelivery"] = [estimation.assessment[i].firstDeliveryOn]; 
        array["id"] = [estimation.assessment[i].id];
        array["label"] = [estimation.assessment[i].label];
        array["lastupdateOn"] = [estimation.assessment[i].lastUpdateOn];
        array["partfamily"] = [PartFamily(estimation.assessment[i].partFamily_id)];
        array["program"] = [Program(estimation.assessment[i].program_id)];
        array["status"] = [assessmentStatus(estimation.assessment[i].assessmentStatus_id)];
        array["title"] = [estimation.assessment[i].title];
        tab.push(array);
      }
      console.log(tab);
    return tab;
  
  }

  function customerID(id){
    for(var i in estimation.Customer) {
      if(estimation.Customer[i].id === id){
        return estimation.Customer[i].name;
      }
    }
  }

  function Program(id){
    for(var i in estimation.Program) {
      if(estimation.Program[i].id === id){
        return estimation.Program[i].name;
      }
    }
  }

  function PartFamily(id){
    for(var i in estimation.PartFamily) {
      if(estimation.PartFamily[i].id === id){
        return estimation.PartFamily[i].name;
      }
    }
  }

  function assessmentStatus(id){
    for(var i in estimation.assessmentStatus) {
      if(estimation.assessmentStatus[i].id === id){
        return estimation.assessmentStatus[i].name;
      }
    }
  }

  function getlastId(){
    let lenght = 0;
    for(var i in estimation.assessment) {
      if(estimation.assessment[i].id > lenght){
        lenght = estimation.assessment[i].id;
      }
    }
    return lenght;
  }
  // Permet la récupération des données assessment 
  function duplicate(id){
    let idE = getlastId();
    idE ++;
    let ide = id.toString();
    for(var i in estimation.assessment) {
      let idInt = estimation.assessment[i].id.toString();
        if(idInt === ide){
          var myest = {
            "id": idE,
            "label":null,
            "title": estimation.assessment[i].title + " (copy)",
            "lastUpdateOn":estimation.assessment[i].lastUpdateOn,
            "assessmentStatus_id":estimation.assessment[i].assessmentStatus_id,
            "estimation":null,
            "customer_id":estimation.assessment[i].customer_id,
            "program_id":estimation.assessment[i].program_id,
            "partFamily_id":estimation.assessment[i].partFamily_id,
            "receptionAO":estimation.assessment[i].receptionAO,
            "firstDeliveryOn":estimation.assessment[i].firstDeliveryOn,
            "transferOfWork":estimation.assessment[i].transferOfWork,
            "siteQualificationNeed":estimation.assessment[i].siteQualificationNeed,
            "technicalModification":estimation.assessment[i].technicalModification
          };
          estimation.assessment.push(myest);
          console.log(estimation.assessment);
          return 1; 
        }
    }
  }

  // Permet la récupération des données assessment 
  function deleteAss(id){
    let ide = id.toString();
    for(var i in estimation.assessment) {
      let idInt = estimation.assessment[i].id.toString();
        if(idInt === ide){
          console.log(estimation.assessment[i]);
          delete estimation.assessment[i];
          console.log(estimation.assessment);
        }
      }
  }

  // Effects
  useEffect(() => {
    setData(dataattribut());
    async function getList(endpoint) {
      try {
        let reponse = await axios.get(`${base + endpoint}`);
        console.log("get list", reponse.data, " @ ", `${base + endpoint}`);
        setData(reponse.data);
      } catch (error) {
        console.log("Can not get list ", error, " @ ", `${base + endpoint}`);
        setData([]);
      }
    }
  }, []);

  async function handleAssessmentDelete(e, id) {
    try {
      deleteAss(id);

      // Update State to rerender the table according to the new state of the DB
      //const newTab = data.filter((row) => row.id !== id);
      //setData(newTab);
      setData(dataattribut());
    } catch (error) {
      console.error("Can not delete assessment", error);
      alert(
        `ICAP :: Can not delete assessment.\n Error : ${error.name} (${error.code}) : ${error.message} `
      );
    }
  }

  async function handleDuplicate(assessmentId) {
    try {
      duplicate(assessmentId);
      setData(dataattribut());
      console.log(assessmentId);
      
    } catch (error) {
      console.error("Can not duplicate assessment.", error);
      alert(
        `ICAP :: Can not duplicate assessment.\n Error : ${error.name} (${error.code}) : ${error.message} `
      );
    }
  }

  function formatStatus(status) {
    switch (status) {
      case "En Cours":
        return "intent-warning";
      case "Terminé":
        return "intent-success";
      case "Annulé":
      default:
        return "intent-default";
    }
  }

  const columns = [
    { title: "Label", key: "label" },
    { title: "Client", key: "customer" },
    { title: "Programme", key: "program" },
    { title: "Famille de Pièces", key: "partFamily" },
    { title: "Titre", key: "title" },
    { title: "Last Update", key: "lastUpdateOn" },
    {
      title: "Status",
      key: "status",
      justify: "center",
      conditionnalFormat: formatStatus,
    },
    { title: "Estimation", key: "assessment", justify: "center" },
    { title: "Actions", justify: "center" },
  ];

  const normalize = (value) =>
    value === null || value === undefined ? "-" : value;

  const rows = data.map((row) => {
    let cells = columns.map((col) => {
      if (col.title === "Actions") {
        return [
          <Icon
            name="copy"
            size="24px"
            onClick={(e) => {
              console.log("Duplicate assessment id = ", row.id);
              handleDuplicate(row.id);
            }}
          />,
          <Icon
            name="pen"
            size="24px"
            onClick={(e) => {
              window.location.href = `/direction?assessment=${row.id}`;
            }}
          />,
          <Icon
            name="trash"
            size="24px"
            onClick={(e) => {
              console.log("Delete clicked.");
              handleAssessmentDelete(e, row.id);
            }}
          />,
        ];
      } else return normalize(row[col.key]);
    });

    let justifications = columns.map((col) =>
      col.justify ? col.justify : "left"
    );
    let conditionnals = columns.map((col) => col.conditionnalFormat);
    return (
      <TableRow
        id={row.id}
        content={cells}
        justify={justifications}
        conditionnalFormat={conditionnals}
      />
    );
  });

  return (
    <>
      <Background></Background>
      <div className="page" id="page-chiffrages">
        <MenuChiffrages id="navbar-chiffrages"></MenuChiffrages>
        <div className="content" id="content-chiffrages">
          <h2 className="title">Liste des estimations en cours</h2>
          <div id="content-chiffrages-table">
            <table>
              <thead>
                <TableRow
                  type="header"
                  content={columns.map((col) => col.title)}
                  justify={columns.map((col) =>
                    col.justify !== undefined ? col.justify : "left"
                  )}
                />
              </thead>
              <tbody>{rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chiffrages;
