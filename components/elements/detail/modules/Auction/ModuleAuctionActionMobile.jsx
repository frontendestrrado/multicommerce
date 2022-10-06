import { message, notification } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductRepository from "~/repositories/ProductRepository";
import { getDeviceId, makePageUrl, osType } from "~/utilities/common-helpers";

const ModuleAuctionActionMobile = ({ product }) => {
  const auth = useSelector((state) => state.auth);
  const { productBidAmount } = useSelector((state) => state.product);
  const [bidAmount, setBidAmount] = useState(0);
  const Router = useRouter();

  useEffect(() => {
    setBidAmount(productBidAmount);
  }, [productBidAmount]);

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
          description: "Please enter valid Bid",
          duration: 2,
        });
        return false;
      } else if (bidAmount < product.min_bid_price) {
        notification["error"]({
          message: "Error",
          description: "Amount should be greater than bidding price",
          duration: 2,
        });
        return false;
      } else if (bidAmount < product.latest_bid_amt) {
        notification["error"]({
          message: "Error",
          description: "Amount should be greater than current bid price",
          duration: 2,
        });
        return false;
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

  return (
    <div className="ps-product__actions-mobile">
      <a className="ps-btn ps-btn--black" onClick={(e) => handleBid(e)}>
        Bid
      </a>
    </div>
  );
};

export default ModuleAuctionActionMobile;
