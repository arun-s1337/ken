import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebarinstructor from "../Sidebarinstructor/Sidebarinstructor";
import "./Dashboardinstructor.css";

const Dashboardinstructor = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard-container">
      <Sidebarinstructor isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`dashboard-content ${isOpen ? "expanded" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboardinstructor;
