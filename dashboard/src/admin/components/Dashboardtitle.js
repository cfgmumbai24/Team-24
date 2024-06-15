// src/components/DashboardTitle.js
import React from "react";
import { useLocation } from "react-router-dom";

const DashboardTitle = () => {
  const location = useLocation();

  const dashboardTitle = location.pathname.startsWith("/subadmin")
    ? "Subadmin Dashboard"
    : "Admin Dashboard";

  return (
    <div
      className="dashboard-title text-center py-2"
      style={{
        backgroundColor: "#f8ebed",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "4px", // Optional: add rounded corners
        margin: "10px", // Optional: add some margin
      }}
    >
      <h2>{dashboardTitle}</h2>
    </div>
  );
};

export default DashboardTitle;
