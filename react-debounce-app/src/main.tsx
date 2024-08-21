import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchComponent from "./components/SearchComponent";
import LocationDetail from "./components/LocationDetail";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SearchComponent />} />
        <Route path="/location/:place_id" element={<LocationDetail />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
