// src/admin/screens/Home.js
import React from "react";
import Sidebar from "../../admin/components/Sidebar/Sidebar";
import CardContainer from "../components/Cardcontainer";
import "./Home.css"; // Assuming you have custom styles in this file
import DashboardTitle from "../../admin/components/Dashboardtitle";

const Home = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <DashboardTitle />
        <div className="p-4">
          <div className="d-flex">
            {/* <Sidebar /> */}
            <div className="flex-grow-1 p-4">
              <CardContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
