import React from "react";

const DisplayVoucher = () => {
  return (
    <div className="cart-header" style={{ display: "block", color: "#ff0000" }}>
      <div className="float-left mt-3">
        <i className="icon-ticket" style={{ fontSize: "20px" }}></i>

        <span style={{ fontSize: "18px" }}> Kangtao Voucher</span>
      </div>
      <div className="float-right mt-4">Select voucher</div>
    </div>
  );
};

export default DisplayVoucher;
