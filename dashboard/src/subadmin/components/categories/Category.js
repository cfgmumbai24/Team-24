import React from "react";
import { Outlet } from "react-router-dom";

const Category = () => {
  return (
    <div>
      <h2>Category</h2>
      <Outlet />
    </div>
  );
};

export default Category;
