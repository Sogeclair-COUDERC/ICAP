import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/login/login";
import Chiffrages from "./page/chiffrages/chiffrages";
import Direction from "./page/donnees_entree_direction/direction";
import ImportXlsx from "./page/import/importXlsx";
import Test from "./page/test/test";
import CategoryFormPage from "./page/CategoryFormPage/CategoryFormPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chiffrages" element={<Chiffrages />} />
          <Route path="/direction" element={<Direction />} />
          <Route path="*" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/import" element={<ImportXlsx />} />
          <Route path="/form" element={<CategoryFormPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
