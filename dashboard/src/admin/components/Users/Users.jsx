import React from "react";
import "./Users.css";
import addicon from "../../../assets/plus.png";
import profile_icon from "../../../assets/profile_icon.png";
import order_icon from "../../../assets/order_icon.png";
import { NavLink } from "react-router-dom";
const Users = () => {
  return (
    <>
      <div className="navbar">
        <img className="profile" src={profile_icon} alt=".."></img>
      </div>
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to="/add" className="sidebar-option active">
            <img src={addicon} alt=".."></img>
            <p>Add Users</p>
          </NavLink>

          <NavLink to="/list" className="sidebar-option active">
            <img src={order_icon}></img>
            <p> List Users</p>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Users;
