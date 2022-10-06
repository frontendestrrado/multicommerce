import { Empty } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import SkeletonWallet from "~/components/elements/skeletons/SkeletonWallet";
import { generateTempArray } from "~/utilities/common-helpers";
import {
  currencyHelperConvertToRinggit,
  priceHelper,
} from "~/utilities/product-helper";

export const WalletDetails = () => {
  const { wallet_details } = useSelector((state) => state.account);

  const skeletons = generateTempArray(6).map((item) => (
    <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
      <SkeletonWallet />
    </div>
  ));

  return (
    <div className="ps-container">
      <div className="row">
        {/* <div className="col-lg-3"></div> */}
        <div className="col-lg-12" style={{ background: "#fff" }}>
          <div className="row">
            <div className="col-md-12">
              <div className="curnt">Current Balance</div>
              <div className="rnckm">
                {currencyHelperConvertToRinggit(
                  wallet_details?.total_balance || 0
                )}
              </div>
            </div>
          </div>

          <hr />

          <div
            className="col-md-12"
            style={{ height: "60rem", overflowY: "scroll" }}
          >
            {wallet_details?.wallet?.length > 0 ? (
              wallet_details.wallet.map((wallet_data, index) => {
                return (
                  <div className="row mb-3" key={index}>
                    <div className="col-md-1">
                      <div className="icn">
                        <i
                          className={`fa ${
                            priceHelper(wallet_data.credit) > 0
                              ? "fa-plus"
                              : "fa-minus"
                          }`}
                          aria-hidden="true"
                        ></i>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="stat">
                        {priceHelper(wallet_data.credit) > 0
                          ? "Received"
                          : "Paid"}
                      </div>
                      <div className="statdet">
                        {priceHelper(wallet_data.credit) > 0 ? (
                          <>
                            <span className="mr-2">{wallet_data.source}</span>
                            {moment(wallet_data.created_at).format(
                              "DD MMM YYYY"
                            )}
                          </>
                        ) : (
                          <>
                            {wallet_data.source}&nbsp;
                            {moment(wallet_data.created_at).format(
                              "DD MMM YYYY"
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-md-5">
                      <div className="walamt">
                        {priceHelper(wallet_data.credit) > 0 ? (
                          <>
                            <span>
                              {currencyHelperConvertToRinggit(
                                wallet_data.credit
                              )}
                            </span>
                          </>
                        ) : (
                          <>
                            {currencyHelperConvertToRinggit(wallet_data.debit)}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12" style={{ minHeight: "50rem" }}>
                <Empty description={<span>Wallet Record Empty!</span>} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
