import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";
import { Form, Input, notification } from "antd";

class FormCheckoutInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fname: "",
      lname: "",
      address: "",
      postal: "",
      city: "",
      apartment: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      // Computed property names
      // keys of the objects are computed dynamically
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    let shipping_info = localStorage.getItem("shipping_info");
    if (shipping_info != null || shipping_info != undefined) {
      let shipping_info_parse = JSON.parse(shipping_info);
      this.setState({ email: shipping_info_parse.email });
    }
  }

  handleSubmit(event) {
    //  Router.push('/account/shipping');
    // this.props.history.push("/about");
    Router.push({
      pathname: "/account/shipping",
      state: "test",
    });
  }

  handleClick(e) {
    const { email, fname, lname, address, postal, city, apartment } =
      this.state;
    if (
      email === "" ||
      fname === "" ||
      lname === "" ||
      address === "" ||
      postal === "" ||
      city === "" ||
      apartment === ""
    ) {
      notification["error"]({
        message: "Error",
        description: "Please fill all fields",
        duration: 1,
      });
    } else {
      localStorage.setItem("shipping_info", JSON.stringify(this.state));
      Router.push("/account/shipping");
    }
  }

  render() {
    return (
      <Form className="ps-form__billing-info" onSubmit={this.handleSubmit}>
        <h3 className="ps-form__heading">Contact information</h3>
        <div className="form-group">
          <Form.Item
            name="name"
            rules={[
              {
                required: false,
                message: "Enter an email or mobile phone number!",
              },
            ]}
          >
            <Input
              className="form-control"
              type="text"
              placeholder="Email or phone number"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Item>
        </div>
        {/* <div className="form-group">
          <div className="ps-checkbox">
            <input className="form-control" type="checkbox" id="keep-update" />
            <label htmlFor="keep-update">
              Keep me up to date on news and exclusive offers?
            </label>
          </div>
        </div> */}
        <h3 className="ps-form__heading">Shipping address</h3>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: false,
                    message: "Enter your first name!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="text"
                  placeholder="First Name"
                  name="fname"
                  value={this.state.fname}
                  onChange={this.handleChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <Form.Item
                name="lastName"
                rules={[
                  {
                    required: false,
                    message: "Enter your last name!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Last Name"
                  name="lname"
                  value={this.state.lname}
                  onChange={this.handleChange}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="form-group">
          <Form.Item
            name="address"
            rules={[
              {
                required: false,
                message: "Enter an address!",
              },
            ]}
          >
            <Input
              className="form-control"
              type="text"
              placeholder="Address"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </Form.Item>
        </div>
        <div className="form-group">
          <Form.Item
            name="apartment"
            rules={[
              {
                required: false,
                message: "Enter an Apartment!",
              },
            ]}
          >
            <Input
              className="form-control"
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              name="apartment"
              value={this.state.apartment}
              onChange={this.handleChange}
            />
          </Form.Item>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="form-group">
              <Form.Item
                name="city"
                rules={[
                  {
                    required: false,
                    message: "Enter a city!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="city"
                  placeholder="City"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                />
              </Form.Item>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="form-group">
              <Form.Item
                name="postalCode"
                rules={[
                  {
                    required: false,
                    message: "Enter a postal oce!",
                  },
                ]}
              >
                <Input
                  className="form-control"
                  type="postalCode"
                  placeholder="Postal Code"
                  name="postal"
                  value={this.state.postal}
                  onChange={this.handleChange}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        {/* <div className="form-group">
          <div className="ps-checkbox">
            <input
              className="form-control"
              type="checkbox"
              id="save-information"
            />
            <label htmlFor="save-information">
              Save this information for next time
            </label>
          </div>
        </div> */}
        <div className="ps-form__submit">
          <Link href="/account/shopping-cart">
            <a>
              <i className="icon-arrow-left mr-2"></i>
              Return to shopping cart
            </a>
          </Link>
          <div className="ps-block__footer">
            <button className="ps-btn" onClick={(e) => this.handleClick(e)}>
              Continue to shipping
            </button>
          </div>
        </div>
      </Form>
    );
  }
}

export default FormCheckoutInformation;
