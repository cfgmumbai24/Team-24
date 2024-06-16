import React, { useEffect, useState } from "react";
import { MDBListGroup, MDBListGroupItem, MDBBtn } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../Sidebar/Sidebar";
import DashboardTitle from "../Dashboardtitle";
import axios from "axios";
import config from "../../../config/config";
import profile_icon from "../../../assets/profile_icon.png";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${config.BACKEND_URL}/super-user`)
      .then((response) => {
        setUsers(response.data.data.users);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <DashboardTitle />

        <div className="main-container">
          <div className="admin-dashboard-title">
            <span>Admin Dashboard</span>
            <img className="profile" src={profile_icon} alt="Profile Icon" />
          </div>
          <MDBListGroup style={{ minWidth: "22rem" }} light>
            {users.map((user) => {
              return (
                <MDBListGroupItem className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img
                      src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                      alt=""
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.name}</p>
                      <p className="text-muted mb-0">{user.email}</p>
                    </div>
                  </div>
                  <MDBBtn size="sm" rounded color="danger">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </MDBBtn>
                </MDBListGroupItem>
              );
            })}
          </MDBListGroup>
        </div>
      </div>
    </div>
  );
}
