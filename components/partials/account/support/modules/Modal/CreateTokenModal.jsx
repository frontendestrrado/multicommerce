import React, { useState } from "react";
import {
  Input,
  Button,
  Modal,
  Form,
  message,
  Tooltip,
  notification,
} from "antd";
import { useSelector } from "react-redux";
import AccountRepository from "~/repositories/AccountRepository";
import { displayNotification } from "~/utilities/common-helpers";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { getTokenList } from "~/store/account/action";

const CreateTokenModal = ({ fromList = false }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const [tokenData, setTokenData] = useState({
    subject: "",
    message: "",
  });
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCreateToken = async () => {
    setConfirmLoading(true);
    let payload = {
      access_token,
      ...tokenData,
    };

    const responseData = await AccountRepository.createSupportToken(payload);
    if (responseData.httpcode == 200) {
      message.success("Token Created");
      setTimeout(() => {
        setConfirmLoading(false);
        handleCancel();
        form.resetFields();
        dispatch(getTokenList({ access_token }));
      }, 1500);
      return;
    } else if (responseData.httpcode == 401) {
      displayNotification(responseData.status, "", responseData.message);
      router.push(`${responseData.data.redirect}`);
      return;
    } else {
      Object.entries(responseData.data.errors).forEach(([key, value]) => {
        displayNotification(responseData.status, key, value[0]);
      });
      setTimeout(() => {
        setConfirmLoading(false);
        form.resetFields();
      }, 1500);
      return;
    }
  };

  const handleChange = (name) => (e) => {
    setTokenData({ ...tokenData, [name]: e.target.value });
  };

  return (
    <>
      <button
        className={fromList ? "newtoknbtn" : "newtokbtn"}
        onClick={() => setVisible(true)}
      >
        Create New Token
      </button>
      <Modal
        title="Create Token"
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <div className="col-12">
          <Form
            form={form}
            className="ps-form--account-setting"
            onFinish={handleCreateToken}
            layout="vertical"
          >
            <Form.Item
              name="subject"
              rules={[
                {
                  required: false,
                  message: "Please input your voucher!",
                },
              ]}
              label={`Subject`}
            >
              <Input
                className="form-control"
                type="text"
                onChange={handleChange("subject")}
              />
            </Form.Item>
            <Form.Item
              name="message"
              rules={[
                {
                  required: false,
                  message: "Please input your message!",
                },
              ]}
              label={`Message`}
            >
              <Input.TextArea
                className="form-control"
                type="text"
                onChange={handleChange("message")}
              />
            </Form.Item>
            <Button
              loading={confirmLoading}
              type="primary"
              size="large"
              htmlType="submit"
              block
              danger
            >
              Send
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default CreateTokenModal;
