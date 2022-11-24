import React, { useEffect, useState } from "react";
import {
  DatePicker,
  Empty,
  Form,
  Input,
  Select,
  message,
  notification,
} from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerProfile,
  updateCustomerProfile,
} from "~/store/account/action";
import AccountRepository from "~/repositories/AccountRepository";
import { useRouter } from "next/router";
import { logOut } from "~/store/auth/action";
import Axios from "axios";

import CountDownSimple from "../elements/CountDownSimple";
import { getDeviceId, makePageUrl } from "~/utilities/common-helpers";
const { Option } = Select;

const FormChangeUserInformation = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form] = Form.useForm();
  const { auth, account } = useSelector((state) => state);
  const { customer_profile, profile_error } = account;

  if (profile_error && profile_error.httpcode == 401) {
    dispatch(logOut());
    setTimeout(function () {
      router.push("/account/login");
      // window.location.reload();
    }, 300);
  }

  const {
    username,
    user_id,
    first_name,
    last_name,
    phone,
    email,
    address1,
    country,
    state,
    city,
    profile_image,
    country_id,
    state_id,
    city_id,
  } = customer_profile;

  const [user, setUser] = useState({
    username: customer_profile ? username : "",
    first_name: customer_profile ? first_name : "",
    last_name: customer_profile ? last_name : "",
    email: customer_profile ? email : "",
    phone: customer_profile ? phone : "",
    password: "",
    password_confirmation: "",
    address: customer_profile ? address1 : "",
    country: customer_profile ? country_id : "",
    state: customer_profile ? state_id : "",
    city: customer_profile ? city_id : "",
    access_token: auth.access_token,
    profile_image: null,
    device_id: getDeviceId,
    os_type: "WEB",
    page_url: makePageUrl(router.asPath),
  });

  const [lodingCheck, setlodingCheck] = useState({
    lodingCountries: false,
    lodingCities: false,
  });

  const [serverCountry, setCountry] = useState([]);
  const [serverState, setState] = useState([]);
  const [serverCity, setCity] = useState([]);

  async function fetchCountry() {
    const countryDataFromServer = await AccountRepository.getCountry();
    setCountry([...countryDataFromServer?.country]);
    return null;
  }

  async function fetchState(payload) {
    const stateDataFromServer = await AccountRepository.getState(payload);
    setState([...stateDataFromServer?.state]);
    return null;
  }

  async function fetchCity(payload) {
    const cityDataFromServer = await AccountRepository.getCity(payload);
    setCity([...cityDataFromServer?.city]);
    return null;
  }

  useEffect(() => {
    if (auth?.isLoggedIn) {
      fetchCountry();
    }
  }, [user?.city]);

  const handleChange = (name) => (event) => {
    setUser({ ...user, [name]: event.target.value });
  };

  const handleSelectAddress = (name) => (data) => {
    setUser({ ...user, [name]: data });

    if (name == "country") {
      let payload = { country_id: data };
      fetchState(payload);
    }
    if (name == "state") {
      let payload = { state_id: data };
      fetchCity(payload);
    }
  };

  const handleSubmit = async (e) => {
    var userUpdateFormData = new FormData();
    userUpdateFormData.append("access_token", user.access_token);
    userUpdateFormData.append("username", user.username || username);
    userUpdateFormData.append("first_name", user.first_name || first_name);
    userUpdateFormData.append("last_name", "");
    userUpdateFormData.append("email", user.email || email);
    userUpdateFormData.append("country_code", "+91");
    userUpdateFormData.append("phone", user.phone || phone);
    userUpdateFormData.append("country",1);
    userUpdateFormData.append("state", 1);
    userUpdateFormData.append("city", 1);
    userUpdateFormData.append("gender", "");
    userUpdateFormData.append("birthday", "");   
    userUpdateFormData.append("profile_img", user.profile_image);
    userUpdateFormData.append("os_type", user.os_type);
    userUpdateFormData.append("device_id", user.device_id);
    userUpdateFormData.append("password", user.password);
    userUpdateFormData.append(
      "password_confirmation",
      user.password_confirmation
    );
    
    
   // userUpdateFormData.append("address", user.address || address1);
 
    
    
    // userUpdateFormData.append("page_url", user.page_url);
    
    

    const response = await AccountRepository.editCustomerProfile(
      userUpdateFormData
    );
console.log("....zzzzz..",response)
    if (response.httpcode == 200) {
      message.success("Profile Updated Successfully!");
      message.success("Please Relogin to see latest changes!");
      dispatch(getCustomerProfile());
      form.setFieldsValue({ password_confirmation: "", password: "" });
    } else if (response.status == "error") {
      // message.error("Error While Updating Data! Please Try Later..");
      message.error(response.message);
    }
  };

  return (
    <div>
      {username === undefined ? (
        <Empty />
      ) : (
        <Form
          form={form}
          className="ps-form--account-setting"
          onFinish={handleSubmit}
          size="large"
          layout="vertical"
        >
          <div className="ps-form__content">
            <div className="ps-form__header">
              <h3>Account Information</h3>
            </div>
            <div className="form-group">
              <Form.Item
                name="username"
                rules={[
                  {
                    required: false,
                    message: "Please input your username",
                  },
                ]}
                initialValue={username}
              >
                <Input
                  className=""
                  type="text"
                  placeholder="Enter Username"
                  onChange={handleChange("username")}
                />
              </Form.Item>
            </div>
            <div className="form-group">
              <Input
                name="image_link"
                onChange={(e) =>
                  setUser({ ...user, profile_image: e.target.files[0] })
                }
                encType="multipart/form-data"
                type="file"
                accept="image/*"
                placeholder="Add Image"
              />
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <Form.Item
                    name="firstname"
                    rules={[
                      {
                        required: false,
                        message: "Please input your firstname!",
                      },
                      {
                        pattern: new RegExp(/^[a-zA-Z]+$/i),
                        message: "Only Alphabets Accepted",
                      },
                    ]}
                    initialValue={first_name}
                  >
                    <Input
                      className=""
                      type="text"
                      placeholder="Enter Firstname"
                      onChange={handleChange("first_name")}
                    />
                  </Form.Item>
                </div>
              </div>
              {/* <div className="col-sm-6">
                <div className="form-group">
                  <Form.Item
                    name="lastname"
                    rules={[
                      {
                        required: false,
                        message: "Please input your lastname!",
                      },
                      {
                        pattern: new RegExp(/^[a-zA-Z]+$/i),
                        message: "Only Alphabets Accepted",
                      },
                    ]}
                    initialValue={last_name}
                  >
                    <Input
                      className=""
                      type="text"
                      placeholder="Enter Lastname"
                      onChange={handleChange("last_name")}
                    />
                  </Form.Item>
                </div>
              </div> */}

              <div className="col-sm-6">
                <div className="form-group">
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: false,
                        message: "The input is not a number",
                      },
                    ]}
                    initialValue={phone}
                  >
                    <Input
                      className=""
                      type="text"
                      placeholder="Enter Phone Number"
                      onChange={handleChange("phone")}
                    />
                  </Form.Item>
                </div>
              </div>
              {/* <div className="col-sm-6">
                <div className="form-group">
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: false,
                        message: "Please input your email!",
                      },
                    ]}
                    initialValue={email}
                  >
                    <Input
                      className=""
                      type="email"
                      placeholder="Email Address"
                      onChange={handleChange("email")}
                    />
                  </Form.Item>
                </div>
              </div> */}
              {/* <div className="col-sm-12">
                <div className="form-group">
                  <Form.Item
                    name="address"
                    rules={[
                      {
                        required: false,
                        message: "Please input your address!",
                      },
                    ]}
                    initialValue={address1}
                  >
                    <Input
                      className=""
                      type="text"
                      placeholder="Your Address"
                      onChange={handleChange("address")}
                    />
                  </Form.Item>
                </div>
              </div> */}
              {/* <div className="col-sm-4">
                <div className="form-group">
                  <Form.Item
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Please select your country!",
                      },
                    ]}
                    label="Country"
                    initialValue={country}
                  >
                    <Select
                      showSearch
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select a country"
                      optionFilterProp="children"
                      onChange={handleSelectAddress("country")}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {serverCountry?.map((countryDetails) => (
                        <Option
                          value={countryDetails.id}
                          key={countryDetails.id}
                        >
                          {countryDetails.country_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <Form.Item
                    name="state"
                    rules={[
                      {
                        required: true,
                        message: "Please input your state!",
                      },
                    ]}
                    label="State"
                    initialValue={state}
                  >
                    <Select
                      showSearch
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select a state"
                      optionFilterProp="children"
                      onChange={handleSelectAddress("state")}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {serverState?.map((stateDetails) => (
                        <Option value={stateDetails.id}>
                          {stateDetails.state_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group form">
                  <Form.Item
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Please input your city!",
                      },
                    ]}
                    label="City"
                    initialValue={city}
                  >
                    <Select
                      showSearch
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select a city"
                      optionFilterProp="children"
                      onChange={handleSelectAddress("city")}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {serverCity?.map((cityDetails) => (
                        <Option value={cityDetails.id} key={cityDetails.id}>
                          {cityDetails.city_name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div> */}
              <div className="ps-form__header col-sm-12">
                <h3>Password Update</h3>
              </div>
              <div className="col-sm-6">
                <div className="form-group form">
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: false,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input
                      className=""
                      type="password"
                      placeholder="Enter New Password"
                      onChange={handleChange("password")}
                    />
                  </Form.Item>
                </div>
              </div>

              <hr />

              <div className="col-sm-6">
                <div className="form-group form-forgot">
                  <Form.Item
                    name="password_confirmation"
                    dependencies={["password"]}
                    rules={[
                      {
                        required: false,
                        message: "Please input your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue("password") === value) {
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
                      className=""
                      type="password"
                      placeholder="Re-Enter Password"
                      onChange={handleChange("password_confirmation")}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="form-group submit">
              <button
                className="ps-btn"
                type="submit"
                style={{ width: "auto" }}
              >
                Update profile
              </button>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
};

export default FormChangeUserInformation;
