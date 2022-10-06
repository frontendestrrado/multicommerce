import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWindowDimensions from "~/hooks/windowHooks";
import ChatContent from "./ChatRightSectionModule/ChatContent";
import ChatContentNewChat from "./ChatRightSectionModule/ChatContentNewChat";
import ChatHeading from "./ChatRightSectionModule/ChatHeading";
import ChatHeadingNewChat from "./ChatRightSectionModule/ChatHeadingNewChat";

const ChatRightSection = ({}) => {
  const { customer_chat, selectedSellerID } = useSelector(
    (state) => state.account
  );
  const { width, height } = useWindowDimensions();

  let seller_chat_data = null;
  let seller_chat_array = [];

  if (typeof window !== "undefined") {
    seller_chat_data = JSON.parse(localStorage.getItem("seller_chat_id"));

    if (selectedSellerID !== null || selectedSellerID !== undefined) {
      seller_chat_array = customer_chat?.filter(
        (chats) => chats.seller_id == selectedSellerID
      );
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      var chat = document.querySelector(".chat");
      chat.classList.add("chat--mobile");

      /* ===================================
			Screen resize handler
		====================================== */
      const smallDevice = window.matchMedia("(max-width: 767px)");
      const largeScreen = window.matchMedia("(max-width: 1199px)");
      smallDevice.addEventListener("change", handleDeviceChange);
      largeScreen.addEventListener("change", handleLargeScreenChange);

      handleDeviceChange(smallDevice);
      handleLargeScreenChange(largeScreen);

      function handleDeviceChange(e) {
        if (e.matches) chatMobile();
        else chatDesktop();
      }

      function handleLargeScreenChange(e) {
        // if (e.matches) profileToogleOnLarge();
        // else profileExtraLarge();
      }

      function chatMobile() {
        // setClassChange("chat--mobile");
        // chat.classList.add("chat--mobile");
        // $chat.addClass("chat--mobile");
      }

      function chatDesktop() {
        // setClassChange(null);
        // chat.classList.remove("chat--mobile");
        // $chat.removeClass("chat--mobile");
      }
      /* ===================================
			Events
		====================================== */
    }
  }, []);

  return (
    <div
      className={`chat col-12 col-md-8 col-lg-7 col-xl-8 px-0 pl-md-1
      ${width > 767 ? "" : "chat--mobile"}
      ${seller_chat_array.length > 0 ? `` : `chat--show`}`}
    >
      <div className="chat__container">
        <div className="chat__wrapper py-2 pt-mb-2 pb-md-3">
          {seller_chat_array.length > 0 ? (
            <>
              <ChatHeading />
              <ChatContent />
            </>
          ) : (
            <>
              <ChatHeadingNewChat seller_data={seller_chat_data} />
              <ChatContentNewChat seller_data={seller_chat_data} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRightSection;
