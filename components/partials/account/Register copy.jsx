import React, {
  Component,
  useState,
  useDispatch,
  useReducer,
  useEffect,
} from "react";
import Link from "next/link";
import Router from "next/router";
import { login } from "../../../store/auth/action";
import { Button, Form, Input, message, notification, Select, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import AccountRepository from "~/repositories/AccountRepository";
import { displayNotification } from "~/utilities/common-helpers";

const { Option } = Select;
const { Search } = Input;

const Register = () => {
  const [lodingCheck, setlodingCheck] = useState({
    lodingCountries: false,
    lodingCities: false,
  });

  const [serverCountry, setCountry] = useState([]);
  const initStateOtpButton = {
    class: "primary",
    text: "Send OTP",
    verifyBox: false,
    verifiedNumber: "",
    registerBoxShow: false,
  };

  const [otpButton, setOtpButton] = useState(initStateOtpButton);

  const [loadingOTP, setLoadingOTP] = useState(false);

  async function fetchCountry() {
    const countryDataFromServer = await AccountRepository.getCountry();
    setCountry([...countryDataFromServer.country]);
    return null;
  }

  useEffect(() => {
    fetchCountry();
  }, []);
  const [form] = Form.useForm();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    password_confirmation: "",
    address: "",
    country_code: "",
    otp_text: "",
  });

  const {
    first_name,
    last_name,
    email,
    phone_number,
    password,
    password_confirmation,
    country_code,
  } = user;

  const handleSubmit = async () => {
    let payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      country_code: user.country_code,
      phone_number: user.phone_number,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
    };

    try {
      const values = await AccountRepository.registerNewUser(user);

      if (values.httpcode == 200 && values.success) {
        message.success("You are registered successfully!");
        Router.push("/account/login");
      }
      if (values.error) {
        values.error.map((error) => {
          notification["error"]({
            message: error,
          });
        });
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const handleChange = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
    if (name == "phone_number" && event.target.value !== user.phone_number) {
      setOtpButton(initStateOtpButton);
    }
  };

  const handleSelectCountryCode = (name) => (data) => {
    setUser({ ...user, [name]: data });
    if (name == "country_code" && data !== user.country_code) {
      setOtpButton(initStateOtpButton);
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const loginMethodFacebook = () => {};
  const loginMethodGoogle = () => {};
  const loginMethodTwitter = () => {};
  const loginMethodInstagram = () => {};

  // handle OTP

  const handleOTP = async () => {
    setLoadingOTP(true);
    let payload = {
      country_code: user.country_code,
      phone_number: user.phone_number,
    };
    const response = await AccountRepository.sendRegisterMobileOTP(payload);

    if (response.httpcode == 200) {
      displayNotification(response.status, response.status, response.message);
      setOtpButton({
        class: "success",
        text: "OTP Sent",
        verifyBox: true,
      });

      setTimeout(() => {
        setLoadingOTP(false);
      }, 500);
    } else {
      displayNotification(response.status, response.status, response.message);
      setTimeout(() => {
        setLoadingOTP(false);
      }, 500);
    }
  };

  const handleVerifyOTP = async () => {
    setLoadingOTP(true);
    let payload = {
      country_code: user.country_code,
      phone_number: user.phone_number,
      otp: user.otp_text,
    };

    const response = await AccountRepository.verifyRegisterMobileOTP(payload);

    if (response.httpcode == 200) {
      displayNotification(response.status, response.status, response.message);
      setOtpButton({
        class: "success",
        text: "Verified",
        verifyBox: false,
        verifiedNumber: user.phone_number,
        registerBoxShow: true,
      });

      setTimeout(() => {
        setLoadingOTP(false);
      }, 500);
    } else {
      displayNotification(response.status, response.status, response.message);
      setTimeout(() => {
        setLoadingOTP(false);
      }, 500);
    }
  };

  return (
    <div className="ps-my-account">
      <div className="container">
        <Form
          form={form}
          className="ps-form--account"
          onFinish={otpButton.registerBoxShow ? handleSubmit : undefined}
          style={{ paddingTop: "20px" }}
          size="large"
          layout="vertical"
        >
          <ul className="ps-tab-list">
            <li>
              <Link href="/account/login">
                <a>Login</a>
              </Link>
            </li>
            <li className="active">
              <Link href="/account/register">
                <a>Register</a>
              </Link>
            </li>
          </ul>
          <div className="ps-tab active" id="register">
            <div className="ps-form__content">
              <h5 style={{ fontWeight: "500" }}>Register An Account</h5>
              <Form.Item
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your firstname!",
                  },
                  {
                    pattern: new RegExp(/^[a-zA-Z]+$/i),
                    message: "Only Alphabets Accepted",
                  },
                  {
                    max: 50,
                    message: "Max 50 Charachters allowed.",
                  },
                ]}
              >
                <Input
                  value={first_name}
                  type="text"
                  placeholder="Enter Firstname"
                  onChange={handleChange("first_name")}
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname!",
                  },
                  {
                    pattern: new RegExp(/^[a-zA-Z]+$/i),
                    message: "Only Alphabets Accepted",
                  },
                  {
                    max: 50,
                    message: "Max 50 Charachters allowed.",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter Lastname"
                  onChange={handleChange("last_name")}
                  value={last_name}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange("email")}
                  value={email}
                />
              </Form.Item>

              <Form.Item
                name="phone_number"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input.Group compact>
                  <Form.Item
                    name={["phone_number", "countrycode"]}
                    noStyle
                    rules={[
                      { required: true, message: "countrycode is required" },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: "25%" }}
                      placeholder="Country Code"
                      optionFilterProp="children"
                      onChange={handleSelectCountryCode("country_code")}
                      filterOption={(input, option) =>
                        option.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toString().toLowerCase()) >= 0
                      }
                    >
                      {serverCountry?.map((countryDetails, index) => (
                        <Option
                          value={`+${countryDetails.phonecode}`}
                          key={index}
                        >
                          +{countryDetails.phonecode}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["phone_number", "phonenumber"]}
                    noStyle
                    rules={[
                      { required: true, message: "phone number is required" },
                      {
                        min: 7,
                        message: "Phone number should be 7-12 digit long!",
                      },
                      {
                        max: 12,
                        message: "Phone number should be 7-12 digit long!",
                      },
                      {
                        pattern: new RegExp(/^[0-9]+$/i),
                        message: "Only Numbers Accepted",
                      },
                    ]}
                  >
                    <Input
                      type="text"
                      placeholder="Enter Phone Number"
                      onChange={handleChange("phone_number")}
                      value={phone_number}
                      style={{ width: "75%" }}
                      suffix={
                        <Spin indicator={antIcon} spinning={loadingOTP}>
                          <span
                            style={{ cursor: "pointer" }}
                            className={`text-${otpButton.class}`}
                            onClick={handleOTP}
                          >
                            {otpButton.text}
                          </span>
                        </Spin>
                      }
                    />
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              {otpButton.verifyBox && (
                <Form.Item
                  name={"verify_otp"}
                  rules={[{ required: true, message: "OTP is required" }]}
                >
                  <Input
                    type="text"
                    placeholder="Verify OTP"
                    onChange={handleChange("otp_text")}
                    suffix={
                      <Spin indicator={antIcon} spinning={loadingOTP}>
                        <span
                          style={{ cursor: "pointer" }}
                          className={`text-primary`}
                          onClick={handleVerifyOTP}
                        >
                          {"Verify"}
                        </span>
                      </Spin>
                    }
                  />
                </Form.Item>
              )}

              {otpButton.text.toLowerCase() == "verified" &&
                otpButton.registerBoxShow && (
                  <>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        onChange={handleChange("password")}
                        value={password}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password_confirmation"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue("password") == value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              "The two passwords that you entered do not match!"
                            );
                          },
                        }),
                      ]}
                    >
                      <Input
                        type="password"
                        placeholder="Re-Enter Password"
                        onChange={handleChange("password_confirmation")}
                        value={password_confirmation}
                      />
                    </Form.Item>
                  </>
                )}

              <div className="form-group submit">
                {/* <Button
                  type="primary"
                  htmlType="submit"
                  className="ps-btn ps-btn--fullwidth"
                >
                  Register
                </Button> */}
                <button
                  type="submit"
                  className="ps-btn ps-btn--fullwidth"
                  // onClick={otpButton.registerBoxShow ? handleSubmit : undefined}
                >
                  Register
                </button>
              </div>
            </div>
            <div className="ps-form__footer">
              {/* <p>Connect with:</p>
              <ul className="ps-list--social">
                <li>
                  <a className="facebook" href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a className="google" href="#">
                    <i className="fa fa-google-plus"></i>
                  </a>
                </li>
                <li>
                  <a className="twitter" href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a className="instagram" href="#">
                    <i className="fa fa-instagram"></i>
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
