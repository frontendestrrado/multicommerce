import { message, Modal, notification } from "antd";
import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "~/store/account/action";
import AccountRepository from "~/repositories/AccountRepository";
import { useRouter } from "next/router";
const { Option } = Select;

const ReturnOrder = ({ sale_id, product_id, quantity }) => {
  const [showModal, setShowModal] = useState(false);
  const { access_token } = useSelector((state) => state.auth);
  const router = useRouter();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [requestPayload, setRequestPayload] = useState({
    reason: "",
    quantity: "",
    issue_item: "",
    message: "",
  });

  const handleCancelModal = () => {
    setShowModal(false);
  };

  const handleReturnRequest = async () => {
    let payload = {
      access_token,
      sale_id,
      product_id,
      ...requestPayload,
    };

    const response = await AccountRepository.returnOrderRequest(payload);
    if (response.httpcode == 200) {
      handleCancelModal();
      message.success(response.message);
      form.resetFields();
      setTimeout(() => {
        dispatch(getMyOrders({ access_token, lang_id: 1 }));
        router.push("/account/my-orders");
      }, 1000);
    } else if (response.httpcode == 400) {
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

  const handleReturnRequestEnteries = (name) => (event) => {
    setRequestPayload({ ...requestPayload, [name]: event.target.value });
  };

  const handleReturnRequestQuantity = (value) => {
    setRequestPayload({ ...requestPayload, quantity: value });
  };

  return (
    <>
      <button
        className="ratbtn mt-2"
        onClick={() =>
          //implement conditional onclick
          setShowModal(true)
        }
      >
        Return Product
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
            onFinish={handleReturnRequest}
          >
            <Form.Item
              label="Quantity of products"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please input quantity!",
                },
              ]}
              required
            >
              <Select
                style={{ width: "100%" }}
                onChange={handleReturnRequestQuantity}
              >
                {[...Array(quantity).fill(1)].map((value, index) => {
                  let optionValue = 1 + index;
                  return (
                    <Option value={optionValue} key={index}>
                      {optionValue}
                    </Option>
                  );
                })}
              </Select>

              {/* <Input onChange={handleReturnRequestEnteries("quantity")} /> */}
            </Form.Item>
            <Form.Item
              label="Reason for return"
              name="reason"
              rules={[
                {
                  required: true,
                  message: "Please input reason!",
                },
              ]}
              required
            >
              <Input onChange={handleReturnRequestEnteries("reason")} />
            </Form.Item>
            <Form.Item
              label="Issue with item"
              name="issue"
              rules={[
                {
                  required: true,
                  message: "Please input issue!",
                },
              ]}
              required
            >
              <Input onChange={handleReturnRequestEnteries("issue_item")} />
            </Form.Item>

            <Form.Item
              label="Message"
              name="message"
              rules={[
                {
                  required: true,
                  message: "Please input message!",
                },
              ]}
              required
            >
              <Input.TextArea
                onChange={handleReturnRequestEnteries("message")}
              />
            </Form.Item>
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

export default ReturnOrder;
