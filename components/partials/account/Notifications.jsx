import { Empty, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserNotifications } from "~/store/account/action";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import NotificationList from "./notifications/NotificationList";
const Notifications = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { user_notifications } = useSelector((state) => state.account);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    console.log("...user_notifications..",user_notifications)
    setLoading(true);
    access_token &&
      dispatch(getUserNotifications({ access_token: access_token }));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [access_token]);

  return (
    <>
      <section
        className="ps-my-account ps-page--account"
        style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="ps-section__left">
                <AccountMenuSidebar activeModule="Notifications" />
              </div>
            </div>

            <div className="col-lg-9">
              <div className="ps-page__content">
                <div className="ps-section--account-setting">
                  <div className="ps-section__content">
                    <figure className="ps-block--address">
                      <figcaption>
                        Notifications
                        <div className="float-right"></div>
                      </figcaption>
                      <Spin spinning={loading}>
                        <div className="ps-block__content">
                          {user_notifications.length > 0 ? (
                            <NotificationList />
                          ) : (
                            <div
                              className="col-12"
                              style={{ minHeight: "50rem" }}
                            >
                              <Empty
                                description={
                                  <span>No Notification found!</span>
                                }
                              />
                            </div>
                          )}
                        </div>
                      </Spin>
                    </figure>
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
export default Notifications;
