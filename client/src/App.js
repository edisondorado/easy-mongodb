import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./components/Home.jsx";
import DatabasePage from "./components/Database.jsx";

const NotFound = () => {<h1>404 Not Found</h1>}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/database" element={<DatabasePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;