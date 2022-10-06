import React, { useState, useEffect, useRef } from "react";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getCustomerChatList,
  setChatSellerId,
  setCustomerChatId,
} from "~/store/account/action";
const ChatLeftSection = () => {
  const auth = useSelector((state) => state.auth);
  const { customer_chat, selectedChatID, selectedSellerID } = useSelector(
    (state) => state.account
  );
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      var chat = window.document.querySelector(".chat");
      var msg_member = window.document.querySelector(".messaging-member");

      msg_member?.addEventListener(
        "click",
        function () {
          chat.classList.add("chat--show");
        },
        false
      );
    }
  }, []);

  const onChatClick = (chat) => {
    localStorage.setItem(
      "seller_chat_id",
      JSON.stringify({
        seller_chat_id: chat?.chat_id,
        seller_id: chat?.seller_id,
        store_name: chat?.store_name,
      })
    );
    dispatch(setCustomerChatId(chat?.chat_id));
    dispatch(setChatSellerId(chat?.seller_id));

    var chat = window.document.querySelector(".chat");
    setTimeout(() => {
      chat?.classList.add("chat--show");
    }, 1000);
  };
  const renderChatMember = (chatMember) => {
    return chatMember.map((chat) => {
      return (
        <li
          className={`messaging-member
          ${chat.unread_msg > 0 ? `messaging-member--new` : ``}
          messaging-member--online
          ${
            chat.seller_id == selectedSellerID ? `messaging-member--active` : ``
          }`}
          key={chat?.chat_id}
          onClick={() => onChatClick(chat)}
        >
          <div className="messaging-member__wrapper">
            <div className="messaging-member__avatar d-flex justify-content-center">
              <img
                src={
                  chat.logo ||
                  "https://randomuser.me/api/portraits/thumb/women/56.jpg"
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://randomuser.me/api/portraits/thumb/women/56.jpg";
                }}
                loading="lazy"
              />
              <div className="user-status"></div>
            </div>

            <span className="messaging-member__name">{chat.store_name}</span>
            {/* <span className="messaging-member__message">
            Yes, I need your help with the project, it need it done by
            tomorrow 😫
          </span> */}
            <span className="messaging-member__message">
              {chat.unread_msg > 0 ? `${chat.unread_msg}` : "No Unread Message"}
            </span>
          </div>
        </li>
      );
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    var getChatList = new FormData();
    getChatList.append("access_token", auth.access_token);
    if (auth.access_token) {
      dispatch(getCustomerChatList(getChatList));
    }
  }, [auth.access_token]);

  return (
    <div
      className="col-12 col-md-4 col-lg-5 col-xl-4 px-0 messages-page__list-scroll"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="messages-page__search mb-0 px-3 pb-3 pt-3">
        <div className="custom-form__search-wrapper">
          <input
            type="text"
            className="form-control custom-form"
            id="search"
            placeholder="Search Store..."
            autoComplete="off"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
          <button type="submit" className="custom-form__search-submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="svg-icon svg-icon--search"
              viewBox="0 0 46.6 46.6"
              style={{ width: "75%" }}
            >
              <path
                d="M46.1,43.2l-9-8.9a20.9,20.9,0,1,0-2.8,2.8l8.9,9a1.9,1.9,0,0,0,1.4.5,2,2,0,0,0,1.5-.5A2.3,2.3,0,0,0,46.1,43.2ZM4,21a17,17,0,1,1,33.9,0A17.1,17.1,0,0,1,33,32.9h-.1A17,17,0,0,1,4,21Z"
                fill="#f68b3c"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* <LeftSectionMember /> */}

      <ul className="messages-page__list pb-5 px-1 px-md-3">
        {customer_chat && customer_chat.length > 0 ? (
          <>
            {renderChatMember(
              customer_chat.filter((value) => {
                if (searchTerm === "") {
                  return value;
                } else if (
                  value.store_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return value;
                }
                return null;
              })
            )}
          </>
        ) : (
          "No Chats Found"
        )}
        {/* <li className="messaging-member messaging-member--new messaging-member--online">
        <div className="messaging-member__wrapper">
          <div className="messaging-member__avatar">
            <img
              src="https://randomuser.me/api/portraits/thumb/men/74.jpg"
              alt="Bessie Cooper"
              loading="lazy"
            />
            <div className="user-status"></div>
          </div>

          <span className="messaging-member__name">Bessie Cooper</span>
          <span className="messaging-member__message">
            Yes, I need your help with the project, it need it done by tomorrow
            😫
          </span>
        </div>
      </li>
      <li className="messaging-member messaging-member--online messaging-member--active">
        <div className="messaging-member__wrapper">
          <div className="messaging-member__avatar">
            <img
              src="https://randomuser.me/api/portraits/thumb/women/56.jpg"
              alt="Jenny Smith"
              loading="lazy"
            />
            <div className="user-status"></div>
          </div>

          <span className="messaging-member__name">Jenny Smith</span>
          <span className="messaging-member__message">Perfect, thanks !</span>
        </div>
      </li>
      <li className="messaging-member">
        <div className="messaging-member__wrapper">
          <div className="messaging-member__avatar">
            <img
              src="https://randomuser.me/api/portraits/thumb/women/17.jpg"
              alt="Courtney Simmons"
              loading="lazy"
            />
            <div className="user-status"></div>
          </div>

          <span className="messaging-member__name">Courtney Simmons</span>
          <span className="messaging-member__message">
            Going home soon, don't worry
          </span>
        </div>
      </li>
      <li className="messaging-member messaging-member--online">
        <div className="messaging-member__wrapper">
          <div className="messaging-member__avatar">
            <img
              src="https://randomuser.me/api/portraits/thumb/women/39.jpg"
              alt="Martha Curtis"
              loading="lazy"
            />
            <div className="user-status"></div>
          </div>

          <span className="messaging-member__name">Martha Curtis</span>
          <span className="messaging-member__message">Great 😂</span>
        </div>
      </li>
      <li className="messaging-member messaging-member--online">
        <div className="messaging-member__wrapper">
          <div className="messaging-member__avatar">
            <img
              src="https://randomuser.me/api/portraits/thumb/men/27.jpg"
              alt="Rozie Tucker"
              loading="lazy"
            />
            <div className="user-status"></div>
          </div>

          <span className="messaging-member__name">Gab Ryan</span>
          <span className="messaging-member__message">
            Sure, may I get your phone number? 😃
          </span>
        </div>
      </li>
      <li className="messaging-member">
        <div className="messaging-member__wrapper">
          <div className="messaging-member__avatar">
            <img
              src="https://randomuser.me/api/portraits/thumb/men/17.jpg"
              alt="Jules Zimmermann"
              loading="lazy"
            />
            <div className="user-status"></div>
          </div>

          <span className="messaging-member__name">Jules Zimmermann</span>
          <span className="messaging-member__message">
            Well, here I am, coming as faaast as I can !
          </span>
        </div>
      </li>
      <li className="messaging-member">
        <div className="messaging-member__wrapper">
          <div className="messaging-member__avatar">
            <img
              src="https://randomuser.me/api/portraits/thumb/men/9.jpg"
              alt="Mark Reid"
              loading="lazy"
            />
            <div className="user-status"></div>
          </div>

          <span className="messaging-member__name">Mark Reid</span>
          <span className="messaging-member__message">
            Have you listened to the latest album? Pure perfection
          </span>
        </div>
      </li>
      <li className="messaging-member  messaging-member--online">
        <div className="messaging-member__wrapper">
          <div className="messaging-member__avatar">
            <img
              src="https://randomuser.me/api/portraits/thumb/men/54.jpg"
              alt="Russell Williams"
              loading="lazy"
            />
            <div className="user-status"></div>
          </div>

          <span className="messaging-member__name">Russell Williams</span>
          <span className="messaging-member__message">
            Nice to meet you again{" "}
          </span>
        </div>
      </li>
      <li className="messaging-member">
        <div className="messaging-member__wrapper">
          <div className="messaging-member__avatar">
            <img
              src="https://randomuser.me/api/portraits/thumb/women/85.jpg"
              alt="Savannah Nguyen"
              loading="lazy"
            />
            <div className="user-status"></div>
          </div>

          <span className="messaging-member__name">Savannah Nguyen</span>
          <span className="messaging-member__message">Really ?!</span>
        </div>
      </li> */}
      </ul>
    </div>
  );
};

export default ChatLeftSection;
