import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerChatMessage } from "~/store/account/action";
import { useRouter } from "next/router";

const ChatHeading = () => {
  const { selectedChatID, customer_messages, customer_chat } = useSelector(
    (state) => state.account
  );
  const { access_token } = useSelector((state) => state.auth);

  const [unreadChatCount, setUnreadChatCount] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedChatID) {
      var getChatMessage = new FormData();
      getChatMessage.append("access_token", access_token);
      getChatMessage.append("chat_id", selectedChatID);
      dispatch(getCustomerChatMessage(getChatMessage));
    }
  }, [selectedChatID]);

  useEffect(() => {
    if (customer_chat && customer_chat.length > 0) {
      setUnreadChatCount(
        customer_chat.reduce((prev, next) => {
          return prev + next.unread_msg;
        }, 0)
      );
    }
  }, [customer_chat]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      var chat = document.querySelector(".chat");
      var prev = document.querySelector(".chat__previous");

      prev?.addEventListener(
        "click",
        function () {
          chat.classList.remove("chat--show");
        },
        false
      );
    }

    return () => {
      prev?.removeEventListener(
        "click",
        function () {
          chat.classList.remove("chat--show");
        },
        false
      );
    };
  }, []);

  const Router = useRouter();

  return (
    <>
      {customer_messages?.chat_id ? (
        <div className="chat__messaging messaging-member--online pb-2 pb-md-2 pl-2 pl-md-4 pr-2">
          <div className="chat__previous d-flex d-md-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-icon svg-icon--previous"
              viewBox="0 0 45.5 30.4"
            >
              <path
                d="M43.5,13.1H7l9.7-9.6A2.1,2.1,0,1,0,13.8.6L.9,13.5h0L.3,14v.6c0,.1-.1.1-.1.2v.4a2,2,0,0,0,.6,1.5l.3.3L13.8,29.8a2.1,2.1,0,1,0,2.9-2.9L7,17.2H43.5a2,2,0,0,0,2-2A2.1,2.1,0,0,0,43.5,13.1Z"
                fill="#f68b3c"
              />
            </svg>
          </div>
          <div className="chat__notification d-flex d-md-none chat__notification--new">
            <span>{unreadChatCount}</span>
          </div>
          <div className="chat__infos pl-2 pl-md-0">
            <div className="chat-member__wrapper" data-online="true">
              <div className="chat-member__avatar">
                <img
                  src={
                    customer_messages.logo ||
                    "https://randomuser.me/api/portraits/thumb/women/56.jpg"
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://randomuser.me/api/portraits/thumb/women/56.jpg";
                  }}
                  alt={customer_messages.store_name}
                  loading="lazy"
                />
                <div className="user-status user-status--large"></div>
              </div>
              <div className="chat-member__details flex-grow-1 w-75">
                <span className="chat-member__name">
                  {customer_messages.store_name}
                </span>
                <span className="chat-member__status">Online</span>
              </div>
              <div
                className="flex-fill"
                style={{
                  color: "#dc3545",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={() =>
                  Router.push(`/seller/${customer_messages.seller_id}`)
                }
              >
                Visit Store
              </div>
            </div>
          </div>
        </div>
      ) : (
        "Not Selected"
      )}
    </>
  );
};

export default ChatHeading;
