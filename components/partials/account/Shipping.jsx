import React, { useState, useEffect } from "react";
import Link from "next/link";
import ModulePaymentOrderSummary from "~/components/partials/account/modules/ModulePaymentOrderSummary";
import { notification } from "antd";
import Router from "next/router";
const Shipping = () => {
  const [loading, setloading] = useState(true);
  const [shippingdata, setShippingdata] = useState("");
  useEffect(() => {
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      setloading(true);
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      Router.push("/");
    } else {
      setloading(false);
      let shipping_info = localStorage.getItem("shipping_info");
      setShippingdata(JSON.parse(shipping_info));
      let shipping_info_parse = JSON.parse(shipping_info);
    }
  }, []);

  if (loading) {
    return <div> loading...</div>;
  }
  return (
    <div className="ps-checkout ps-section--shopping">
      <div className="container">
        {/* <div className="ps-section__header">
          <h1>Shipping Information</h1>
        </div> */}
        <div className="ps-section__content">
          <div className="row">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="ps-block--shipping">
                <div className="ps-block__panel">
                  <figure>
                    <small>Contact</small>
                    <p>{shippingdata.email}</p>
                    <Link href="/account/checkout">
                      <a>Change</a>
                    </Link>
                  </figure>
                  <figure>
                    <small>Ship to</small>
                    <p>
                      {shippingdata.address +
                        "," +
                        shippingdata.apartment +
                        ", " +
                        shippingdata.city}
                    </p>
                    <Link href="/account/checkout">
                      <a>Change</a>
                    </Link>
                  </figure>
                </div>
                <h4>Shipping Method</h4>
                <div className="ps-block__panel">
                  <figure>
                    <small>International Shipping</small>
                    <strong>RM 0.00</strong>
                  </figure>
                </div>
                <div className="ps-block__footer">
                  <Link href="/account/checkout">
                    <a>
                      <i className="icon-arrow-left mr-2"></i>
                      Return to information
                    </a>
                  </Link>
                  <Link href="/account/payment">
                    <a className="ps-btn">Continue to payment</a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
              <div className="ps-form__orders">
                <ModulePaymentOrderSummary shipping={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
