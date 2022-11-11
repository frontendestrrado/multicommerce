import React, { useState, useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import ProductRepository from "~/repositories/ProductRepository";
import Router from "next/router";
import { notification } from "antd";

const ModulePaymentOrderSummary = ({ shipping, amount, cartItems }) => {
  const [cartdata, setCartdata] = useState(null);

  async function getCartdata() {
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      // notification["error"]({
      //   message: "Error",
      //   description: "Please login first",
      //   duration: 1,
      // });
      Router.push("/");
      return false;
    } else {
      let parsedata = JSON.parse(userdata);
      let token = parsedata.access_token;
      let payload = {
        access_token: token,
      };
      const responseData = await ProductRepository.getCart(payload);
      if (responseData.status === "success") {
        setCartdata(responseData.data);
      }
      //this.props.dispatch(getCart());
    }
  }

  useEffect(() => {
    getCartdata();
  }, []);
  let listItemsView, shippingView, totalView;
  if (cartdata != null && cartdata.products.length > 0) {
    listItemsView = cartdata.products.map((product) => (
      <Link href="/" key={product.product_id}>
        <a>
          <strong>
            {product.product_name}
            <span>x{product.quantity}</span>
          </strong>
          <small>
          SAR{" "}
            {product.total_discount_price === 0
              ? product.total_actual_price
              : product.total_discount_price}
          </small>
        </a>
      </Link>
    ));
  } else {
    listItemsView = <p>No Product.</p>;
  }
  if (shipping === true) {
    shippingView = (
      <figure>
        <figcaption>
          <strong>Shipping Fee</strong>
          <small>SAR 20.00</small>
        </figcaption>
      </figure>
    );
    totalView = (
      <figure className="ps-block__total">
        <h3>
          Total
          <strong>SAR {cartdata != null && cartdata.grand_total}</strong>
        </h3>
      </figure>
    );
  } else {
    totalView = (
      <figure className="ps-block__total">
        <h3>
          Total
          <strong>SAR {cartdata != null && cartdata.grand_total}</strong>
        </h3>
      </figure>
    );
  }
  return (
    <div className="ps-block--checkout-order">
      <div className="ps-block__content">
        <figure>
          <figcaption>
            <strong>Product</strong>
            <strong>total</strong>
          </figcaption>
        </figure>
        <figure className="ps-block__items">{listItemsView}</figure>
        <figure>
          <figcaption>
            <strong>Subtotal</strong>
            <small>SAR {cartdata != null && cartdata.total_cost}</small>
          </figcaption>
        </figure>
        {/* {shippingView} */}
        {totalView}
      </div>
    </div>
  );
};
export default connect((state) => state.cart)(ModulePaymentOrderSummary);
