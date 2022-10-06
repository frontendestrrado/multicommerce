import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { Form, Input, notification, Empty } from "antd";
import { useDispatch } from "react-redux";
import { updateCustomerShippingInfo } from "~/store/account/action";
import { useSelector } from "react-redux";

const FormCheckoutInformation = ({ profile }) => {
  const dispatch = useDispatch();
  const { shipping_info } = useSelector((state) => state.account);
  const router = useRouter();

  const [checkoutInfo, setCheckoutInfo] = useState({
    email: shipping_info?.email || profile.email,
    fname: shipping_info?.fname || profile.first_name,
    lname: shipping_info?.lname || profile.last_name,
    address: shipping_info?.address || profile.address1,
    postal: shipping_info?.postal || "",
    city: shipping_info?.city || "",
    apartment: shipping_info?.apartment || "",
  });

  useEffect(() => {
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      Router.push("/");
    }
  }, []);

  const handleChange = (name) => (event) => {
    setCheckoutInfo({ ...checkoutInfo, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    Router.push({
      pathname: "/account/shipping",
      state: "test",
    });
  };

  const handleClick = (e) => {
    const { email, fname, lname, address, postal, city, apartment } =
      checkoutInfo;
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
      localStorage.setItem("shipping_info", JSON.stringify(checkoutInfo));
      dispatch(updateCustomerShippingInfo(checkoutInfo));
      router.push("/account/shipping");
    }
  };

  return (
    <div>
      {checkoutInfo.email !== undefined ? (
        <Form className="ps-form__billing-info" onSubmit={handleSubmit}>
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
              initialValue={checkoutInfo.email}
            >
              <Input
                className="form-control"
                type="text"
                placeholder="Email or phone number"
                name="email"
                onChange={handleChange("email")}
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
                  initialValue={checkoutInfo.fname}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                    name="fname"
                    onChange={handleChange("fname")}
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
                  initialValue={checkoutInfo.lname}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    name="lname"
                    onChange={handleChange("lname")}
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
              initialValue={checkoutInfo.address}
            >
              <Input
                className="form-control"
                type="text"
                placeholder="Address"
                name="address"
                onChange={handleChange("address")}
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
              initialValue={checkoutInfo.apartment}
            >
              <Input
                className="form-control"
                type="text"
                placeholder="Apartment, suite, etc. (optional)"
                name="apartment"
                onChange={handleChange("apartment")}
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
                  initialValue={checkoutInfo.city}
                >
                  <Input
                    className="form-control"
                    type="city"
                    placeholder="City"
                    name="city"
                    onChange={handleChange("city")}
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
                  initialValue={checkoutInfo.postal}
                >
                  <Input
                    className="form-control"
                    type="postalCode"
                    placeholder="Postal Code"
                    name="postal"
                    onChange={handleChange("postal")}
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
              <button className="ps-btn" onClick={(e) => handleClick(e)}>
                Continue to shipping
              </button>
            </div>
          </div>
        </Form>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default FormCheckoutInformation;
