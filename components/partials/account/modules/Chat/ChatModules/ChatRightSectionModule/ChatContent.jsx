import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerChatMessage,
  setCustomerChatId,
  setChatSellerId,
} from "~/store/account/action";
import ChatSendMessageBox from "./ChatSendMessageBox";
const ChatContent = () => {
  const { selectedChatID, customer_messages, customer_chat, selectedSellerID } =
    useSelector((state) => state.account);
  const { access_token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedChatID && selectedChatID !== null) {
      var getChatMessage = new FormData();
      getChatMessage.append("access_token", access_token);
      getChatMessage.append("chat_id", selectedChatID);
      dispatch(getCustomerChatMessage(getChatMessage));
    } else {
      if (customer_chat && customer_chat.length > 0) {
        let chat_id = customer_chat[0].chat_id;

        let seller_chat_data = null;

        if (typeof window !== "undefined") {
          seller_chat_data = JSON.parse(localStorage.getItem("seller_chat_id"));
        }

        if (seller_chat_data && seller_chat_data !== null) {
          chat_id = customer_chat.filter(
            (chat) => chat.seller_id == seller_chat_data.seller_id
          )[0].chat_id;
          dispatch(setChatSellerId(seller_chat_data.seller_id));
        }

        dispatch(setCustomerChatId(chat_id));
      }
    }
  }, [selectedChatID]);

  return (
    <>
      <div className="chat__content pt-4 px-3">
        <ul className="chat__list-messages">
          {customer_messages && customer_messages?.messages?.length > 0
            ? customer_messages.messages.map((message, index) => {
                return (
                  <li key={index}>
                    <div className="chat__time">{message.created_at}</div>
                    <div
                      className={`${
                        message.from == "You"
                          ? "chat__bubble chat__bubble--me"
                          : "chat__bubble chat__bubble--you"
                      }`}
                    >
                      {message.message}
                      <div>
                        {message.image && (
                          <Image width={200} src={message.image} />
                        )}
                      </div>
                    </div>
                  </li>
                );
              })
            : "No chat to display"}
        </ul>
      </div>
      <ChatSendMessageBox />
    </>
  );
};

export default ChatContent;
