import React from "react";
<<<<<<< HEAD
import logo from "./logo.png";
=======
import logo from "../logo.png";
>>>>>>> origin/denil/backend

const Card = ({ card }) => {
  console.log(card);
  return (
    <div className="card" style={{ width: 360, margin: 10 }}>
      <img
        src={card.product.imgLink}
        className="card-img-top"
        alt="terracota"
      />
      <div className="card-body">
        <h5 className="card-title">{card.title}</h5>
        <p className="card-text">{card.description}</p>
        <div
          className="approval-status"
          style={{ color: "green", fontWeight: "bold" }}
        >
          {card.status}
        </div>
      </div>
    </div>
  );
};

export default Card;
