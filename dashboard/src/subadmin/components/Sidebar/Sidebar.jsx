import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const basePath = location.pathname.startsWith("/subadmin")
    ? "/subadmin"
    : "/admin";

  return (
    <div
      className={`sidebar-container ${isCollapsed ? "sidebar-collapsed" : ""}`}
    >
      <nav
        className={`sidebar bg-light border-right ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        <div
          className="sidebar-header p-3 text-center"
          style={{ color: "#FF4162" }}
        >
          <Link to={basePath}>
            <img
              src={logo}
              className="card-img-top"
              alt="Logo"
              style={{ width: "70px" }}
            />
          </Link>
          <button
            className="btn btn-outline-light btn-sm mt-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? "Expand" : "Collapse"}
          </button>
        </div>
        <ul className="list-unstyled components p-3">
          <li>
            <Link to={`${basePath}/approve`}>Dashboard</Link>
          </li>
          <li>
            <Link
              to="/categorySubmenu"
              data-bs-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              Category
            </Link>
            <ul className="collapse list-unstyled" id="categorySubmenu">
              <li>
                <Link to={`${basePath}/category/terracotta-ornaments`}>
                  Terracotta Ornaments & Home Decor
                </Link>
              </li>
              <li>
                <Link to={`${basePath}/category/macrame-based-handicraft`}>
                  Macrame Based Handicraft
                </Link>
              </li>
              <li>
                <Link to={`${basePath}/category/moonj-based-handicrafts`}>
                  Moonj Based Handicrafts
                </Link>
              </li>
              <li>
                <Link to={`${basePath}/category/banana-fiber-ornaments`}>
                  Banana Fiber based ornaments & Home Decor
                </Link>
              </li>
              <li>
                <Link to={`${basePath}/category/jute-bags`}>
                  Jute Bags & Allied Products
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
