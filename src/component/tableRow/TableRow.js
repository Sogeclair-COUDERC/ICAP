import React from "react";
import "./style.css";

const map_justify = {
  right: "col-align-right",
  center: "col-align-center",
  left: "col-align-left",
};

function formatWith(format, value) {
  if (format) return format(value);
  else return "";
}

const TableRow = ({ id, type, content, justify, conditionnalFormat }) => {
  const cells = content.map((cell, index) => {
    if (type === "header")
      return (
        <th className={map_justify[justify[index]]} key={`head_col${index}`}>
          {cell}
        </th>
      );
    else
      return (
        <td
          key={`col${index}`}
          className={`${map_justify[justify[index]]} ${formatWith(
            conditionnalFormat[index],
            cell
          )}`}
        >
          {cell}
        </td>
      );
  });

  return <tr id={id}>{cells}</tr>;
};

export default TableRow;
