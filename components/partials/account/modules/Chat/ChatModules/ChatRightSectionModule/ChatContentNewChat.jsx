import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerChatMessage,
  setCustomerChatId,
} from "~/store/account/action";
import ChatSendMessageBox from "./ChatSendMessageBox";
const ChatContentNewChat = () => {
  const { selectedChatID, customer_messages, customer_chat } = useSelector(
    (state) => state.account
  );
  const { access_token } = useSelector((state) => state.auth);

  return (
    <>
      <div className="chat__content pt-4 px-3">
        <ul className="chat__list-messages">
          <li>
            <div
              className=""
              style={{
                fontSize: "1.8rem",
                alignSelf: "center",
                color: "#b3b3b3",
              }}
            >
              No chat to display
            </div>
            {/* <div className="chat__bubble chat__bubble--you">
              No chat to display
            </div> */}
          </li>
        </ul>
      </div>
      <ChatSendMessageBox />
    </>
  );
};

export default ChatContentNewChat;
