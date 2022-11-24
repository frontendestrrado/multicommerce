import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import Repository, { apibaseurl } from "~/repositories/Repository";
import { Form, Input, notification, Modal, Select, Statistic } from "antd";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { LoadingOutlined } from "@ant-design/icons";
import { login } from "~/store/auth/action";
import { getCountryData } from "~/store/account/action";
import { useSelector } from "react-redux";
const { Option } = Select;
const { Countdown } = Statistic;

const LoginWithSMS = () => {
  const [form] = Form.useForm();
  const [serverCountry, setCountry] = useState([]);
  const [otpButton, setOtpButton] = useState();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [counter, setCounter] = React.useState(0);
  const [otpInput, setOtpInput] = useState("");
  const [inputFromServer, setInputFromServer] = useState("");
  const [otpFromServer, setOtpFromServer] = useState("");

  React.useEffect(() => {
    let otpTimer;
    if (counter > 0) {
      otpTimer = setTimeout(() => setCounter(counter - 1), 1000);
    }
    return () => {
      clearTimeout(otpTimer);
    };
  }, [counter]);

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const dispatch = useDispatch();
  const { country_data } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getCountryData());
  }, []);
  useEffect(() => {
    setCountry([...country_data]);
  }, [country_data]);

  const [user, setUser] = useState({
    country_code: "",
    phone_number: "",
  });

  const handleChange = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
  };

  const handleResendOTP = async () => {
    console.log("...otp...",user)
    try {
      const data = await Axios.post(
        `${apibaseurl}/api/customer/login/send/otp`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.data);
      if (data.httpcode == 400 && data.status == "error") {
        notification["error"]({
          message: data.message,
        });
        return;
      }
      if (data.httpcode == 200 && data.status == "success") {
        notification["success"]({
          message: data.message,
        });
        setCounter(30);
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
    return false;
  };

  const handleSelectCountryCode = (name) => (data) => {
    setUser({ ...user, [name]: data });
  };

  const modalOk = () => {
    let deviceToken = uuidv4();
    let deviceId = process.env.deviceId;
    let deviceName = "Chrome";
    let os = "WEB";
    let input = inputFromServer;
    let otp = otpInput;
    // let otp = otpInput; change to this for production
    // let otp = `${otpFromServer}`;

    const data = Axios.post(
      `${apibaseurl}/api/customer/login/verify/otp`,
      {
        country_code: user.country_code,
        phone_number: user.phone_number,
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
        // console.log(data);
        if (data.httpcode == 400 && data.status == "error") {
          notification["error"]({
            message: data.message,
          });
          return;
        }
        if (data.httpcode == 200 && data.status == "success") {
          notification["success"]({
            message: data.message,
          });
          localStorage.setItem("user", JSON.stringify(data.data));
          dispatch(login(data.data));
          Router.push("/");
          setLoginModalVisible(false);
          return;
        }
      })
      .catch((error) => {
        notification["error"]({
          message: error,
        });
        setUserOtp("");
      });
  };

  const modalCancel = () => {
    notification["error"]({
      message: "Login Failed",
    });
    setLoginModalVisible(false);
  };

  function verifyOtp(otpFromServer, inputFromServer) {
    let userOtpInput = "";
    setCounter(30);
    setLoginModalVisible(true);
  }

  const handleLoginSubmit = async () => {
    console.log("...otp..1.",user)
    try {
      const data = await Axios.post(
        `${apibaseurl}/api/customer/login/send/otp`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => response.data);
      // console.log(data);
      if (data.httpcode == 400 && data.status == "error") {
        notification["error"]({
          message: data.message,
        });
        return;
      }
      if (data.httpcode == 200 && data.status == "success") {
        notification["success"]({
          message: data.message,
        });

        setInputFromServer(data.data.input);
        setOtpFromServer(data.data.otp);
        verifyOtp(data.data.otp, data.data.input);
      }
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
    return false;
  };

  return (
    <Form form={form} onFinish={handleLoginSubmit} size="large">
      <div className="log_textf" className="mt-4 mb-4">
        <div className="form-group">
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
                rules={[{ required: true, message: "countrycode is required" }]}
              >
                <Select
                  showSearch
                  style={{ width: "30%" }}
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
                    <Option value={`+${countryDetails.phonecode}`} key={index}>
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
                  () => ({
                    validator(rule, value) {
                      if (isNaN(value)) {
                        return Promise.reject("Please enter Phone in Numbers!");
                      }
                      if (
                        value.length > 0 &&
                        (value.length > 12 || value.length < 7)
                      ) {
                        return Promise.reject(
                          "Phone number should be 7-12 digit long!"
                        );
                      }
                    },
                  }),
                ]}
              >
                <Input
                  type="text"
                  placeholder="Mobile Number "
                  onChange={handleChange("phone_number")}
                  style={{ width: "70%" }}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </div>
        <Modal
          title="Please Enter OTP sent on Your Phone"
          onOk={modalOk}
          onCancel={modalCancel}
          closable={false}
          keyboard={false}
          visible={loginModalVisible}
          okButtonProps={{ danger: true }}
          width={400}
        >
          <Form form={form} onFinish={handleLoginSubmit}>
            <div className="form-group">
              <Form.Item
                name="userOtp"
                rules={[
                  {
                    required: true,
                    message: "Please input your OTP!",
                  },
                  () => ({
                    validator(rule, value) {
                      if (isNaN(value)) {
                        return Promise.reject("Please enter in Numbers!");
                      }
                    },
                  }),
                ]}
              >
                <Input
                  className="form-control"
                  type="text"
                  placeholder="Input your OTP!"
                  onChange={(e) => {
                    setOtpInput(e.target.value);
                    // userOtpInput = e.target.value;
                  }}
                  maxLength={4}
                  suffix={
                    <span
                      style={{ cursor: "pointer" }}
                      className={`text-primary ${counter == 0 ? "" : "d-none"}`}
                      onClick={handleResendOTP}
                    >
                      {`Resend OTP`}
                    </span>
                  }
                />
              </Form.Item>
              <div className="d-flex flex-row-reverse">
                <div>
                  {counter > 0 ? (
                    <>
                      You Can Resend OTP In:
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        {` ${counter}s`}
                      </span>
                    </>
                  ) : (
                    <span style={{ color: "", fontWeight: "bold" }}>
                      {/* OTP Expired */}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Form>
        </Modal>
      </div>
      <button
        className="log_btn"
        onClick={(e) => {
          e.preventDefault();
          handleLoginSubmit();
        }}
        type="submit"
      >
        Send OTP
      </button>
    </Form>
  );
};

export default LoginWithSMS;
