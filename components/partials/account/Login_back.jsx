import React, { Component, useState, useSelector } from "react";
import Link from "next/link";
import Router from "next/router";
import { login } from "../../../store/auth/action";
import Repository, { apibaseurl } from "~/repositories/Repository";
import { Form, Input, notification, Checkbox, Modal } from "antd";
import { connect, useDispatch } from "react-redux";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import background from "public/static/img/custom_images/log_bg.png";
import logo_image from "public/static/img/custom_images/logo_light.png";

const Login = (props) => {
  const [form] = Form.useForm();

  const [user, setUser] = useState({
    input: "",
    password: "",
  });

  const [rememberMe, setRemember] = useState(false);
  const [userOtp, setUserOtp] = useState("");
  const [showLoginWithSMS, setShowLoginWithSMS] = useState(true);
  const { input, password } = user;

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
            if (data.httpcode === 400 && data.status === "error") {
              notification["error"]({
                message: data.message,
              });
              return;
            }
            if (data.httpcode === 200 && data.status === "success") {
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
    // dispatch(login());
    // Router.push("/");
  };
  const loginMethodFacebook = () => {
    Router.push("/");
  };
  const loginMethodGoogle = () => {
    Router.push("/");
  };
  const loginMethodTwitter = () => {
    Router.push("/");
  };
  const loginMethodInstagram = () => {
    Router.push("/");
  };

  return (
    <div className="log">
      <nav className="menyu">
        <div className="menyu_inner">
          <div className="">
            <a className="ps-logo" href="/">
              <img src={logo_image} alt="" />
            </a>
          </div>
        </div>
      </nav>
      <div style={{ backgroundColor: "#FF0000" }}>
        <div
          className="log1 log2"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
          }}
        >
          <div className="logcard logcard1 logcard2">
            <div className="logcard_header">
              <div className="logcard_header_inner">
                <div className="logcard_header_title">Log In</div>
              </div>
            </div>
            <Form form={form} onFinish={handleLoginSubmit}>
              <div className="logcard_body">
                <div className="log_textf">
                  <div className="form-group">
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message:
                            "Please input your email or registered number!",
                        },
                      ]}
                    >
                      <Input
                        className="form-control"
                        type="text"
                        placeholder="Phone number / Username / Email"
                        onChange={handleChange("input")}
                        value={input}
                      />
                    </Form.Item>
                  </div>
                </div>
                <div className="log_textf">
                  <div className="form-group form-forgot">
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
                        className="form-control"
                        type="password"
                        placeholder="Password..."
                        onChange={handleChange("password")}
                        value={password}
                      />
                    </Form.Item>
                  </div>
                </div>
                <button
                  className="log_btn"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLoginSubmit();
                  }}
                >
                  LOG IN
                </button>
                <div className="forgt">
                  <a className="frgt_link" href="#">
                    Forgot Password
                  </a>
                  <a className="frgt_link" href="#">
                    Log in with SMS
                  </a>
                </div>
                {/* <div>
                  <div className="brdr">
                    <div className="lft_brdr"></div>
                    <div className="or_brdr">OR</div>
                    <div className="rgt_brdr"></div>
                  </div>
                  <div className="social">
                    <button className="scl soc_btn fb">
                      <div className="soc_icn">
                        <div className="scl_icn fb_icn"></div>
                      </div>
                      <div className="fb_txt">Facebook</div>
                    </button>
                    <button className="scl soc_btn gog">
                      <div className="soc_icn">
                        <div className="scl_icn gog_icn"></div>
                      </div>
                      <div className="">Google</div>
                    </button>
                  </div>
                </div> */}
              </div>
            </Form>

            <div className="logcard_fotr">
              <div className="fotr_txt">
                New to Kangtao?
                <Link href="/account/register">
                  <a className="ftr_link"> Sign Up</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
