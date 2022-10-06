import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getCustomerChatList, setCustomerChatId } from "~/store/account/action";

const LeftSectionMember = () => {
  const auth = useSelector((state) => state.auth);
  const { customer_chat } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  useEffect(() => {
    var getChatList = new FormData();
    getChatList.append("access_token", auth.access_token);
    if (auth.access_token) {
      dispatch(getCustomerChatList(getChatList));
    }
  }, [auth.access_token]);

  return (
    <ul className="messages-page__list pb-5 px-1 px-md-3">
      {customer_chat && customer_chat.length > 1 ? (
        <>
          {customer_chat.map((chat) => {
            return (
              <li
                className="messaging-member messaging-member--new messaging-member--online"
                key={chat.chat_id}
                onClick={() => dispatch(setCustomerChatId(chat.chat_id))}
              >
                <div className="messaging-member__wrapper">
                  <div className="messaging-member__avatar">
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

                  <span className="messaging-member__name">
                    {chat.store_name}
                  </span>
                  {/* <span className="messaging-member__message">
                    Yes, I need your help with the project, it need it done by
                    tomorrow 😫
                  </span> */}
                </div>
              </li>
            );
          })}
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
  );
};

export default LeftSectionMember;
