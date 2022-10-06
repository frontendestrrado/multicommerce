import React, { useEffect } from "react";
import { notification, Spin, Empty } from "antd";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerProfile, getCustomerAddress } from "~/store/account/action";
import DisplayAddAddress from "~/components/partials/account/modules/Checkout/DisplayAddAddress";
import DisplayAddress from "~/components/partials/account/modules/Checkout/DisplayAddress";
import DisplayAuction from "./modules/DisplayAuction";
import DisplayAuctionCheckoutFooter from "./modules/DisplayAuctionCheckoutFooter";

const AuctionCheckout = () => {
  const dispatch = useDispatch();

  const { customer_address, auction_cart } = useSelector(
    (state) => state.account
  );
  const { access_token } = useSelector((state) => state.auth);

  useEffect(() => {
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      Router.push("/");
    } else {
      dispatch(getCustomerProfile());
      dispatch(getCustomerAddress());
    }
  }, [access_token]);

  return (
    <div className="ps-checkout ps-section--shopping ps-shopping-cart">
      <div className="container">
        <div
          className="ps-section__content"
          style={{ borderTop: "5px solid #dc3545" }}
        >
          <div className="prdt-box pt-4 pl-4 pb-2">
            {customer_address?.length > 0 ? (
              <DisplayAddress address={customer_address} />
            ) : (
              <DisplayAddAddress />
            )}
          </div>
          <div className="ordered-product">
            {Object.keys(auction_cart).length > 0 ? (
              <DisplayAuction auctiondata={auction_cart} />
            ) : (
              <Empty description={<span>Auction is empty!</span>} />
            )}
          </div>
          <div className="cart-footer">
            {Object.keys(auction_cart).length > 0 ? (
              <DisplayAuctionCheckoutFooter auctiondata={auction_cart} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCheckout;
