import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Background from "../../component/frame_background/background";
import MenuDirection from "../../component/menu_direction/menuDirection";
import Button from "../../component/button/button";
import InputItem from "../../component/inputItem/InputItem";
import Timeline from "../../component/Timeline/Timeline";
import "./style.css";
import Select from "../../component/select/Select";
import RadioBtn from "../../component/radioBtn/RadioBtn";

const Direction = () => {
  // States
  const [disabled, setDisabled] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [parts, setParts] = useState([]);

  const [customer, setCustomer] = useState("");
  const [program, setProgram] = useState("");
  const [partFamily, setPartFamily] = useState("");

  const [title, setTitle] = useState("");
  const [receptionAO, setReceptionAO] = useState(""); //date
  const [firstDeliveryOn, setfirstDeliveryOn] = useState(""); //date

  const [transferOfWork, setTransferOfWork] = useState(false);
  const [siteQualificationNeed, setSiteQualificationNeed] = useState(false);
  const [technicalModification, setTechnicalModification] = useState(false);

  const [TRL, setTRL] = useState(Array(9).fill(""));

  // Effects

  useEffect(() => {
    const base = process.env.REACT_APP_API_URL;
    function getList(endpoint, setList) {
      const firstChoice = { id: 0, name: "Entrer une valeur" };

      axios
        .get(`${base + endpoint}`)
        .then((res) => {
          console.log("get list", res.data, " @ ", `${base + endpoint}`);
          const list = [firstChoice].concat(res.data);
          setList(list);
        })
        .catch((error) => {
          console.log("Can not get list ", error, " @ ", `${base + endpoint}`);
          setList([]);
        });
    }

    // HANDLE ROLE
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user.role === "Direction") setDisabled(false);
    console.log("user : ", user, user["role"], disabled);

    // GET SELECT VALUES
    getList("api/assessment/list?src=Customer", setCustomers);
    getList("api/assessment/list?src=Program", setPrograms);
    getList("api/assessment/list?src=PartFamily", setParts);

    // GET INITIAL VALUES FOR THE FORM

    let params = new URLSearchParams(document.location.search);
    let assessmentId = params.get("assessment");
    if (assessmentId) {
      axios
        .get(
          `${base}api/assessment/get?src=Assessment&key=id&id=${assessmentId}`
        )
        .then((result) => {
          let assessment = result.data[0];
          console.log(`Assessment loaded (id=${assessmentId})`, assessment);
          setCustomer(assessment["customer_id"]);
          setProgram(assessment["program_id"]);
          setPartFamily(assessment["partFamily_id"]);
          setTitle(assessment["title"]);
          setReceptionAO(assessment["receptionAO"]);
          setfirstDeliveryOn(assessment["firstDeliveryOn"]);
        })
        .catch((error) => console.error(error.message));
    }
  }, []);

  // Handle State Changes
  function handleTypeOfWork(work) {
    switch (work) {
      case "Transfer of Work":
        setTransferOfWork(true);
        setSiteQualificationNeed(false);
        setTechnicalModification(false);
        break;
      case "Besoin Qualification Site":
        setTransferOfWork(false);
        setSiteQualificationNeed(true);
        setTechnicalModification(false);
        break;
      case "Modification Technique":
        setTransferOfWork(false);
        setSiteQualificationNeed(false);
        setTechnicalModification(true);
        break;
    }
  }

  // Submit Form
  async function handleGeneralInformationForm(e) {
    const base = process.env.REACT_APP_API_URL; // URL Backend server

    let formData = {
      customerId: customer,
      programId: program,
      partFamilyId: partFamily,
      title: title,
      receptionAO: receptionAO,
      firstDeliveryOn: firstDeliveryOn,
      transferOfWork: transferOfWork,
      siteQualificationNeed: siteQualificationNeed,
      technicalModification: technicalModification,
      milestoneTypeId: 1,
      milestonesDates: TRL,
    };

    function validate(form) {
      if (form.customerId === "0" || form.customerId === "")
        form.customerId = null;
      if (form.programId === "0" || form.programId === "")
        form.programId = null;
      if (form.partFamilyId === "0" || form.partFamilyId === "")
        form.partFamilyId = null;
      if (form.receptionAO === "") form.receptionAO = null;
      if (form.firstDeliveryOn === "") form.firstDeliveryOn = null;

      return form;
    }

    e.preventDefault();

    console.log("Save button was clicked", base, formData);

    try {
      const vform = validate(formData);
      console.log("Validated form : ", vform);
      const response = await axios.post(
        `${base}api/assessment/postAssessment`,
        vform
      );
      console.log("Form submitted ", response.data);
    } catch (error) {
      alert(`Submit request failed`);
      console.log(error);
    }
  }

  // render

  return (
    <>
      <Background></Background>
      <div className="page" id="container-directionPage-content">
        <MenuDirection id="direction-navbar"></MenuDirection>
        <div className="content" id="container-content">
          <h2 className="title">Nouvelle Estimation</h2>
          <div id="container-form">
            <h3> Informations générales</h3>

            <form
              id="form_generalInformation"
              onSubmit={(e) => handleGeneralInformationForm(e)}
            >
              <div className="row" id="direction-form-row1">
                <Select
                  id="costing_customer"
                  label="Client"
                  handleChange={(v) => setCustomer(v)}
                  options={customers}
                  value={customer}
                  disabled={disabled}
                ></Select>

                <Select
                  id="costing_program"
                  label="Programme"
                  handleChange={(v) => setProgram(v)}
                  options={programs}
                  value={program}
                  disabled={disabled}
                ></Select>

                <Select
                  id="costing_partFamily"
                  label="Famille de pièces"
                  handleChange={(v) => setPartFamily(v)}
                  options={parts}
                  value={partFamily}
                  disabled={disabled}
                ></Select>
              </div>

              <div className="row" id="direction-form-row2">
                <InputItem
                  className="col3"
                  label="Titre"
                  type="text"
                  handleChange={(e) => setTitle(e)}
                  value={title}
                />
                <InputItem
                  className="col1"
                  label="Réception AO"
                  type="date"
                  handleChange={(e) => setReceptionAO(e)}
                  value={receptionAO}
                />
                <InputItem
                  className="col1"
                  label="Date 1ère Livraison souhaitée"
                  type="date"
                  handleChange={(e) => setfirstDeliveryOn(e)}
                  value={firstDeliveryOn}
                />
              </div>
              <div className="row" id="direction-form-row3">
                <RadioBtn
                  className="cca-direction-radioBtn"
                  listRadio={[
                    { radioName: "Transfer of Work" },
                    { radioName: "Besoin Qualification Site" },
                    { radioName: "Modification Technique" },
                  ]}
                  handleChange={(e) => handleTypeOfWork(e)}
                  alignItem="center"
                />
              </div>

              <div className="row" id="direction-form-row4">
                <Timeline
                  type={technicalModification ? "MRL" : "TRL"}
                  numberOfStep={technicalModification ? 5 : 9}
                  value={TRL}
                  handleChange={(val) => {
                    setTRL(val);
                  }}
                />
              </div>

              <div className="row" id="direction-form-row5">
                <Link to="/chiffrages">
                  <Button
                    intent="warning"
                    title="Cancel"
                    href="/chiffrages"
                  ></Button>
                </Link>
                <Button type="submit" intent="success" title="Save"></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Direction;
