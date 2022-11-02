import React, { useState } from "react";
import Button from "../button/button";
import ExcelJS from "exceljs";
import "./style.css";

// Utils

/**
 * Assume that the domains of the input "binary" values are defined in a worksheet named "Listes".
 *
 * @param {*} workbook ExcelJS workbook object
 * @returns {array} array of lists defined by extension
 */

function getListDomain(workbook) {
  const sheetName = "Listes";
  const sheet = workbook.getWorksheet(sheetName);

  const lists = [];
  // Extract name of lists (row 1)
  const header = sheet.getRow(1);
  header.eachCell((cell, colNumber) =>
    lists.push({
      name: cell.value,
      sheet: sheetName,
      address: cell.address,
      values: [],
    })
  );

  // Get Values for each list
  lists.map((list, index) => {
    let colNumber = index + 1;
    let col = sheet.getColumn(colNumber);
    let first, last;
    col.eachCell((cell, rowNumber) => {
      if (rowNumber === 2) first = cell.address;
      if (cell.value && rowNumber > 1) {
        list.values.push(cell.value);
        last = cell.address;
      }
    });
    list.range = `${first}:${last}`;
  });

  console.log("Analyse des Listes ", lists);

  return lists;
}

function getDomain(column, lists) {
  let values = [];
  column.eachCell((cell, rowNumber) => {
    if (rowNumber > 4 && cell.value !== null && !values.includes(cell.value))
      values.push(cell.value);
  });

  console.log(" Values : ", values);
}

function getColumnsSchema(worksheet, section, lists) {
  // Row index
  const rType = 3;
  const rLabel = 4;
  const sheet = worksheet.name;

  const columns = [];

  for (let i = section.colFirst; i <= section.colLast; i++) {
    const label = worksheet.getRow(rLabel).getCell(i).value;
    const type = worksheet.getRow(rType).getCell(i).value;
    const address = worksheet.getRow(rLabel).getCell(i).model.address;
    const col = address.match(/([A-Z]+)/)[0];

    let domain = "double";
    if (type && type.toLowerCase() === "binaire")
      domain = getDomain(worksheet.getColumn(i), lists);

    if (label) {
      // column header must be defined
      columns.push({ label, type, domain, col, sheet });
    }
  }

  return columns;
}

const FileUpload = ({ onSubmit }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  function onChangeHandler(e) {
    console.log("Upload :", e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    reader.readAsArrayBuffer(selectedFile);

    reader.onload = () => {
      const buffer = reader.result;

      workbook.xlsx.load(buffer).then((wb) => {
        console.log("workbook imported : ", wb);
        const description = {};

        description.enumerations = getListDomain(wb);

        const ws = wb.getWorksheet("DE");
        description.type = ws.getRow(1).getCell(1).value;

        const sections = ws.getRow(2).values;

        // Get Sections
        let curTitle = "";
        description.sections = [];

        for (let i = 3; i < sections.length; i++) {
          if (sections[i] && sections[i] !== curTitle) {
            if (description.sections.length > 0)
              description.sections[description.sections.length - 1]["colLast"] =
                i - 1;
            description.sections.push({
              title: sections[i],
              colFirst: i,
            });
            curTitle = sections[i];
          }
        }

        description.sections[description.sections.length - 1]["colLast"] =
          sections.length - 1;

        // Get Columns Description
        description.sections.map((section, index) => {
          const schema = getColumnsSchema(
            ws,
            section,
            description.enumerations
          );
          description.sections[index]["columns"] = schema;
        });

        if (onSubmit) onSubmit(description);
      });
    };
  }

  return (
    <form className="uploadForm">
      <label for="uploadForm-filePicker">Choisir un fichier</label>
      <input
        id="uploadForm-filePicker"
        className="uploadForm-input"
        type="file"
        name="filename"
        onChange={onChangeHandler}
      />
      <div class="display-fileName">{selectedFile && selectedFile.name}</div>
      <Button
        className="uploadForm-button"
        type="submit"
        title="Import"
        handleClick={onSubmitHandler}
      />
    </form>
  );
};

export default FileUpload;
