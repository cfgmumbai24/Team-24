import React from "react";
import logo from "./logo.png";

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
