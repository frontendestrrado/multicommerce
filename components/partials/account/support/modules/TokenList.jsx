import React from "react";
import CreateTokenModal from "./Modal/CreateTokenModal";
import Link from "next/link";

const TokenList = ({ supportTokenList }) => {
  return (
    <div className="ps-container">
      <div className="row">
        {/* <div className="col-lg-3"></div> */}
        <div className="col-lg-12" style={{ background: "#fff" }}>
          <div className="row">
            <div
              id="tokh"
              className="col-md-12"
              style={{ height: "60rem", overflowY: "scroll" }}
            >
              {supportTokenList.length > 0 && (
                <>
                  {supportTokenList.map((token, index) => (
                    <div className="card pt-2 pb-2 pr-2 pl-2 mb-3" key={index}>
                      <div className="row">
                        <div
                          className="col-md-2"
                          style={{ borderRight: "1px solid #b9b9b9" }}
                        >
                          <div className="todat">
                            {token.created_at.split(" ")[0]}
                          </div>
                          <div className="tomnt">{`${
                            token.created_at.split(" ")[1]
                          } ${token.created_at.split(" ")[2]}`}</div>
                        </div>
                        <div className="col-md-10">
                          <div className="tokcon">
                            <Link href={`/account/support/${token.support_id}`}>
                              <a>
                                <h6>{token.ticket_id}</h6>
                              </a>
                            </Link>
                            <Link href={`/account/support/${token.support_id}`}>
                              <a>
                                <p>{token.subject}</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <CreateTokenModal fromList={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenList;
