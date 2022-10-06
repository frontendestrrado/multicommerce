import React from "react";

const Rating = ({ rating }) => (
  <span className="ps-rating">
    {rating !== undefined ? (
      <div>
        <i className={rating >= 1 ? "fa fa-star" : "fa fa-star-o"}></i>
        <i className={rating >= 2 ? "fa fa-star" : "fa fa-star-o"}></i>
        <i className={rating >= 3 ? "fa fa-star" : "fa fa-star-o"}></i>
        <i className={rating >= 4 ? "fa fa-star" : "fa fa-star-o"}></i>
        <i className={rating >= 5 ? "fa fa-star" : "fa fa-star-o"}></i>
      </div>
    ) : (
      <div>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star"></i>
        <i className="fa fa-star-o"></i>
      </div>
    )}
  </span>
);

export default Rating;
