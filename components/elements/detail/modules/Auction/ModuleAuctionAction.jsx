import React, { useState, useEffect } from "react";
import { getCart } from "~/store/cart/action";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import { Form, Input, message, notification } from "antd";
import { v4 as uuidv4 } from "uuid";
import { priceHelper } from "~/utilities/product-helper";
import { basePathUrl } from "~/repositories/Repository";
import { getDeviceId, makePageUrl, osType } from "~/utilities/common-helpers";
import { setProductBidAmount } from "~/store/product/action";
const ModuleAuctionActions = ({ product, extended = false }) => {
  const Router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [bidAmount, setBidAmount] = useState(0);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const handleBid = async () => {
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      return false;
    } else {
      if (isNaN(bidAmount)) {
        notification["error"]({
          message: "Error",
          description: "Please enter valid bid",
          duration: 2,
        });
        return null;
      } else if (bidAmount < product.min_bid_price) {
        notification["error"]({
          message: "Error",
          description: "Amount should be greater than bidding price",
          duration: 2,
        });
        return null;
      } else if (bidAmount < product.latest_bid_amt) {
        notification["error"]({
          message: "Error",
          description: "Amount should be greater than current bid price",
          duration: 2,
        });
        return null;
      }

      if (!isNaN(bidAmount) && bidAmount > product.min_bid_price) {
        const payload = {
          access_token: auth.access_token,
          auction_id: product.auction_id,
          bid_amount: bidAmount,
          device_id: getDeviceId,
          page_url: makePageUrl(Router.asPath),
          os_type: osType(),
        };
        const response = await ProductRepository.createBid(payload);
        if (response.status == "success" && response.httpcode == 200) {
          message.success(
            "Your bid registered successfully! Please complete payment."
          );
          Router.push(`/auction/auction_checkout/${product.auction_id}`);
        } else if (response.status == "error" && response.httpcode == 400) {
          notification["error"]({
            message: "Error",
            description: response?.response,
            duration: 2,
          });
        } else {
          notification["error"]({
            message: "Error",
            description: response?.message,
            duration: 2,
          });
        }
      }
    }
  };

  const handleChange = (e) => {
    setBidAmount(Number(e.target.value));
    dispatch(setProductBidAmount(Number(e.target.value)));
  };

  return (
    <div style={{ maxWidth: "65%" }}>
      <Form form={form} onSubmit={handleBid}>
        <div>
          <Form.Item
            name="bidvalue"
            rules={[
              {
                required: true,
                message: "Please input valid bid!",
              },
              () => ({
                validator(rule, value) {
                  if (
                    !value ||
                    Number(priceHelper(product.min_bid_price)) <
                      Number(priceHelper(value))
                  ) {
                    if (
                      Number(priceHelper(product.latest_bid_amt)) <
                      Number(priceHelper(value))
                    ) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        `Amount should be greater than current bid price`
                      );
                    }
                  }
                  if (isNaN(value)) {
                    return Promise.reject("Please enter bid in numbers!");
                  }
                  return Promise.reject(`Amount not sufficient for bidding!`);
                },
              }),
            ]}
          >
            <Input
              className="form-control"
              type="text"
              placeholder="Enter your bid"
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
        </div>
        <div className="ps-product__shopping extend">
          <a
            className="ps-btn ps-btn--black"
            // href="#"
            onClick={(e) => handleBid(e)}
          >
            Bid
          </a>
        </div>
      </Form>
    </div>
  );
};

export default ModuleAuctionActions;
