import React from "react";
import AddressModal from "./modal/AddressModal";
import { LocationOn } from "@material-ui/icons";

const DisplayAddAddress = () => {
  return (
    <div>
      <div className="p-2 float-right">
        <AddressModal />
      </div>
      <p className="text-danger " style={{ fontSize: "18px" }}>
        <LocationOn fontSize="large" /> Delivery Address
      </p>
      <div> No default address found. Please add address!</div>
    </div>
  );
};

export default DisplayAddAddress;
