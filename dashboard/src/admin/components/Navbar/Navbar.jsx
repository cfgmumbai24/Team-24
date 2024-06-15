import React from "react";
import "./Navbar.css";
import profile from "../../../assets/profile_icon.png";
const Navbar = () => {
  return (
    <div className="navbar">
      {/* <img className="logo" src={assets.logo}></img> */}
      <img className="profile" src={profile}></img>
    </div>
  );
};

export default Navbar;
