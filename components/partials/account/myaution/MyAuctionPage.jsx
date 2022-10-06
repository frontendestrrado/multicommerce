import React, { useEffect } from "react";
import AccountMenuSidebar from "../modules/AccountMenuSidebar";
import { Empty, Select } from "antd";
import AuctionDetail from "./module/AuctionDetail";
import { useDispatch, useSelector } from "react-redux";
import { getAuctionOrderList } from "~/store/account/action";
import { getDeviceId, makePageUrl, osType } from "~/utilities/common-helpers";
import { useRouter } from "next/router";

const { Option } = Select;

const MyAuctionPage = () => {
  const { auction_order_list } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const Router = useRouter();
  const { access_token } = useSelector((state) => state.auth);

  useEffect(() => {
    let payload = {
      access_token,
      lang_id: 1,
      device_id: getDeviceId,
      page_url: makePageUrl(Router.asPath),
      os_type: osType(),
      status: "",
    };

    access_token && dispatch(getAuctionOrderList(payload));
  }, [access_token]);

  function handleSelectAuctionTypeChange(value) {
    let payload = {
      access_token,
      lang_id: 1,
      device_id: getDeviceId,
      page_url: makePageUrl(Router.asPath),
      os_type: osType(),
      status: value,
    };

    access_token && dispatch(getAuctionOrderList(payload));
  }

  return (
    <section
      className="ps-my-account ps-page--account"
      style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-section__left">
              <AccountMenuSidebar activeModule="MyAuction" />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="ps-page__content">
              <div className="ps-section--account-setting">
                <div className="ps-section__content">
                  <figure className="ps-block--address">
                    <figcaption>
                      My Auction
                      <div className="float-right">
                        <div className="">
                          <Select
                            defaultValue=""
                            className="account-auction__dropdown"
                            onChange={handleSelectAuctionTypeChange}
                          >
                            <Option value="">View All</Option>
                            <Option value="inprogress">
                              Auction Inprogress
                            </Option>
                            <Option value="winned">Winned</Option>
                            <Option value="rejected">Closed</Option>
                            <Option value="refunded">Refunded</Option>
                            <Option value="refund_initiated">
                              Refund Initiated
                            </Option>
                            <Option value="refund_rejected">
                              Refund Rejected
                            </Option>
                          </Select>
                        </div>
                      </div>
                    </figcaption>
                    <div className="ps-block__content">
                      {auction_order_list?.length > 0 ? (
                        <AuctionDetail
                          auction_order_list={auction_order_list}
                        />
                      ) : (
                        <Empty description={<span>No Auction Found!</span>} />
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

export default MyAuctionPage;
