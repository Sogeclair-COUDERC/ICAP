import React, { useState, useEffect } from "react";

import Background from "../../component/frame_background/background";
import MenuChiffrages from "../../component/menu_chiffrages/menuChiffrages";
import CategoryForm from "../../component/CategoryForm/CategoryForm";

import "./style.css";

const CategoryFormPage = () => {
  const [title, setTitle] = useState("Données d'entrée");
  const [numeric, setNumeric] = useState([]);
  const [enumerated, setEnumerated] = useState([]);
  const [enumerations, setEnumerations] = useState([]);

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    const spec = JSON.parse(params.get("spec"));

    let t = `${title} : ${spec.category.name}`;
    setTitle(t);
    setNumeric(spec.numeric);
    setEnumerated(spec.enumerated);
    setEnumerations(spec.enumerations);
  }, []);

  return (
    <>
      <Background></Background>
      <div className="page" id="page-categoryForm">
        <MenuChiffrages id="navbar-chiffrages"></MenuChiffrages>
        <div className="content" id="content-categoryForm">
          <div>
            <a href="/import">Back</a> <h2 className="title">{title}</h2>
          </div>
          <CategoryForm
            numeric={numeric}
            enumerated={enumerated}
            enumerations={enumerations}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryFormPage;
