import React, { useEffect, useRef, useState } from "react";
import { Input, Button, Upload, message, Image } from "antd";
import { FileImageOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import AccountRepository from "~/repositories/AccountRepository";
import { getSupportMessagefromSupportId } from "~/store/account/action";
import { useRouter } from "next/router";
import { displayNotification } from "~/utilities/common-helpers";
import TimeAgo from "react-timeago";

const SupportChatView = ({ support_id }) => {
  const router = useRouter();

  const { access_token } = useSelector((state) => state.auth);
  const { support_message_from_id } = useSelector((state) => state.account);
  const [support_message, setSupportMessage] = useState("");
  let supportFileInitialState = [];
  const [support_chat_file, setSupportFile] = useState(supportFileInitialState);
  const dispatch = useDispatch();
  const handleSendTokenMessage = async () => {
    let payload = {};
    let tokenMsgFormData = new FormData();

    tokenMsgFormData.append("access_token", access_token);
    tokenMsgFormData.append("support_id", support_id);
    tokenMsgFormData.append("message", support_message);
    if (support_chat_file.length > 0) {
      tokenMsgFormData.append("image", support_chat_file[0]);
    }

    setSupportMessage("");
    const responseData = await AccountRepository.addTicketMessage(
      tokenMsgFormData
    );
    if (responseData.httpcode == 200) {
      message.success("Message Sent");
      setTimeout(() => {
        dispatch(getSupportMessagefromSupportId({ access_token, support_id }));
      }, 1000);
      return;
    } else if (responseData.httpcode == 401) {
      displayNotification(responseData.status, "", responseData.message);
      router.push(`${responseData.data.redirect}`);
      return;
    } else if (responseData.httpcode == 400) {
      Object.entries(responseData.data.errors).forEach(([key, value]) => {
        displayNotification(responseData.status, key, value[0]);
      });
      return;
    }
  };

  const [chatLen, setChatLen] = useState(0);

  const inputRef = useRef();
  useEffect(() => {
    setChatLen(support_message_from_id?.messages?.length);
    inputRef.current;
  }, []);
  const props = {
    onRemove: (uploadfile) => {
      setSupportFile(() => {
        const index = support_chat_file.indexOf(uploadfile);
        const newFileList = support_chat_file.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (uploadfile) => {
      setSupportFile([uploadfile]);
      return false;
    },
    maxCount: 1,
  };

  return (
    <div className="ps-container">
      <div className="row">
        {/* <div className="col-lg-3"></div> */}
        <div className="col-lg-12" style={{ background: "#fff" }}>
          <div className="row">
            <div
              className="col-md-12 chat"
              style={{ height: "45rem", overflowY: "scroll" }}
            >
              <div className="col-inside-lg decor-default">
                <div className="chat-body">
                  {support_message_from_id?.messages?.length > 0 ? (
                    <>
                      {support_message_from_id.messages.map(
                        (message, index) => (
                          <div
                            className={`answer ${message.align}`}
                            key={index}
                            ref={chatLen == index + 1 ? inputRef : null}
                          >
                            <div className="name">{message.from}</div>
                            <div className="text">
                              {message.message}
                              <div>
                                {message.image && (
                                  <Image width={200} src={message.image} />
                                )}
                              </div>
                            </div>

                            <div className="time">
                              <TimeAgo date={message.created_at} />
                            </div>
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    "No Chat found"
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row p-5">
            <div className="col-1">
              <Upload {...props}>
                <FileImageOutlined
                  style={{
                    cursor: "pointer",
                    fontSize: "30px",
                    color: "#858585",
                  }}
                  className="mt-3"
                />
              </Upload>
            </div>
            <div className="col-11">
              <Input
                className="rounded"
                onChange={(e) => setSupportMessage(e.target.value)}
                suffix={
                  <>
                    <Button
                      type="primary"
                      shape="circle"
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icon svg-icon--send"
                          viewBox="0 0 45.6 45.6"
                        >
                          <g>
                            <path
                              d="M20.7,26.7a1.4,1.4,0,0,1-1.2-.6,1.6,1.6,0,0,1,0-2.4L42.6.5a1.8,1.8,0,0,1,2.5,0,1.8,1.8,0,0,1,0,2.5L21.9,26.1A1.6,1.6,0,0,1,20.7,26.7Z"
                              fill="#d87232"
                            />
                            <path
                              d="M29.1,45.6a1.8,1.8,0,0,1-1.6-1L19.4,26.2,1,18.1a1.9,1.9,0,0,1-1-1.7,1.8,1.8,0,0,1,1.2-1.6L43.3.1a1.7,1.7,0,0,1,1.8.4,1.7,1.7,0,0,1,.4,1.8L30.8,44.4a1.8,1.8,0,0,1-1.6,1.2ZM6.5,16.7l14.9,6.6a2,2,0,0,1,.9.9l6.6,14.9L41,4.6Z"
                              fill="#d87232"
                            />
                          </g>
                        </svg>
                      }
                      size={"large"}
                      danger
                      onClick={handleSendTokenMessage}
                    />
                  </>
                }
                value={support_message}
                size="large"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChatView;
