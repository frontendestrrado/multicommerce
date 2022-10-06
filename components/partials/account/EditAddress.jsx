import React, { Component, useEffect, useState } from "react";
import Link from "next/link";
import FormEditAddress from "./modules/FormEditAddress";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import { connect, useDispatch, useSelector } from "react-redux";
import { Spin, notification } from "antd";
import { useRouter } from "next/router";

const EditAddress = ({ formHeader = "", pid = "" }) => {
  const router = useRouter();

  const auth = useSelector((state) => state.auth);
  const token = auth.access_token;
  const { customer_address } = useSelector((state) => state.account);
  // const [selectedAddress, setSelectedAddress] = useState({});
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
  }, [token]);
  let selectedAddress = [];
  if (customer_address.length > 0) {
    selectedAddress = customer_address?.filter((address) => {
      return address.id == pid;
    });
  }

  const renderForm = (address) => {
    if (address.length > 0) {
      return <FormEditAddress selectedAddress={address} />;
    }
    if (address.length == 0) {
      return <FormEditAddress selectedAddress={[]} />;
    }

    return <Spin />;
  };

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
                  <div className="ps-form__header ">
                    <h3>{formHeader}</h3>
                  </div>
                  {renderForm(selectedAddress)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditAddress;
