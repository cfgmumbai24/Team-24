import React from "react";
import { MDBListGroup, MDBListGroupItem, MDBBtn } from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  return (
    <MDBListGroup style={{ minWidth: "22rem" }} light>
      <MDBListGroupItem className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src="https://mdbootstrap.com/img/new/avatars/8.jpg"
            alt=""
            style={{ width: "45px", height: "45px" }}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">John Doe</p>
            <p className="text-muted mb-0">john.doe@gmail.com</p>
          </div>
        </div>
        <MDBBtn size="sm" rounded color="danger">
          <FontAwesomeIcon icon={faTrashAlt} />
        </MDBBtn>
      </MDBListGroupItem>
    </MDBListGroup>
  );
}
