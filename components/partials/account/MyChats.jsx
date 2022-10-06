import React, { useEffect, useState } from "react";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import ChatSection from "./modules/Chat/ChatSection";

const MyChats = () => {
  return (
    <>
      <section
        className="ps-my-account ps-page--account"
        style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-3">
              <div className="ps-section__left">
                <AccountMenuSidebar activeModule="MyChats" />
              </div>
            </div>
            <div className="col-xl-9">
              <div className="ps-page__content">
                <div className="ps-section--account-setting">
                  <div className="ps-section__content">
                    <div className="ps-section__header">
                      <h3>Chats</h3>
                    </div>
                    <div
                      className="ps-section--shopping ps-shopping-cart"
                      style={{ paddingBottom: "14rem", paddingTop: "0px" }}
                    >
                      <ChatSection />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyChats;
