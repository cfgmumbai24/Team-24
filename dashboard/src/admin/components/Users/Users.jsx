import React from "react";
import "./Users.css";
import addicon from "../../../assets/plus.png";
import profile_icon from "../../../assets/profile_icon.png";
import order_icon from "../../../assets/order_icon.png";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import DashboardTitle from "../Dashboardtitle";
import { NavLink } from "react-router-dom/dist";
const Users = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <DashboardTitle />

          <div className="main-container">
            <div className="admin-dashboard-title">
              <span>Admin Dashboard</span>
              <img className="profile" src={profile_icon} alt="Profile Icon" />
            </div>
            <div className="buttons-container">
              <button onClick={() => navigate("/admin/user-add")}>
                <img src={addicon} alt="Add Icon" />
                Add Users
              </button>
              <button onClick={() => navigate("/admin/user-list")}>
                <img src={order_icon} alt="Order Icon" />
                List Users
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
