import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import TableInvoices from "./modules/TableInvoices";
import {
  getCustomerProfile,
  getMyOrders,
  getMyPurchase,
} from "~/store/account/action";
import { Empty } from "antd";

const Invoices = () => {
  const auth = useSelector((state) => state.auth);
  const token = auth.access_token;
  const { customer_profile } = useSelector((state) => state.account);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userdata = localStorage.getItem("user");

    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      router.push("/");
    }

    if (token) {
      const payload = { access_token: token };

      const handler = setTimeout(() => {
        dispatch(getCustomerProfile(payload));
        dispatch(getMyOrders(payload));
        setLoading(false);
      }, 250);

      return () => {
        clearTimeout(handler);
      };
    }
  }, [token]);

  let { profile_image } = customer_profile;
  const router = useRouter();

  const dispatch = useDispatch();

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
                <AccountMenuSidebar activeModule="Invoices" />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="ps-page__content">
                <div className="ps-section--account-setting">
                  <div className="ps-section__content">
                    <div className="ps-section__header">
                      <h3>Invoices</h3>
                    </div>
                    {!loading ? <TableInvoices /> : <Empty />}
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

export default Invoices;
