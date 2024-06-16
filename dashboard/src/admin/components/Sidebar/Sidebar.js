import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Sidebar.css";
import axios from "axios";
import config from "../../../config/config";
import AddCategoryModal from "../AddCategoryModal";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  const basePath = location.pathname.startsWith("/subadmin")
    ? "/subadmin"
    : "/admin";

  useEffect(() => {
    axios
      .get(`${config.BACKEND_URL}/category`)
      .then((response) => {
        setCategories(response.data.data.categories);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <Link to={basePath} className="sidebar-brand">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <button
          className="btn btn-outline-light btn-sm toggle-button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
      </div>
      <ul className="list-unstyled components">
        <li>
          <Link to={`${basePath}/approve`}>Dashboard</Link>
        </li>
        {basePath === "/admin" && (
          <li>
            <Link to={`${basePath}/users`}>Users</Link>
          </li>
        )}
        <li>
          <span className="category-title">Categories:</span>
          <ul className="category-list">
            {categories.map((c) => {
              return (
                <li>
                  <Link to={`${basePath}/category/terracotta-ornaments`}>
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
      <AddCategoryModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default Sidebar;
