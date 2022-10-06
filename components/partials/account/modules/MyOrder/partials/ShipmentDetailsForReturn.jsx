import React, { useState } from "react";

import {
  message,
  Modal,
  notification,
  Form,
  Input,
  Button,
  Radio,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "~/store/account/action";
import AccountRepository from "~/repositories/AccountRepository";
import { useRouter } from "next/router";
import { CameraFilled } from "@ant-design/icons";
const { Dragger } = Upload;

const ShipmentDetailsForReturn = ({ return_id }) => {
  const [showModal, setShowModal] = useState(false);
  const { access_token } = useSelector((state) => state.auth);
  const [refund_mode, setRefundMode] = useState("1");

  const onPaymentModeChange = (e) => {
    setRefundMode(e.target.value);
  };

  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  let shipInitialState = [];
  let initialState = {
    return_id: "",
    bank_name: "",
    account_number: "",
    branch_name: "",
    ifsc_code: "",
    shipment_detail: "",
  };

  const [ship_file, setFile] = useState(shipInitialState);
  const [shipmentPayload, setShipmentPayload] = useState(initialState);

  const handleShipmentPayloadEnteries = (name) => (event) => {
    setShipmentPayload({ ...shipmentPayload, [name]: event.target.value });
  };
  const handleCancelModal = () => {
    setShowModal(false);
  };

  const props = {
    onRemove: (uploadfile) => {
      setFile(() => {
        const index = file.indexOf(uploadfile);
        const newFileList = file.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (uploadfile) => {
      setFile([uploadfile]);
      return false;
    },
    maxCount: 1,
  };

  const handleShipmentRequest = async () => {
    let shipMentFormData = new FormData();
    shipMentFormData.append("access_token", access_token);
    shipMentFormData.append("return_id", return_id);
    shipMentFormData.append("refund_mode", refund_mode);
    shipMentFormData.append("bank_name", shipmentPayload.bank_name);
    shipMentFormData.append("account_number", shipmentPayload.account_number);
    shipMentFormData.append("branch_name", shipmentPayload.branch_name);
    shipMentFormData.append("ifsc_code", shipmentPayload.ifsc_code);
    shipMentFormData.append("shipment_detail", shipmentPayload.shipment_detail);
    shipMentFormData.append("shipment_bill", ship_file[0]);

    const response = await AccountRepository.returnShipmentDetail(
      shipMentFormData
    );
    if (response.httpcode == 200) {
      handleCancelModal();
      message.success(response.message);
      form.resetFields();
      setTimeout(() => {
        dispatch(getMyOrders({ access_token, lang_id: 1 }));
      }, 1000);
    } else if (response.httpcode == 400) {
      form.resetFields();

      let error = response.data.errors;
      for (const [key, value] of Object.entries(error)) {
        notification["error"]({
          description: value,
          duration: 2,
        });
      }
      form.resetFields();
    }
  };

  return (
    <>
      <button
        className="buybtn mt-2"
        onClick={() =>
          //implement conditional onclick
          setShowModal(true)
        }
      >
        Add Shipment Details
      </button>
      <Modal
        title="Order Return Request"
        visible={showModal}
        onCancel={handleCancelModal}
        footer={null}
      >
        <div className="col-12">
          <Form
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={handleShipmentRequest}
          >
            <Form.Item
              label="Shipment Detail"
              name="shipmentdetail"
              rules={[
                {
                  required: true,
                  message: "Please input shipment detail!",
                },
              ]}
              required
            >
              <Input.TextArea
                onChange={handleShipmentPayloadEnteries("shipment_detail")}
              />
            </Form.Item>
            <Form.Item label="Upload Shipment Bill" name="shipmentbll">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <CameraFilled className="text-secondary" />
                </p>
              </Dragger>
            </Form.Item>
            <Form.Item label="Select mode of refund payment">
              <Radio.Group onChange={onPaymentModeChange} value={refund_mode}>
                <Radio value="1">Wallet</Radio>
                <Radio value="2">Bank</Radio>
              </Radio.Group>
            </Form.Item>
            {/* BankDetailForm */}
            {refund_mode == "2" ? (
              <>
                <Form.Item
                  label="Bank Name"
                  name="bankname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your bank name!",
                    },
                  ]}
                  required
                >
                  <Input
                    onChange={handleShipmentPayloadEnteries("bank_name")}
                  />
                </Form.Item>
                <Form.Item
                  label="Account Number"
                  name="accountnumber"
                  rules={[
                    {
                      required: true,
                      message: "Please input your account number!",
                    },
                  ]}
                  required
                >
                  <Input
                    onChange={handleShipmentPayloadEnteries("account_number")}
                  />
                </Form.Item>
                <Form.Item
                  label="Branch Name"
                  name="branchname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your branch name!",
                    },
                  ]}
                  required
                >
                  <Input
                    onChange={handleShipmentPayloadEnteries("branch_name")}
                  />
                </Form.Item>
                <Form.Item
                  label="IFSC Code"
                  name="ifsccode"
                  rules={[
                    {
                      required: true,
                      message: "Please input your IFSC code!",
                    },
                  ]}
                  required
                >
                  <Input
                    onChange={handleShipmentPayloadEnteries("ifsc_code")}
                  />
                </Form.Item>
              </>
            ) : null}

            <Form.Item>
              <Button
                type="primary"
                // onClick={handleCancelRequest}
                htmlType="submit"
                block
                danger
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ShipmentDetailsForReturn;
