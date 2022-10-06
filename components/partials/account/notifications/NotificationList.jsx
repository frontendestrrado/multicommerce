import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NotificationListData from "./module/NotificationListData";

const NotificationList = () => {
  const { user_notifications } = useSelector((state) => state.account);
  const [notificationData, setNotificationData] = useState([]);
  useEffect(() => {
    let isMountedNotificationList = true;
    isMountedNotificationList && setNotificationData(user_notifications);
    return () => (isMountedNotificationList = false);
  }, []);
  return (
    <div
      className="ps-container"
      style={{ height: "60rem", overflowY: "scroll" }}
    >
      <div className="row">
        {/* <div className="col-lg-3"></div> */}
        <div className="col-lg-12" style={{ background: "#fff" }}>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {notificationData.length > 0
                  ? notificationData.map((data) => (
                      <NotificationListData dataItem={data} key={data.id} />
                    ))
                  : null}
              </div>
              {/* <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <div className="notih">
                    <h6>Your New User Vouchers are waiting</h6>
                    <p className="mb-1" style={{ color: "rgba(0,0,0,.54)" }}>
                      😊 Hi Joe, don't forget to use your NO MIN. SPEND Free
                      Shipping and RM18 OFF vouchers for your first purchase!
                      Hurry, use them now. 👉
                    </p>
                    <p style={{ color: "rgba(0,0,0,.54)" }}>30-09-2021 09:30</p>
                  </div>
                </div>
                <div className="col-md-2">
                  <button className="viwbtn mt-2">View Details</button>
                </div>
              </div> */}
              {/* <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <div className="notih">
                    <h6>Your New User Vouchers are waiting</h6>
                    <p className="mb-1" style={{ color: "rgba(0,0,0,.54)" }}>
                      😊 Hi Joe, don't forget to use your NO MIN. SPEND Free
                      Shipping and RM18 OFF vouchers for your first purchase!
                      Hurry, use them now. 👉
                    </p>
                    <p style={{ color: "rgba(0,0,0,.54)" }}>30-09-2021 09:30</p>
                  </div>
                </div>
                <div className="col-md-2">
                  <button className="viwbtn mt-2">View Details</button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationList;
