import React from "react";

const NotificationListData = ({ dataItem }) => {
  return (
    <>
      {/* <div className="col-md-2"></div> */}
      <div className="col-12 row border-bottom mt-4">
        <div className="col-md-10">
          <div className="notih">
            <h6>{dataItem.title}</h6>
            <p className="mb-1" style={{ color: "rgba(0,0,0,.54)" }}>
              {dataItem.description}
            </p>
            {/* <p style={{ color: "rgba(0,0,0,.54)" }}>{dataItem.created_at}</p> */}
          </div>
        </div>
        <div className="col-md-2">
          {/* <button className="viwbtn mt-2">View Details</button> */}
          <p style={{ color: "rgba(0,0,0,.54)" }}>{dataItem.created_at}</p>
        </div>
      </div>
    </>
  );
};

export default NotificationListData;
