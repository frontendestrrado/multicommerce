import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductRepository from "~/repositories/ProductRepository";
import { notification, Radio } from "antd";
import { useSelector } from "react-redux";
import Router from "next/router";
import {
  currencyHelperConvertToRinggit,
  subCurrency,
} from "~/utilities/product-helper";
import DisplayPlaceOrderDetails from "./modules/DisplayPlaceOrderDetails";
import { useDispatch } from "react-redux";
import { selectedPaymentOption } from "~/store/cart/action";

const DisplayCartFooter = ({ cartdata }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    payment_type: 1,
  });

  const getCheckoutInfo = async (payload) => {
    const response = await ProductRepository.getCheckoutInfo(payload);
    if (response.httpcode == 200) {
      setPaymentMethods(response.data.payment_methods);
      return true;
    } else {
      notification["error"]({
        message: "Error",
        description: "Error while fetching checkout info",
        duration: 1,
      });
      return false;
    }
  };

  const { total_discount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let token = parsedata?.access_token;

    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      Router.push("/");
    } else {
      getCheckoutInfo({ access_token: token });
      dispatch(
        selectedPaymentOption({
          payment_type: 1,
        })
      );
    }
  }, [cartdata.grand_total]);

  const setMethod = (e) => {
    setSelectedPaymentMethod({
      payment_type: e.target.value,
    });
    dispatch(
      selectedPaymentOption({
        payment_type: e.target.value,
      })
    );

    return false;
  };
  // let methods = [
  //   { title: "hello1", id: 1 },
  //   { title: "hello2", id: 2 },
  //   { title: "hello2 ajsdhjhkjjkhhas", id: 4 },
  // ];
  const paymentOption = paymentMethods.map((method) => {
    return { label: method.title, value: method.id };
  });

  return (
    <>
      <div className="cart-header mt-2" style={{ color: "#ff0000" }}>
        <div className="float-left mt-3" style={{ marginRight: "15px" }}>
          <span style={{ fontSize: "18px" }}>Payment Method: </span>
        </div>
        <div className="d-flex mt-4 mb-3">
          <Radio.Group
            options={paymentOption}
            onChange={setMethod}
            value={selectedPaymentMethod.payment_type}
            optionType="button"
          />
        </div>
      </div>
      <div className="crt-ftr" style={{ marginTop: "0px" }}>
        <div className="vou-brdr"></div>
        {cartdata.delivery_charge && (
          <>
            <div className="coin-bal">
              <div className="totl-price p-2">
                <div className="insuf">Shipping Charge</div>
              </div>
            </div>
            <div className="coin-coun">
              {currencyHelperConvertToRinggit(cartdata.delivery_charge)}
            </div>
          </>
        )}

        {cartdata.package_charge && (
          <>
            <div className="coin-bal">
              <div className="totl-price p-2">
                <div className="insuf">Package Charge</div>
              </div>
            </div>
            <div className="coin-coun">
              {currencyHelperConvertToRinggit(cartdata.package_charge)}
            </div>
          </>
        )}
        {cartdata.total_tax && (
          <>
            <div className="coin-bal">
              <div className="totl-price p-2">
                <div className="insuf">Tax</div>
              </div>
            </div>
            <div className="coin-coun">
              {currencyHelperConvertToRinggit(cartdata.total_tax)}
            </div>
          </>
        )}
        {/* <div className="vou-brdr"></div> */}
        <div className="vou-slct">
          <div className="slct-spc"></div>
          <div className="totl-itm">
            <div className="totl-prc">
              <div className="totl-price">
                <div className="ttl-itm">Total Payment:</div>

                <div className="ttl-prc mr-4">
                  {cartdata != null &&
                    currencyHelperConvertToRinggit(
                      subCurrency(cartdata.grand_total, total_discount)
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vou-slct">
          <div className="slct-spc"></div>
          <DisplayPlaceOrderDetails />
        </div>
      </div>
    </>
  );
};

export default DisplayCartFooter;
