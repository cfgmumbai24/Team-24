import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardTitle from "../../components/Dashboardtitle";
const List = ({ url }) => {
  const [list, setList] = useState([]);
  //   const fetchList = async () => {
  //     const response = await axios.get(`${url}/api/food/list`);

  //     if (response.data.success) {
  //       setList(response.data.data);
  //     } else {
  //       toast.error("Error");
  //     }
  //   };

  //   const removeUser = async (userId) => {
  //     const response = await axios.post(`${url}/api/remove`, { id: userId });
  //     await fetchList();
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //     } else {
  //       toast.error("Error");
  //     }
  //   };

  useEffect(() => {
    // fetchList();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <DashboardTitle />
        <div className="p-4">
          <div className="list add flex-col">
            <p>All Users</p>
            <div className="list-table">
              <div className="list-table-format title">
                <b>Name</b>
                <b>Email</b>
              </div>
              {list.map((item, index) => {
                return (
                  <div key={index} className="list-table-format">
                    <p>{item.name}</p>
                    <p>{item.email}</p>

                    {/* <p onClick={() => removeUser(user._id)} className="cursor">
                X
              </p> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
