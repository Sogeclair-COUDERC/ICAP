import { useEffect, useState } from "react";
import Background from "../../component/frame_background/background";
import MenuChiffrages from "../../component/menu_chiffrages/menuChiffrages";
import FileUpload from "../../component/FileUpload/FileUpload";
import TableRow from "../../component/tableRow/TableRow";
import Select from "../../component/select/Select";
import InputItem from "../../component/inputItem/InputItem";
import Button from "../../component/button/button";

import "./style.css";

const ImportXlsx = () => {
  const [inputs, setInputs] = useState({});
  const [categories, setCategories] = useState();
  const [header, setHeader] = useState();
  const [body, setBody] = useState();
  const [selectedCategory, setSelectedCategory] = useState({
    id: 0,
    name: "COMMUNE",
  });
  const [domains, setDomains] = useState([]);

  function handleClickOnPreview(e) {
    console.log("Preview Button clicked.", e);

    const params = {
      category: selectedCategory,
      enumerations: inputs.enumerations,
      numeric: [],
      enumerated: [],
    };

    const section = inputs.sections.filter(
      (section) => section.title === selectedCategory["name"]
    )[0];
    const schema = section["columns"];

    console.log("Schema", schema);

    schema.map((col, index) => {
      col.domain = domains[index];
      if (col.type === "Quanti") params.numeric.push(col);
      else params.enumerated.push(col);
    });

    console.log(params);
    window.location = `../form?spec=${JSON.stringify(params)}`;
  }

  useEffect(() => {
    if (inputs.type === "DONNEES D'ENTREE") {
      const cat = inputs.sections.map((section, index) => {
        return {
          id: index,
          name: section.title,
        };
      });
      setCategories(cat);
      console.log("Categories : ", categories);

      const section = inputs.sections.filter(
        (section) => section.title === selectedCategory["name"]
      )[0];
      const schema = section["columns"];

      if (schema.length > 0) {
        const dataHeader = ["label", "type", "domain", "sheet", "col", "field"]; // keys
        const jst = ["left", "center", "left", "center", "center", "left"];
        const fmt = ["", "", "", "", "", ""];

        const quantiDomainOptions = [
          { id: 0, name: "double" },
          { id: 1, name: "int" },
        ];
        const binaryDomainOptions = inputs.enumerations.map((domain, index) => {
          return { id: index, name: domain.name };
        });

        setDomains([]);
        const t = schema.map((row) =>
          row["type"] === "Quanti" ? "double" : "Oui/Non"
        );
        setDomains(t);

        console.log("Domain init : ", t, domains);

        setHeader(
          <TableRow
            type="header"
            content={dataHeader.map((header) => header.toUpperCase())}
            justify={jst}
          />
        );
        setBody(
          schema.map((row, index) => {
            const data = dataHeader.map((col) => {
              if (col === "field")
                return <InputItem id={`${col}-${index}`} type="text" />;
              if (col === "domain") {
                const opts =
                  row["type"] === "Quanti"
                    ? quantiDomainOptions
                    : binaryDomainOptions;
                return (
                  <Select
                    id={`${col}-${index}`}
                    options={opts}
                    value={0}
                    handleChange={(id) => {
                      const d = opts.filter((o) => o.id == id)[0];
                      setDomains((old) => {
                        old[index] = d.name;
                        return old;
                      });
                    }}
                  />
                );
              } else return row[col];
            });
            console.log(data);
            return (
              <TableRow
                key={index}
                content={data}
                justify={jst}
                conditionnalFormat={fmt}
              />
            );
          })
        );
      }
    }
    console.log(header, body);
  }, [inputs, selectedCategory]);

  return (
    <>
      {domains &&
        console.log("-------------------------------domains", domains)}
      <Background></Background>
      <div className="page" id="page-importXlsx">
        <MenuChiffrages id="navbar-chiffrages"></MenuChiffrages>
        <div className="content" id="content-importXlsx">
          <h2 className="title">Import</h2>
          <FileUpload
            onSubmit={(res) => {
              console.log(res);
              setInputs(res);
            }}
          />
          {categories && (
            <div class="toolbar">
              <Select
                id="import-select-category"
                label="Catégorie"
                options={categories}
                value={selectedCategory}
                handleChange={(v) => {
                  console.log("Select Change.", v, categories[v]["name"]);
                  setSelectedCategory(categories[v]);
                }}
              />
              <Button
                type="button"
                intent="default"
                title="PREVIEW"
                handleClick={handleClickOnPreview}
              />
            </div>
          )}

          <div id="container-import-table">
            <table id="import-table">
              <thead>{header}</thead>
              <tbody>{body}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportXlsx;
