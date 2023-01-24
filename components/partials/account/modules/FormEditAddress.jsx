import React, { Component, useState, useEffect } from "react";
import GoogleMap from "./googleMap";
import {
  DatePicker,
  Empty,
  Form,
  Input,
  Select,
  message,
  notification,
  Radio,
  Checkbox,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Router, useRouter } from "next/router";
import AccountRepository from "~/repositories/AccountRepository";
import { InfoCircleOutlined } from "@ant-design/icons";
import { addAddress } from "~/store/account/action";
import { getDeviceId, makePageUrl } from "~/utilities/common-helpers";

const FormEditAddress = ({ selectedAddress }) => {
  console.log("...1111111111111111111111111111111111111111111111111,,,,,,,,,,,,,,,,,,",selectedAddress)
  const selAddressLength = selectedAddress.length;
  const dispatch = useDispatch();

  const router = useRouter();
  const [form] = Form.useForm();
  const { auth, account } = useSelector((state) => state);
  const [requiredMark, setRequiredMarkType] = useState("optional");

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const [address, setAddress] = useState({
    name: selAddressLength > 0 ? selectedAddress[0].name : "",
    phone: selAddressLength > 0 ? selectedAddress[0].phone : "",
    address1: selAddressLength > 0 ? selectedAddress[0].address1 : "",
    address2: selAddressLength > 0 ? selectedAddress[0].address2 : "",
    country: selAddressLength > 0 ? selectedAddress[0].country_id : "",
    state: selAddressLength > 0 ? selectedAddress[0].state_id : "",
    city: selAddressLength > 0 ? selectedAddress[0].city_id : "",

    country_name: selAddressLength > 0 ? selectedAddress[0].country : "",
    state_name: selAddressLength > 0 ? selectedAddress[0].state : "",
    city_name: selAddressLength > 0 ? selectedAddress[0].city : "",

    pincode: selAddressLength > 0 ? selectedAddress[0].pincode : "",
    country_code: selAddressLength > 0 ? selectedAddress[0].country_code : "",
    access_token: auth.access_token,
    address_type:
      selAddressLength > 0
        ? selectedAddress[0].address_type == "Home"
          ? 1
          : 2
        : 1,
    is_default: selAddressLength > 0 ? selectedAddress[0].is_default : 0,
    longitude: 11,
    latitude: 11,
    device_id: getDeviceId,
    os_type: "WEB",
    page_url: makePageUrl(router.asPath),
  });

  const [serverCountry, setCountry] = useState([]);
  const [serverState, setState] = useState([]);
  const [serverCity, setCity] = useState([]);

  async function fetchCountry() {
   // alert("c")
    const countryDataFromServer = await AccountRepository.getCountry();
    console.log("....contry......",countryDataFromServer)
    setCountry([...countryDataFromServer.country]);
    return null;
  }

  async function fetchState(payload) {
    const stateDataFromServer = await AccountRepository.getState(payload);
    setState([...stateDataFromServer.state]);
    return null;
  }

  async function fetchCity(payload) {
    console.log("aaaaaaaa")
    const cityDataFromServer = await AccountRepository.getCity(payload);
    setCity([...cityDataFromServer.city]);
    return null;
  }

  useEffect(() => {
  // alert("1111")
  console.log("...auth...auth.....",auth)
  //   if (auth?.isLoggedIn) {
  //  alert("22222")
      fetchCountry();
    // }
  }, []);

  const handleChange = (name) => (event) => {
    setAddress({ ...address, [name]: event.target.value });
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();

    var addressUpdateFormData = new FormData();
    addressUpdateFormData.append("access_token", auth.access_token);
    addressUpdateFormData.append("name", address.name);
    addressUpdateFormData.append("address_type", address.address_type);
    addressUpdateFormData.append("phone", address.phone);
    addressUpdateFormData.append("country", address.country);
    addressUpdateFormData.append("state", address.state);
    addressUpdateFormData.append("city", address.city);
    addressUpdateFormData.append("address1", address.address1);
    addressUpdateFormData.append("address2", address.address2);
    addressUpdateFormData.append("pincode", address.pincode);
    addressUpdateFormData.append("latitude", address.latitude);
    addressUpdateFormData.append("longitude", address.longitude);
    addressUpdateFormData.append("is_default", address.is_default);
    addressUpdateFormData.append("neighborhood", address.city);
    addressUpdateFormData.append("house", address.city);
    addressUpdateFormData.append("street", address.city);
    addressUpdateFormData.append("country_code", "+91");
 //   addressUpdateFormData.append("country_code", address.country_code);
 //   addressUpdateFormData.append("house", address.country_code);
   // addressUpdateFormData.append("device_id", address.device_id);
    //addressUpdateFormData.append("os_type", address.os_type);
   // addressUpdateFormData.append("page_url", address.page_url);
    //addressUpdateFormData.append("country_code", +91);
console.log("..addressUpdateFormData..addressUpdateFormData..",addressUpdateFormData)
    let response;

    if (selAddressLength > 0) {
      addressUpdateFormData.append("address_id", selectedAddress[0].id);
      response = await AccountRepository.updateAddress(addressUpdateFormData);
    } else {
      response = await AccountRepository.addAddress(addressUpdateFormData);
    }

    if (response.httpcode == "400" && response.data.errors) {
      Object.keys(response.data.errors).forEach((key) => {
        notification["error"]({
          message: key,
          description: response.data.errors[key],
        });
      });
    } else if (response.httpcode == "200") {
      notification["success"]({
        message: "Success",
        description: response.data.message,
      });

      setTimeout(() => {
        router.push("/account/address");
      }, 500);
    }
  };

  const handleSelectAddress = (name) => (data) => {
    console.log("..bbb...",name)
    setAddress({ ...address, [name]: data });

    if (name == "country") {
      let payload = { country_id: data };
      console.log("..ccccc...",payload)
      fetchState(payload);
    }
    if (name == "state") {
      let payload = { state_id: data };
      fetchCity(payload);
    }
  };

  return (
    <>
      <div className="ps-form__content mt-5">
       
        <Form
          form={form}
          className="ps-form--account-setting"
          // onSubmit={handleSaveAddress}
          layout="vertical"
          size="large"
        >
          <div className="form-group">
            <Radio.Group
              name="address"
              defaultValue={address.address_type}
              onChange={handleChange("address_type")}
            >
              <Radio value={1}>Home</Radio>
              <Radio value={2}>Office</Radio>
            </Radio.Group>
            <div className="form-group float-right">
              <div className="float-right">
                <Tooltip title="Make Default">
                  <Checkbox
                    checked={address.is_default}
                    onClick={(e) =>
                      setAddress({
                        ...address,
                        is_default: e.target.checked ? 1 : 0,
                      })
                    }
                  >
                    Default Address
                  </Checkbox>
                </Tooltip>
              </div>
            </div>
          </div>
          
              <GoogleMap />
           
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
              { min: 2, message: "Name must be minimum 2 characters." },
              {
                pattern: new RegExp("^[A-Za-z ]+$"),
                message: "Name does not accept numbers & special charchters.",
              },
            ]}
            label="Name"
            tooltip="Firstname is required."
            initialValue={address.name}
          >
            <Input
              className=""
              type="text"
              placeholder="Enter name"
              onChange={handleChange("name")}
            />
          </Form.Item>
          <div className="form-group">
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: "The input is not a number",
                },
                { min: 7, message: "Phone must be minimum 7 number long." },
                { max: 12, message: "Phone must be maximum 12 number long." },
              ]}
              label="Phone"
              tooltip="Phone is required."
              initialValue={address.phone}
            >
              <Input
                className=""
                type="text"
                placeholder="Enter Phone Number"
                onChange={handleChange("phone")}
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
                { min: 2, message: "Address must be minimum 2 characters." },
              ]}
              label="Address Line 1"
              tooltip="Address Line Required"
              initialValue={address.address1}
            >
              <Input
                className=""
                type="text"
                placeholder="Your Address"
                onChange={handleChange("address1")}
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <Form.Item
              name="address2"
              rules={[
                {
                  required: false,
                  message: "Please input your address!",
                },
              ]}
              label="Address Line 2"
              initialValue={address.address2}
            >
              <Input
                className=""
                type="text"
                placeholder="Address line 2"
                onChange={handleChange("address2")}
              />
            </Form.Item>
          </div>
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
              initialValue={address.country_name}
            >
              <Select
                showSearch
                size="large"
                style={{ width: "100%" }}
                placeholder="Select a country"
                optionFilterProp="children"
                onChange={handleSelectAddress("country")}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {serverCountry?.map((countryDetails) => (
                  <Option value={countryDetails.id}>
                    {countryDetails.country_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
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
              initialValue={address.state_name}
            >
              <Select
                showSearch
                size="large"
                style={{ width: "100%" }}
                placeholder="Select a state"
                optionFilterProp="children"
                onChange={handleSelectAddress("state")}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
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
          <div className="form-group">
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
              label="City"
              initialValue={address.city_name}
            >
              <Select
                showSearch
                size="large"
                style={{ width: "100%" }}
                placeholder="Select a city"
                optionFilterProp="children"
                onChange={handleSelectAddress("city")}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {serverCity?.map((cityDetails) => (
                  <Option value={cityDetails.id}>
                    {cityDetails.city_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="form-group">
            <Form.Item
              name="pincode"
              rules={[
                {
                  required: true,
                  message: "Please enter postal code!",
                },
                () => ({
                  validator(rule, value) {
                    if (isNaN(value)) {
                      return Promise.reject(
                        "Please enter postal code in numbers!"
                      );
                    }
                  },
                }),
                { min: 2, message: "PostalCode must be minimum 2 numbers." },
              ]}
              label="Postal Code"
              initialValue={address.pincode}
            >
              <Input
                className=""
                type="text"
                placeholder="Postal code"
                onChange={handleChange("pincode")}
              />
            </Form.Item>
          </div>

          <div className="form-group submit">
            {selAddressLength > 0 ? (
              <button className="ps-btn" onClick={handleSaveAddress}>
                Update Address
              </button>
            ) : (
              <button className="ps-btn" onClick={handleSaveAddress}>
                Save Address
              </button>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default FormEditAddress;
