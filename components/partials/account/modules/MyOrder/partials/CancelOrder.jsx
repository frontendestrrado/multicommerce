import { message, Modal, notification } from "antd";
import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrderRequest,
  getMyOrders,
  getOrderDetails,
} from "~/store/account/action";
import AccountRepository from "~/repositories/AccountRepository";

const CancelOrder = ({ cancel_order_detail, saleId = null, paymentMode }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [refund_mode, setRefundMode] = useState("1");
  const [confirm_status, setConfirmStatus] = useState(0);
  const [bankDetail, setBankDetais] = useState({
    bank_name: "",
    account_number: "",
    branch_name: "",
    ifsc_code: "",
  });

  const { access_token } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const handleCancelModal = () => {
    setShowModal(false);
    setConfirmStatus(0);
    setRefundMode("1");
  };

  const onPaymentModeChange = (e) => {
    setRefundMode(e.target.value);
  };

  const handleCancelRequest = async (cancel_status = undefined) => {
    let payload = {
      access_token,
      cancel_id: cancel_order_detail?.cancel_id,
      status: cancel_status || confirm_status,
      refund_mode: refund_mode,
      bank_name: bankDetail.bank_name,
      account_number: bankDetail.account_number,
      branch_name: bankDetail.branch_name,
      ifsc_code: bankDetail.ifsc_code,
    };
    form.resetFields();
    const response = await AccountRepository.cancelOrderRequest(payload);
    if (response.httpcode == 200) {
      handleCancelModal();
      message.success(response.message);
      form.resetFields();
      setTimeout(() => {
        dispatch(getMyOrders({ access_token, lang_id:localStorage.getItem("langId") }));
        if (saleId !== null) {
          let payload = {
            access_token,
            lang_id:localStorage.getItem("langId"),
            sale_id: saleId,
          };
          dispatch(getOrderDetails(payload));
        }
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

  const handleBankDetails = (name) => (event) => {
    setBankDetais({ ...bankDetail, [name]: event.target.value });
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
        Cancel Item
      </button>

      <Modal
        title="Cancel Order Confirmation"
        visible={showModal}
        onCancel={handleCancelModal}
        footer={null}
      >
        <div>
          {confirm_status == 0 || confirm_status == 2 ? (
            <>
              <div className="col-12">
                <p style={{ lineHeight: "0.5em" }}>Reason for cancel order:</p>
                <p style={{ fontSize: "2rem" }}>
                  {cancel_order_detail?.cancel_notes}
                </p>
              </div>
              <div className="col-12 align-self-center text-center">
                <p style={{ fontSize: "2.4rem" }}>
                  Are you sure to cancel the order?
                </p>
              </div>
              <div className="row">
                <div className="col-6">
                  <button
                    className="ratbtn mt-2"
                    onClick={() => {
                      //implement conditional onclick
                      if (paymentMode.toLowerCase() == "cash on delivery") {
                        handleCancelRequest(1);
                      } else {
                        setConfirmStatus(1);
                      }
                    }}
                    style={{
                      color: "#00FF00",
                      border: "1px solid #00FF00",
                    }}
                  >
                    Accept
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="ratbtn mt-2"
                    onClick={() => {
                      //implement conditional onclick
                      setConfirmStatus(2);
                      handleCancelRequest(2);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div
              className="text-right font-weight-bold text-danger"
              onClick={() => setConfirmStatus(0)}
              style={{ cursor: "pointer" }}
            >
              Back
            </div>
          )}

          {confirm_status == 1 &&
          paymentMode.toLowerCase() !== "cash on delivery" ? (
            <>
              <div className="col-12 mt-5">
                <Form form={form} layout="vertical" autoComplete="off">
                  <Form.Item label="Select mode of refund payment">
                    <Radio.Group
                      onChange={onPaymentModeChange}
                      value={refund_mode}
                    >
                      <Radio value="1">Wallet</Radio>
                      <Radio value="2">Bank</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </div>

              {/* BankDetailForm */}
              {refund_mode == "1" ? (
                <Button
                  type="primary"
                  onClick={handleCancelRequest}
                  htmlType="submit"
                  block
                  danger
                >
                  Submit
                </Button>
              ) : null}
              {refund_mode == "2" ? (
                <div className="col-12">
                  <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    onFinish={handleCancelRequest}
                  >
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
                      <Input onChange={handleBankDetails("bank_name")} />
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
                      <Input onChange={handleBankDetails("account_number")} />
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
                      <Input onChange={handleBankDetails("branch_name")} />
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
                      <Input onChange={handleBankDetails("ifsc_code")} />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" block danger>
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              ) : null}
            </>
          ) : (
            confirm_status == 1 && (
              <Form
                className="mt-5"
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={() => handleCancelRequest(undefined)}
              >
                <Form.Item>
                  <Button type="primary" htmlType="submit" block danger>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )
          )}
        </div>
      </Modal>
    </>
  );
};

export default CancelOrder;
