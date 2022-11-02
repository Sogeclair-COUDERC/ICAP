import React, { useState, useEffect } from "react";
import axios from "axios";
import Background from "../../component/frame_background/background";
import MenuChiffrages from "../../component/menu_chiffrages/menuChiffrages";
import TableRow from "../../component/tableRow/TableRow";
import Icon from "../../component/icon/Icon";
import "./style.css";

const Chiffrages = () => {
  const base = process.env.REACT_APP_API_URL;

  // States
  const [data, setData] = useState([]);

  // Effects
  useEffect(() => {
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

    getList("api/assessment/getAssessments");
  }, []);

  async function handleAssessmentDelete(e, id) {
    try {
      const response = await axios.get(
        `${base}api/assessment/delete?assessmentId=${id}`
      );
      console.log(`Assessment (id=${id}) deleted.`, response);
      // Update State to rerender the table according to the new state of the DB
      const newTab = data.filter((row) => row.id !== id);
      setData(newTab);
    } catch (error) {
      console.error("Can not delete assessment", error);
      alert(
        `ICAP :: Can not delete assessment.\n Error : ${error.name} (${error.code}) : ${error.message} `
      );
    }
  }

  async function handleDuplicate(assessmentId) {
    try {
      const response = await axios.get(
        `${base}api/assessment/duplicate?assessmentId=${assessmentId}`
      );
      setData(response.data);
      console.log(
        `Assessment (id = ${assessmentId}) duplicated.`,
        response.data
      );
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
