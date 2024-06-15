// src/admin/screens/Home.js
import React from "react";
import Sidebar from "../../admin/components/Sidebar/Sidebar";
import CardContainer from "../components/Cardcontainer";
import "./Home.css"; // Assuming you have custom styles in this file

const Home = () => {
  return (
    <div className="d-flex">
      {/* <Sidebar /> */}
      <div className="flex-grow-1 p-4">
        <CardContainer />
      </div>
    </div>
  );
};

export default Home;
