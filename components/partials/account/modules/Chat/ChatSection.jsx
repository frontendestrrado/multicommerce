import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerChatList } from "~/store/account/action";
import ChatLeftSection from "./ChatModules/ChatLeftSection";
import ChatRightSection from "./ChatModules/ChatRightSection";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const ChatSection = () => {
  const auth = useSelector((state) => state.auth);

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
        chat.classList.add("chat--mobile");
        // $chat.addClass("chat--mobile");
      }

      function chatDesktop() {
        // setClassChange(null);

        chat.classList.remove("chat--mobile");
        // $chat.removeClass("chat--mobile");
      }
      /* ===================================
			Events
		====================================== */
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.access_token) {
      var getChatList = new FormData();
      getChatList.append("access_token", auth.access_token);
      const intervalID = setInterval(
        () => dispatch(getCustomerChatList(getChatList)),
        120000
      );
      return () => clearInterval(intervalID);
    }
  }, [auth.access_token]);

  return (
    <div className="ps-container">
      <div className="row">
        <div className="col-lg-12">
          <div className="home-page__content messages-page">
            <div className="container-fluid h-100">
              <div className="row px-0 h-100">
                {/* start message list section  */}

                <ChatLeftSection />

                {/* end message list section */}

                {/* start content section  */}

                <ChatRightSection />

                {/* end content section  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
