import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSupportMessagefromSupportId } from "~/store/account/action";
import AccountMenuSidebar from "../modules/AccountMenuSidebar";
import SupportChatView from "./modules/SupportChatView";

const SupportChat = ({ pid }) => {
  const Router = useRouter();
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  useEffect(() => {
    let payload = {
      access_token,
      support_id: pid,
    };
    dispatch(getSupportMessagefromSupportId(payload));
    const handler = setInterval(
      () => dispatch(getSupportMessagefromSupportId(payload)),
      120000
    );
    return () => {
      clearInterval(handler);
    };
  }, [access_token, pid]);

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
                      <div className="d-flex flex-row-reverse mb-5">
                        <h5
                          style={{ color: "#ff0000", cursor: "pointer" }}
                          onClick={() => Router.back()}
                        >
                          Back
                        </h5>
                      </div>
                      <SupportChatView support_id={pid} />
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

export default SupportChat;
