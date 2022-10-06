import React, { useState } from "react";
import { Rate, notification, Pagination, Progress, Input, Form } from "antd";
import Rating from "~/components/elements/Rating";
import { submitSellerReview } from "~/utilities/home-helper";
import { useDispatch, useSelector } from "react-redux";
import { updateSellerReviewData } from "~/store/product/action";

function PartialSellerReview({ shop_detail, seller_review }) {
  const [form] = Form.useForm();
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateStar, setRateStar] = useState(0);
  const dispatch = useDispatch();

  const { user_details } = useSelector((state) => state.auth);

  const submitForm = async () => {
    if (review !== "" && title !== "") {
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
        let parsedata = JSON.parse(userdata);
        let token = parsedata.access_token;

        if (rateStar == 0) {
          notification["error"]({
            message: "Error",
            description: "Select Atleast One Star For review!",
            duration: 5,
          });
          return false;
        }

        let payload = {
          comment: review,
          seller_id: shop_detail.seller_id,
          user_id: user_details.user_id,
          rating: rateStar,
          title,
          image: "",
          access_token: token,
        };

        setLoading(true);
        let responseData = await submitSellerReview(payload);
        if (responseData && responseData.httpcode == 200) {
          setLoading(false);
          form.resetFields();

          notification["success"]({
            message: "Success",
            description: "Review submitted!",
            duration: 3,
          });
          dispatch(updateSellerReviewData());
        } else {
          setLoading(false);
          form.resetFields();
          if (responseData.status == "Not available") {
            notification["error"]({
              message: "Error",
              description: responseData.message,
              duration: 4,
            });
          } else {
            notification["error"]({
              message: "Error",
              description: responseData.message,
              duration: 4,
            });
          }
          return false;
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

  const [paginationValue, setPaginationValue] = useState({
    minValue: 0,
    maxValue: 10,
  });

  const handlePagination = (page, pageSize) => {
    setPaginationValue({
      minValue: (page - 1) * pageSize,
      maxValue: page * pageSize,
    });
  };

  function handlePercent(percent) {
    if (percent == 100) {
      return `${percent}%`;
    } else {
      return `${percent}%`;
    }
  }

  function numberOfRating(ratingNumber) {
    return Math.ceil(
      (seller_review?.filter((review) => review.rating == ratingNumber)
        ?.length /
        seller_review?.length) *
        100
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
          <div className="ps-block--average-rating">
            <div className="ps-block__header">
              <h3>
                {shop_detail.store_rating
                  ? shop_detail.store_rating + ".00"
                  : 0}
              </h3>
              <Rating rating={shop_detail.store_rating} />

              <span>{seller_review.length} Review</span>
              {/* Rating breakdown */}

              <div className="progress-span mt-5">
                <table className="progress-review--table table table-borderless">
                  <tbody>
                    <tr>
                      <th>5 Star</th>
                      <td>
                        <Progress
                          percent={numberOfRating(5)}
                          size="small"
                          format={handlePercent}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>4 Star</th>
                      <td>
                        <Progress
                          percent={numberOfRating(4)}
                          size="small"
                          format={handlePercent}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>3 Star</th>
                      <td>
                        <Progress
                          percent={numberOfRating(3)}
                          size="small"
                          format={handlePercent}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>2 Star</td>
                      <td>
                        <Progress
                          percent={numberOfRating(2)}
                          size="small"
                          format={handlePercent}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>1 Star</td>
                      <td>
                        <Progress
                          percent={numberOfRating(1)}
                          size="small"
                          format={handlePercent}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Rating breakdown */}
            </div>
          </div>
        </div>
        <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
          <h4>Submit Your Review</h4>
          <p>Your email address will not be published.</p>
          <div className="form-group form-group__rating">
            <label className="mr-4">Your rating of this Seller:</label>
            <Rate defaultValue={rateStar} onChange={(e) => setRateStar(e)} />
          </div>
          <Form
            form={form}
            className="ps-form--account-setting"
            onFinish={submitForm}
            layout="vertical"
            size="large"
          >
            <div className="">
              <div className="form-group">
                <Form.Item
                  name="title"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Title!",
                    },
                    {
                      max: 50,
                      message: "Title must be maximum 50 charachter.",
                    },
                    () => ({
                      validator(rule, value) {
                        if (value && value.trim().length < 2) {
                          return Promise.reject(
                            "Title must be minimum 2 charachter."
                          );
                        } else {
                          return Promise.resolve();
                        }
                      },
                    }),
                  ]}
                  label="Title"
                >
                  <Input
                    className=""
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={(event) => {
                      setTitle(event.target.value);
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="form-group">
              <Form.Item
                name="review"
                rules={[
                  {
                    required: true,
                    message: "Please enter Review!",
                  },
                  {
                    max: 250,
                    message: "Review must be maximum 250 charachter.",
                  },
                  () => ({
                    validator(rule, value) {
                      if (value && value.trim().length < 5) {
                        return Promise.reject(
                          "Review must be minimum 5 charachter."
                        );
                      } else {
                        return Promise.resolve();
                      }
                    },
                  }),
                ]}
                label="Review"
              >
                <Input.TextArea
                  className=""
                  rows="6"
                  value={review}
                  placeholder="Write your review here"
                  onChange={(event) => {
                    setReview(event.target.value);
                  }}
                />
              </Form.Item>
            </div>
            {/* <div className="row">
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
        </div> */}
            <div className="form-group submit">
              <button className="ps-btn" type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit Review "}
              </button>
            </div>
          </Form>
        </div>
      </div>
      <hr />
      <div className="">
        <strong>Reviews</strong>
        <div className="">
          {seller_review.length > 0
            ? seller_review
                .slice(paginationValue.minValue, paginationValue.maxValue)
                .map((comment, index) => {
                  return (
                    <div
                      className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews"
                      key={index}
                    >
                      <a className="float-right">
                        <Rating rating={comment.rating} />
                      </a>
                      <p
                        className="mb-1 text-danger"
                        style={{ fontWeight: "500", fontSize: "large" }}
                      >
                        {comment.customer_name}
                      </p>
                      <div className="reviews-members pt-4 pb-4">
                        <div className="media">
                          <div className="media-body">
                            <div className="reviews-members-header">
                              <h4 className="mb-1">
                                <a className="text-black" href="#">
                                  {comment.title}
                                </a>
                              </h4>
                              {/* <p class="text-gray">Tue, 20 Mar 2020</p> */}
                            </div>
                            <div className="reviews-members-body">
                              <p>{comment.comment}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
            : "No Reviews..."}
          <div className="d-flex justify-content-center">
            <Pagination
              defaultCurrent={1}
              total={seller_review?.length}
              onChange={handlePagination}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PartialSellerReview;
