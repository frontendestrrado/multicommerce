import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { FileImageOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerChatMessage,
  getCustomerChatList,
  sendMessageToSeller,
} from "~/store/account/action";

const ChatSendMessageBox = () => {
  const [text, setText] = useState("");
  let supportFileInitialState = [];
  const [chat_file, setChatFile] = useState(supportFileInitialState);

  const { customer_messages, selectedChatID, selectedSellerID } = useSelector(
    (state) => state.account
  );

  const { access_token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const props = {
    onRemove: (uploadfile) => {
      setChatFile(() => {
        const index = chat_file.indexOf(uploadfile);
        const newFileList = chat_file.slice();
        newFileList.splice(index, 1);
        return newFileList;
      });
    },
    beforeUpload: (uploadfile) => {
      setChatFile([uploadfile]);
      return false;
    },
    maxCount: 1,
    fileList: chat_file.fileList,
  };

  function handleOnEnter(enterText) {
    var sendMessage = new FormData();

    let localStoreSeller = JSON.parse(localStorage.getItem("seller_chat_id"));
    let localStoreSellerID;

    if (localStoreSeller !== null && localStoreSeller !== undefined) {
      localStoreSellerID = localStoreSeller.seller_id;
    }

    sendMessage.append("access_token", access_token);
    sendMessage.append("message", text);
    sendMessage.append("msg_type", "text");
    sendMessage.append("seller_id", selectedSellerID || localStoreSellerID);
    sendMessage.append("prd_id", "");
    if (chat_file.length > 0) {
      sendMessage.append("image", chat_file[0]);
    }

    dispatch(sendMessageToSeller(sendMessage));

    setTimeout(() => {
      var getChatList = new FormData();
      getChatList.append("access_token", access_token);
      getChatList.append("seller_id", localStoreSellerID);
      dispatch(getCustomerChatList(getChatList));
      dispatch(getCustomerChatMessage(getChatList));
      setChatFile(() => {
        return supportFileInitialState;
      });
      setText("");
    }, 1000);
  }

  return (
    <>
      {selectedSellerID ? (
        <div className="chat__send-container px-2 px-md-3 pt-1 pt-md-3">
          <div className="chat--image-upload">
            <Upload {...props}>
              {/* <FileImageOutlined
              style={{
                cursor: "pointer",
                fontSize: "22px",
                color: "#858585",
                marginLeft: "13px",
              }}
            /> */}
              <div
                className=""
                style={{
                  cursor: "pointer",
                  fontSize: "22px",
                  marginLeft: "13px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="svg-icon svg-icon--send-img"
                  viewBox="0 0 45.7 45.7"
                  style={{ fill: "#858585" }}
                >
                  <path
                    d="M6.6,45.7A6.7,6.7,0,0,1,0,39.1V6.6A6.7,6.7,0,0,1,6.6,0H39.1a6.7,6.7,0,0,1,6.6,6.6V39.1h0a6.7,6.7,0,0,1-6.6,6.6ZM39,4H6.6A2.6,2.6,0,0,0,4,6.6V39.1a2.6,2.6,0,0,0,2.6,2.6H39.1a2.6,2.6,0,0,0,2.6-2.6V6.6A2.7,2.7,0,0,0,39,4Zm4.7,35.1Zm-4.6-.4H6.6a2.1,2.1,0,0,1-1.8-1.1,2,2,0,0,1,.3-2.1l8.1-10.4a1.8,1.8,0,0,1,1.5-.8,2.4,2.4,0,0,1,1.6.7l4.2,5.1,6.6-8.5a1.8,1.8,0,0,1,1.6-.8,1.8,1.8,0,0,1,1.5.8L40.7,35.5a2,2,0,0,1,.1,2.1A1.8,1.8,0,0,1,39.1,38.7Zm-17.2-4H35.1l-6.5-8.6-6.5,8.4C22,34.6,22,34.7,21.9,34.7Zm-11.2,0H19l-4.2-5.1Z"
                    fill="#f68b3c"
                  />
                </svg>
              </div>
            </Upload>
          </div>
          <div className="custom-form__send-wrapper">
            <InputEmoji
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Type a message"
              className="form-control custom-form"
            />
          </div>
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
            onClick={handleOnEnter}
          />
        </div>
      ) : (
        <div className="chat__send-container px-2 px-md-3 pt-1 pt-md-3 justify-content-center">
          <p className="text-center">Please Select Seller From List!</p>
        </div>
      )}
    </>
  );
};

export default ChatSendMessageBox;
