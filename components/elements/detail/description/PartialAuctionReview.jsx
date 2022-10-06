import React, { useState } from "react";
import { Rate, notification } from "antd";
import Rating from "~/components/elements/Rating";
import { submitReview } from "~/utilities/home-helper";

function PartialAuctionReview({ product }) {
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const submitForm = async () => {
    if (review !== "" && name !== "" && email !== "") {
      let total_rate = document.querySelectorAll(".ant-rate-star-full").length;

      let userdata = localStorage.getItem("user");
      if (userdata === undefined || userdata === null) {
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        return false;
      } else {
        setLoading(true);
        let parsedata = JSON.parse(userdata);
        let token = parsedata.access_token;

        let payload = {
          comment: review,
          product_id: product.product_id,
          user_id: 4,
          rating: total_rate,
          image: "",
          access_token: token,
        };
        setLoading(true);
        let responseData = await submitReview(payload);
        if (responseData && responseData.httpcode === 200) {
          setReview("");
          setName("");
          setEmail("");
          setLoading(false);

          notification["success"]({
            message: "Success",
            description: "Review submitted!",
            duration: 1,
          });
        } else {
          setLoading(false);
          setReview("");
          setName("");
          setEmail("");
          if (responseData.status == "Not available") {
            notification["error"]({
              message: "Error",
              description: responseData.message,
              duration: 1,
            });
          } else {
            notification["error"]({
              message: "Error",
              description: responseData.message,
              duration: 1,
            });
          }
        }
      }
    } else {
      notification["error"]({
        message: "Error",
        description: "Please fill all fields",
        duration: 1,
      });
    }
  };
  return (
    <div className="row">
      <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
        <div className="ps-block--average-rating">
          <div className="ps-block__header">
            <h3>{product.rating ? product.rating + ".00" : 0}</h3>
            <Rating rating={product.rating} />
            {/* 
            <span>
              {product.total_review ? product.total_review : 0} Review
            </span> */}
          </div>
          {product.review?.length > 0
            ? product.review.map((item, index) => (
                <div className="ps-block__star" key={index}>
                  <span>{item.rating} Star</span>
                  <span>{item.comment}</span>
                </div>
              ))
            : "No Reviews..."}
        </div>
      </div>
      <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
        <h4>Submit Your Review</h4>
        <p>
          Your email address will not be published. Required fields are marked
          <sup>*</sup>
        </p>
        <div className="form-group form-group__rating">
          <label>Your rating of this product</label>
          <Rate defaultValue={1} />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            rows="6"
            value={review}
            placeholder="Write your review here"
            onChange={(event) => {
              setReview(event.target.value);
            }}
          >
            {" "}
            {review}
          </textarea>
        </div>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                value={name}
                placeholder="Your Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12  ">
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                value={email}
                placeholder="Your Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="form-group submit">
          <button
            className="ps-btn"
            onClick={() => submitForm()}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PartialAuctionReview;
