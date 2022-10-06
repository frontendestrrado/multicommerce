import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Radio, Select } from "antd";
import ModulePaymentOrderSummary from "~/components/partials/account/modules/ModulePaymentOrderSummary";
import { notification } from "antd";
import Router from "next/router";
const { Option } = Select;
import ProductRepository from "~/repositories/ProductRepository";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: 1,
      loading: true,
      loading1: false,
      shippingdata: "",
    };
  }

  handleChangePaymentMethod = (e) => {
    this.setState({ method: e.target.value });
  };

  placeOrder = async (e) => {
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
      this.setState({ loading1: true });
      let payload = {
        e_money_amt: 0,
        payment_type: 1,
        shipping_chrg: 0,
        address_id: 4,
        access_token: token,
        name:
          this.state.shippingdata.fname + " " + this.state.shippingdata.lname,
        phone: "9078908978",
        email: this.state.shippingdata.email,
        address_line1: this.state.shippingdata.address,
        address_line2: this.state.shippingdata.apartment,
        zip_code: this.state.shippingdata.postal,
        city: 26917,
        state: 2307,
        country: 132,
        latitude: "86785678",
        longitude: "8686586",
      };
      const responseData = await ProductRepository.placeOrder(payload);
      if (responseData && responseData.httpcode === 200) {
        this.setState({ loading1: false });
        localStorage.setItem("order", responseData.data.order_id);
        e.preventDefault();
        notification["success"]({
          message: "Success",
          description: "Congrats, order successfully placed",
          duration: 1,
        });
        Router.push("/account/thankyou");
      } else {
        this.setState({ loading1: false });

        notification["error"]({
          message: "Error",
          description: "something went wrong. please try again",
          duration: 1,
        });
      }
    }
  };
  componentDidMount() {
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      this.setState({ loading: true });
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      Router.push("/");
    } else {
      this.setState({ loading: false });
      let shipping_info = localStorage.getItem("shipping_info");
      this.setState({ shippingdata: JSON.parse(shipping_info) });
      let shipping_info_parse = JSON.parse(shipping_info);
    }
  }
  render() {
    let month = [],
      year = [];
    for (let i = 1; i <= 12; i++) {
      month.push(i);
    }
    for (let i = 2019; i <= 2050; i++) {
      year.push(i);
    }
    if (this.state.loading) {
      return <div> loading...</div>;
    }
    return (
      <div className="ps-checkout ps-section--shopping">
        <div className="container">
          {/* <div className="ps-section__header">
            <h1>Payment</h1>
          </div> */}
          <div className="ps-section__content">
            <div className="row">
              <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                <div className="ps-block--shipping">
                  <div className="ps-block__panel">
                    <figure>
                      <small>Contact</small>
                      <p>{this.state.shippingdata.email}</p>
                      <Link href="/account/checkout">
                        <a>Change</a>
                      </Link>
                    </figure>
                    <figure>
                      <small>Ship to</small>
                      <p>
                        {this.state.shippingdata.address +
                          "," +
                          this.state.shippingdata.apartment +
                          ", " +
                          this.state.shippingdata.city}
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
                  <h4>Payment Methods</h4>
                  <div className="ps-block--payment-method">
                    <div className="ps-block__header">
                      <Radio.Group
                        onChange={(e) => this.handleChangePaymentMethod(e)}
                        value={this.state.method}
                      >
                        <Radio value={1}>COD</Radio>
                        {/* <Radio value={1}>Visa / Master Card</Radio>
                        <Radio value={2}>Paypal</Radio> */}
                      </Radio.Group>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      className="ps-btn ps-btn--fullwidth"
                      disabled={this.state.loading1}
                      onClick={(e) => this.placeOrder(e)}
                    >
                      {this.state.loading1
                        ? "Placing order ...Please wait"
                        : "Place Order"}
                    </button>
                  </div>
                  <div className="ps-block__footer">
                    <Link href="/account/shipping">
                      <a>
                        <i className="icon-arrow-left mr-2"></i>
                        Return to shipping
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                <div className="ps-form__orders">
                  <ModulePaymentOrderSummary />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Payment);
