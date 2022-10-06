import React, { useEffect, useState } from "react";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import AddressList from "./modules/AddressList";
import { getCustomerAddress } from "~/store/account/action";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

const Addresses = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = auth.access_token;

  useEffect(() => {
    dispatch(getCustomerAddress());
  }, []);

  return (
    <section
      className="ps-my-account ps-page--account"
      style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-section__left">
              <AccountMenuSidebar activeModule="Addresses" />
            </div>
          </div>
          <div className="col-lg-9">
            <div className="ps-page__content">
              <div className="ps-section--account-setting">
                <div className="ps-section__content">
                  <figure className="ps-block--address">
                    <figcaption>
                      Billing address
                      <div className="float-right">
                        <Link href="/account/address/new-address">
                          <Button type="primary" danger>
                            Add Address
                          </Button>
                        </Link>
                      </div>
                    </figcaption>
                    <div className="ps-block__content">
                      <AddressList />
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

export default Addresses;
