// import React, { useEffect, useState } from "react";
// import "./Add.css";
// import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import DashboardTitle from "../../components/Dashboardtitle";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useState } from "react";
import config from "../../../config/config";

const Add = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    role: "CLUSTER_USER",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      `${config.BACKEND_URL}/super-user`,
      ...data
    );
    if (response.data.success) {
      setData({
        name: "",
        email: "",
        role: "CLUSTER_USER",
      });

      setData(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <DashboardTitle />
        <div className="p-4">
          <div className="add">
            <form className="flex-col" onSubmit={onSubmitHandler}>
              <div className="add-product-name flex-col">
                <p>Name</p>
                <input
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  name="name"
                  placeholder="Type here"
                />
              </div>
              <div className="add-product-description flex-col">
                <p>Email</p>
                <input
                  onChange={onChangeHandler}
                  value={data.email}
                  name="email"
                  placeholder="Write email here"
                  required
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
