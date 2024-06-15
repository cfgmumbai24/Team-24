import React, { useEffect, useState } from "react";
import "./Add.css";
// import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.email);
    const response = await axios.post(`${url}/api/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        email: "",
      });

      setData(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
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
  );
};
export default Add;
