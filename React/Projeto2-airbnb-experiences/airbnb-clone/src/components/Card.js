import React from "react";

export default function Card(props) {
    return (
      <div className="cards">
        <img className="coverImg" src={`./images/${props.coverImg}`} alt="katie"/>
        <div className="card-rating">
          <img className="star" src={"./images/star.png"} alt="icon-star"/>
          <p className="rate">{props.rate} ({props.reviewCount}) .{props.location}</p>
        </div>
        <p>{props.title}</p>
        <p>From ${props.price} / person</p>
      </div>
    ); 
}
