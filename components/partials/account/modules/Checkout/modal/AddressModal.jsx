import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Input,
  Button,
  Modal,
  Form,
  Select,
  Radio,
  Checkbox,
  Tooltip,
  notification,
  message,
} from "antd";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import AccountRepository from "~/repositories/AccountRepository";
import { useDispatch } from "react-redux";
import { getCustomerAddress } from "~/store/account/action";
import { getDeviceId, makePageUrl } from "~/utilities/common-helpers";
const { Option } = Select;

const AddressModal = () => {
  const Router = useRouter();
  const [form] = Form.useForm();
  const { auth, account } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    country_name: "",
    state_name: "",
    city_name: "",
    pincode: "",
    access_token: auth.access_token,
    address_type: 1,
    is_default: 0,
    longitude: 11,
    latitude: 11,
    device_id: getDeviceId,
    os_type: "WEB",
    page_url: makePageUrl(Router.asPath),
  });
  const showModal = () => {
    setShowAddressModal(true);
  };

  const handleSubmitAddressOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setShowAddressModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleSubmitAddressCancel = () => {
    setShowAddressModal(false);
  };

  const handleSaveAddress = async (e) => {
    // e.preventDefault();

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
    addressUpdateFormData.append("is_default", address.is_default);
    addressUpdateFormData.append("latitude", address.latitude);
    addressUpdateFormData.append("longitude", address.longitude);
    addressUpdateFormData.append("device_id", address.device_id);
    addressUpdateFormData.append("os_type", address.os_type);
    addressUpdateFormData.append("page_url", address.page_url);

    let response;

    response = await AccountRepository.addAddress(addressUpdateFormData);

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
      handleSubmitAddressOk();
      dispatch(getCustomerAddress());
    } else {
      message.error(response.data.message);
    }
  };

  const [serverCountry, setCountry] = useState([]);
  const [serverState, setState] = useState([]);
  const [serverCity, setCity] = useState([]);

  async function fetchState(payload) {
    const stateDataFromServer = await AccountRepository.getState(payload);
    setState([...stateDataFromServer.state]);
    return null;
  }

  async function fetchCity(payload) {
    const cityDataFromServer = await AccountRepository.getCity(payload);
    setCity([...cityDataFromServer.city]);
    return null;
  }

  const fetchCountry = async () => {
    const countryDataFromServer = await AccountRepository.getCountry();
    setCountry([...countryDataFromServer.country]);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && showAddressModal == true) {
      fetchCountry();
    }
    return () => (isMounted = false);
  }, [auth.access_token, showAddressModal]);

  const handleChange = (name) => (event) => {
    setAddress({ ...address, [name]: event.target.value });
  };

  const handleSelectAddress = (name) => (data) => {
    setAddress({ ...address, [name]: data });

    if (name == "country") {
      let payload = { country_id: data };
      fetchState(payload);
    }
    if (name == "state") {
      let payload = { state_id: data };
      fetchCity(payload);
    }
  };

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={showModal}>
        Add New Address
      </Button>

      <Modal
        title="New Address"
        visible={showAddressModal}
        // onOk={handleSubmitAddressOk}
        onOk={handleSaveAddress}
        confirmLoading={confirmLoading}
        onCancel={handleSubmitAddressCancel}
        okText={"Submit"}
        okType={"primary"}
        okButtonProps={{ danger: true }}
        cancelButtonProps={{ danger: true }}
      >
        <Form
          form={form}
          className="ps-form--account-setting"
          onSubmit={handleSaveAddress}
          layout="vertical"
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
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
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
                      message:
                        "Name does not accept numbers & special charchters.",
                    },
                  ]}
                >
                  <Input
                    className=""
                    type="text"
                    placeholder="Fullname"
                    onChange={handleChange("name")}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <Form.Item
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "The input is empty/not a number",
                    },
                    () => ({
                      validator(rule, value) {
                        if (value.length > 0 && isNaN(value)) {
                          return Promise.reject("Enter Phone in numbers!");
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
                    className=""
                    type="text"
                    placeholder="Phonenumber"
                    onChange={handleChange("phone")}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4">
              <div className="form-group">
                <Form.Item
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: "Please select your country!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Country"
                    optionFilterProp="children"
                    onChange={handleSelectAddress("country")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {serverCountry?.map((countryDetails, index) => (
                      <Option value={countryDetails.id} key={index}>
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
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="State"
                    optionFilterProp="children"
                    onChange={handleSelectAddress("state")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {serverState?.map((stateDetails, index) => (
                      <Option value={stateDetails.id} key={index}>
                        {stateDetails.state_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <Form.Item
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Please input your city!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="City"
                    optionFilterProp="children"
                    onChange={handleSelectAddress("city")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {serverCity?.map((cityDetails, index) => (
                      <Option value={cityDetails.id} key={index}>
                        {cityDetails.city_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
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
              ]}
            >
              <Input
                className=""
                type="text"
                placeholder="Postal code"
                onChange={handleChange("pincode")}
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
              ]}
            >
              <Input
                className=""
                type="text"
                placeholder="Unit Number, House Number"
                onChange={handleChange("address1")}
              />
            </Form.Item>
          </div>
          <div className="form-group">
            <Form.Item
              name="address2"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input
                className=""
                type="text"
                placeholder="Building, Street Name"
                onChange={handleChange("address2")}
              />
            </Form.Item>
          </div>
        </Form>
      </Modal>
      <Button
        className="ml-4"
        onClick={() => {
          Router.push("/account/address");
        }}
      >
        Manage Addresses
      </Button>
    </>
  );
};

export default AddressModal;
