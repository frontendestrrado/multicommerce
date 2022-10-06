import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ChatHeadingNewChat = ({ seller_data }) => {
  const { customer_chat } = useSelector((state) => state.account);
  const [unreadChatCount, setUnreadChatCount] = useState(0);

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
        <span>1</span>
      </div>
      <div className="chat__infos pl-2 pl-md-0">
        <div className="chat-member__wrapper" data-online="true">
          {seller_data?.store_name ? (
            <div className="chat-member__avatar">
              <img
                src={
                  seller_data?.store_logo ||
                  "https://randomuser.me/api/portraits/thumb/women/56.jpg"
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://randomuser.me/api/portraits/thumb/women/56.jpg";
                }}
                loading="lazy"
              />
              <div className="user-status user-status--large"></div>
            </div>
          ) : null}
          <div className="chat-member__details flex-grow-1 w-75">
            <span className="chat-member__name" suppressHydrationWarning>
              {seller_data?.store_name}
            </span>
            <span className="chat-member__status">
              {seller_data?.store_name ? "Online" : ""}
            </span>
          </div>
          {seller_data?.store_name ? (
            <div
              className="flex-fill"
              style={{
                color: "#dc3545",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={() => Router.push(`/seller/${seller_data?.seller_id}`)}
            >
              Visit Store
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ChatHeadingNewChat;
