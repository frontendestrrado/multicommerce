import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";
import Repository, { apibaseurl } from "~/repositories/Repository";
import { Form, Input, notification, Modal, Select, Spin } from "antd";
import { connect, useDispatch } from "react-redux";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import background from "public/static/img/custom_images/log-bg.jpg";
import logo_image from "public/static/img/custom_images/logo_light.png";
import { login } from "~/store/auth/action";
import LoginWithSMS from "./LoginWithSMS";
import LoginWithEmail from "./LoginWithEmail";
import { LoadingOutlined } from "@ant-design/icons";
const Login = (props) => {
  const [form] = Form.useForm();
  const initStateOtpButton = {
    class: "primary",
    text: "Send OTP",
    verifyBox: false,
    verifiedNumber: "",
    registerBoxShow: false,
  };
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [otpButton, setOtpButton] = useState(initStateOtpButton);
  const [user, setUser] = useState({
    input: "",
    password: "",
  });
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [serverCountry, setCountry] = useState([]);
  const {
    first_name,
    last_name,
    email,
    phone_number,
    password,
    password_confirmation,
    country_code,
  } = user;
  const [rememberMe, setRemember] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [showLoginWithSMS, setShowLoginWithSMS] = useState(true);
  const { input } = user;

  const handleFeatureWillUpdate = (e) => {
    e.preventDefault();
    notification.open({
      message: "Opp! Something went wrong.",
      description: "This feature has been updated later!",
      duration: 500,
    });
  };

  const handleChange = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
  };

  const dispatch = useDispatch();

  function verifyOtp(otpFromServer, inputFromServer) {
    let userOtpInput = "";
    Modal.info({
      title: "Please Enter OTP sent on Your phone & email.",
      content: (
        <Form form={form} onFinish={handleLoginSubmit}>
          <div className="form-group">
            <Form.Item
              name="userOtp"
              rules={[
                {
                  required: true,
                  message: "Please input your OTP!",
                },
              ]}
            >
              <Input
                className="form-control"
                type="text"
                placeholder="Input your OTP!"
                onChange={(e) => {
                  userOtpInput = e.target.value;
                }}
              />
            </Form.Item>
          </div>
        </Form>
      ),
      onOk() {
        let deviceToken = uuidv4();
        let deviceId = uuidv4();
        let deviceName = "Chrome";
        let os = "WEB";
        let input = inputFromServer;
        // let otp = userOtpInput; change to this for production
        let otp = `${otpFromServer}`;

        const data = Axios.post(
          `${apibaseurl}/api/customer/verify/otp`,
          {
            input,
            otp,
            deviceToken,
            deviceId,
            deviceName,
            os,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.data)
          .then((data) => {
            if (data.httpcode == 400 && data.status == "error") {
              const args = {
                message: data.message,
                type: "error",
              };
              notification.open(args);
              return;
            }
            if (data.httpcode == 200 && data.status == "success") {
              notification["success"]({
                message: data.message,
              });
              localStorage.setItem("user", JSON.stringify(data.data));
              dispatch(login(data.data));
              Router.push("/");
              return;
            }
          })
          .catch((error) => {
            notification["error"]({
              message: error,
            });
            setUserOtp("");
          });
      },
      okCancel() {
        notification["error"]({
          message: "Login Failed",
        });
      },
      closable: false,
      keyboard: false,
    });
  }


  const login =  () => {
document.getElementById('loginId').style.display='block'
document.getElementById('registerId').style.display='none'
  }
  const reg =  () => {
    document.getElementById('registerId').style.display='block'
    document.getElementById('loginId').style.display='none'
      }
  
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

  const handleSelectCountryCode = (name) => (data) => {
    setUser({ ...user, [name]: data });
    if (name == "country_code" && data !== user.country_code) {
      setOtpButton(initStateOtpButton);
    }
  };
  const handleLoginSubmit = async () => {
    try {
      const data = await Axios.post(`${apibaseurl}/api/customer/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.data);

      if (data.httpcode === 400 && data.status === "error") {
        notification["error"]({
          message: data.data.errors.error_msg,
        });
        return;
      }
      if (data.httpcode === 200 && data.status === "success") {
        notification["success"]({
          message: data.message,
        });
        // console.log(data.data);
        verifyOtp(data.data.otp, data.data.input);
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
    return false;
  };

  return (
    <div
      className="log"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <nav
        className="menyu"
        style={{
          backgroundColor: "#006fb4",
        }}
      >
        <div className="menyu_inner">
          <div className="">
            <a className="ps-logo" href="/">
              <img src={logo_image} alt="" />
            </a>
          </div>
        </div>
      </nav>
      {/* <div className="row">
        <div className="col-md-12">
          <h3>Log In</h3>
        </div>
      </div> */}
      <div className="container">
        <div
          className="log1 log2"
          style={{
            // backgroundImage: `url(${background})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
          }}
        >
          <div className="logcard logcard1 logcard2">
            <div
              className="card"
              style={{
                border: "unset",
              }}
            >

              <div className="card-body" style={{display:'none'}} id="loginId">  
                <div className="logcard_header_inner">
                  <div className="logcard_header_title">Log In</div>
                </div>
                <div className="card-body">
                  {showLoginWithSMS ? <LoginWithSMS /> : <LoginWithEmail />}
                  <div className="forgt">
                    <a className="frgt_link" href="#">
                      Forgot Password
                    </a>
                    <a className="frgt_link" href="#">
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowLoginWithSMS(!showLoginWithSMS)}
                      >
                        {showLoginWithSMS
                          ? "Log in with Email"
                          : "Log in with SMS"}
                      </span>
                    </a>
                  </div>
                  <div
                    className="card-footer"
                    style={{
                      backgroundColor: `#ffffff`,
                      borderTop: `1px solid #ffffff`,
                    }}
                  >
                    <div className="fotr_txt">
                      Don't have an account?
                      
                        <a onClick={() => reg()} className="ftr_link"> Sign Up </a>
                      
                    </div>
                  </div>
                </div>
              </div>

        <Form
          form={form}
          className="ps-form--account"
          onFinish={otpButton.registerBoxShow ? handleSubmit : undefined}
          style={{ paddingTop: "10px" , display:'block'}}
          id="registerId"
          size="large"
          layout="vertical"
        >
          {/* <ul className="ps-tab-list">
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
          </ul> */}
          <div className="logcard_header_inner">
              <div className="logcard_header_title"> Register </div>
          </div>
          <div className="ps-tab active" id="register">
            <div className="ps-form__content">
              <Form.Item
                name="businessname"
                rules={[
                  {
                    required: true,
                    message: "Please input your businessname!",
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
                  placeholder="Enter Business Name"
                  onChange={handleChange("business_name")}
                />
              </Form.Item>
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
                  placeholder="Enter Name"
                  onChange={handleChange("first_name")}
                />
              </Form.Item>
              {/* <Form.Item
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
              </Form.Item> */}
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
                      style={{ width: "75%", height: "50px", padding: "2px" }}
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
                <div
                    className="card-footer"
                    style={{
                      backgroundColor: `#ffffff`,
                      borderTop: `1px solid #ffffff`,
                    }}
                  >
                    <div className="fotr_txt">
                      Already have an account?
                      
                        <a onClick={() => reg()} className="ftr_link"> Log In </a>
                      
                    </div>
                  </div>
                {/* <span
                        
                        onClick={() => login()}
                      >
                       Log In
                      </span> */}
              </div>
            </div>
          </div>
        </Form>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
