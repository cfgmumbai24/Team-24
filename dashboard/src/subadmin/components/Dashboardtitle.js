// src/components/DashboardTitle.js
import React from "react";
import { useLocation } from "react-router-dom";

const DashboardTitle = () => {
  const location = useLocation();

  const dashboardTitle = location.pathname.startsWith("/subadmin")
    ? "Subadmin Dashboard"
    : "Admin Dashboard";

  return (
    <div className="dashboard-title bg-primary text-white text-center py-2">
      <h2>{dashboardTitle}</h2>
    </div>
  );
};

export default DashboardTitle;
