import React from "react";
import InputItem from "../inputItem/InputItem";
import Switch from "../switch/Switch";
import Select from "../select/Select";

import "./style.css";

const CategoryForm = ({ id, numeric, enumerated, enumerations }) => {
  let quanti;
  let binary;
  let binary_enumerated;

  if (numeric && numeric.length > 0) {
    quanti = numeric.map((widget) => (
      <InputItem className="input-de" label={widget.label} />
    ));
  }

  if (enumerated && enumerated.length > 0) {
    binary = enumerated
      .filter((widget) => widget.domain === "Oui/Non")
      .map((widget) => (
        <Switch
          className="input-de"
          label={widget.label}
          handleChange={(v) => console.log(`${widget.label} : ${v}`)}
        />
      ));

    binary_enumerated = enumerated
      .filter((widget) => widget.domain !== "Oui/Non")
      .map((widget) => {
        const enumeration = enumerations.filter(
          (list) => list.name === widget.domain
        )[0];

        const opts = enumeration.values.map((val, index) => {
          return { id: index, name: val };
        });
        console.log(" Category Form : ", opts);
        return (
          <Select
            label={widget.label}
            options={opts}
            handleChange={(v) => console.log(`${widget.label} : ${v}`)}
          />
        );
      });
  }

  return (
    <form className="form-category">
      {quanti && quanti.length > 0 && (
        <div className="form-block">{quanti}</div>
      )}
      <div class="form-block">
        {binary_enumerated && binary_enumerated.length > 0 && (
          <div>{binary_enumerated}</div>
        )}
        {binary && binary.length > 0 && <div>{binary}</div>}
      </div>
    </form>
  );
};

export default CategoryForm;
