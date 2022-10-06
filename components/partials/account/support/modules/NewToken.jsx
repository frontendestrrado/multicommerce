import { useRouter } from "next/router";
import React from "react";
import CreateTokenModal from "./Modal/CreateTokenModal";

const NewToken = ({ showListDetail }) => {
  const router = useRouter();
  return (
    <div className="ps-container">
      <div className="row">
        {/* <div className="col-lg-3"></div> */}
        <div className="col-lg-12" style={{ background: "#fff" }}>
          <div className="row">
            <div className="col-md-12">
              <div className="newto">
                <h5 className="text-center">No Chats Found</h5>
                <p className="text-center">You currently have no chats</p>
                <CreateTokenModal showListDetail={showListDetail} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewToken;
