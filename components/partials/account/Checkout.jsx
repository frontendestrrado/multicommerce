import React, { useState, useEffect } from "react";
import { Empty, notification } from "antd";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerProfile, getCustomerAddress } from "~/store/account/action";
import DisplayAddress from "./modules/Checkout/DisplayAddress";
import DisplayOrders from "./modules/Checkout/DisplayOrders";
import DisplayVoucher from "./modules/Checkout/DisplayVoucher";
import DisplayCartFooter from "./modules/Checkout/DisplayCartFooter";
import DisplayAddAddress from "./modules/Checkout/DisplayAddAddress";

const Checkout = () => {
  const dispatch = useDispatch();

  const { customer_address } = useSelector((state) => state.account);
  const { access_token } = useSelector((state) => state.auth);

  const { cart } = useSelector((state) => state.cart);

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
      {cart != null &&
      cart !== undefined &&
      cart.errors !== "Cart is empty" &&
      cart?.product?.length &&
      cart?.product?.length !== 0 ? (
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
              <DisplayOrders cartdata={cart} />
            </div>
            <div className="voucher-and-payment">
              <DisplayVoucher />
            </div>
            <div className="cart-footer">
              <DisplayCartFooter cartdata={cart} />
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <Empty description={<span>Cart is empty!</span>} />
        </div>
      )}
    </div>
  );
};

export default Checkout;
