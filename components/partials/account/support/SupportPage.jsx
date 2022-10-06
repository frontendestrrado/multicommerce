import React, { useState } from "react";
import { useSelector } from "react-redux";
import AccountMenuSidebar from "../modules/AccountMenuSidebar";
import NewToken from "./modules/NewToken";
import TokenList from "./modules/TokenList";

const SupportPage = () => {
  const { support_token_list } = useSelector((state) => state.account);
  return (
    <section
      className="ps-my-account ps-page--account"
      style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-section__left">
              <AccountMenuSidebar activeModule="MySupport" />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="ps-page__content">
              <div className="ps-section--account-setting">
                <div className="ps-section__content">
                  <figure className="ps-block--address">
                    <figcaption>
                      Support
                      <div className="float-right"></div>
                    </figcaption>
                    <div className="ps-block__content">
                      {support_token_list?.length > 0 ? (
                        <TokenList supportTokenList={support_token_list} />
                      ) : (
                        <NewToken />
                      )}
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportPage;
