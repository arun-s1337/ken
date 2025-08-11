import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "../SuperAdminSidebar/SuperAdminSidebar";
import "./SuperAdminDashboard.css";

const SuperAdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard-container">
      <div
        className="dashboard-sidebar"
        style={{ width: isOpen ? "200px" : "40px" }} // adjust width as needed
      >
        <SuperAdminSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
