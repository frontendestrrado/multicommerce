import React, { useEffect, useState } from "react";
import AccountMenuSidebar from "../modules/AccountMenuSidebar";
import { WalletDetails } from "./module/WalletDetails";
import { Select, Spin } from "antd";
import { useDispatch } from "react-redux";
import { getWalletDetails } from "~/store/account/action";
import { useSelector } from "react-redux";
const { Option } = Select;

const WalletPage = () => {
  const { access_token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const dispatchEventsFromWalletPage = (value = null) => {
    let payload = {
      access_token,
      // start_date: null,
      // end_date: null,
      // search: null,
      filter: value || "",
    };
    setLoading(true);
    dispatch(getWalletDetails(payload));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      access_token && dispatchEventsFromWalletPage();
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [access_token]);

  return (
    <section
      className="ps-my-account ps-page--account"
      style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-section__left">
              <AccountMenuSidebar activeModule="MyWallet" />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="ps-page__content">
              <div className="ps-section--account-setting">
                <div className="ps-section__content">
                  <figure className="ps-block--address">
                    <figcaption>
                      Wallet
                      <div className="float-right">
                        <div className="">
                          <Select
                            defaultValue="all"
                            style={{ width: 150 }}
                            onChange={dispatchEventsFromWalletPage}
                          >
                            <Option value="">All Transaction</Option>
                            <Option value="paid">Paid</Option>
                            <Option value="refund">Refund</Option>
                            <Option value="reward">Reward</Option>
                          </Select>
                        </div>
                      </div>
                    </figcaption>
                    <div className="ps-block__content">
                      <Spin spinning={loading}>
                        <WalletDetails />
                      </Spin>
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

export default WalletPage;
