import React, { useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Repository, { apibaseurl } from "~/repositories/Repository";
import { login } from "~/store/auth/action";
import { Form, Input, notification, Modal } from "antd";
import Axios from "axios";
import { osType } from "~/utilities/common-helpers";

const LoginWithEmail = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    input: "",
    password: "",
  });

  const handleLoginSubmit = async () => {
    let deviceToken = uuidv4();
    let deviceId = uuidv4();
    let deviceName = "Chrome";
    let os = osType();
    let input = user.input;
    let password = user.password;

    const data = await Axios.post(`${apibaseurl}/api/customer/login`, {
      input,
      password,
      deviceToken,
      deviceId,
      deviceName,
      os,
    })
      .then((response) => response.data)
      .then((data) => {
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
          return;
        }
      })
      .catch((error) => {
        notification["error"]({
          message: error,
        });
      });
  };

  const handleChange = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
  };
  return (
    <Form form={form} onFinish={handleLoginSubmit} size="large">
      <div className="log_textf">
        <div className="form-group">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              className="form-control"
              type="email"
              placeholder="Email"
              onChange={handleChange("input")}
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
            />
          </Form.Item>
        </div>
      </div>
      <button className="log_btn" type="submit">
        Login
      </button>
    </Form>
  );
};

export default LoginWithEmail;
