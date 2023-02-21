import React from "react";

export default function Card(props) {
  let badgeText
  if (props.openSpots === 0) {
    badgeText = "SOLD OUT"
  } else if (props.location === "Online") {
    badgeText = "ONLINE"
  }

  return (
      <div className="card">
        {badgeText && <div className="card-badge">{badgeText}</div>}
        <img className="coverImg" src={`./images/${props.coverImg}`} alt="katie"/>
        <div className="card-rating">
          <img className="star" src={"./images/star.png"} alt="icon-star"/>
          <p className="rate">{props.rating} ({props.reviewCount}) .{props.location}</p>
        </div>
        <p className="card-title">{props.title}</p>
        <p>From ${props.price} / person</p>
      </div>
    ); 
}
