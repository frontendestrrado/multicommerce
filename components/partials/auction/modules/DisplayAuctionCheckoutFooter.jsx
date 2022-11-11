import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductRepository from "~/repositories/ProductRepository";
import { Button, Checkbox, notification, Radio } from "antd";
import { useSelector } from "react-redux";
import Router from "next/router";
import {
  addCurrency,
  currencyHelperConvertToRinggit,
  priceHelper,
  subCurrency,
} from "~/utilities/product-helper";
import { useDispatch } from "react-redux";
import { selectedPaymentOption } from "~/store/cart/action";
import { getDeviceId, makePageUrl, osType } from "~/utilities/common-helpers";
import { useRouter } from "next/router";

const DisplayAuctionCheckoutFooter = ({ auctiondata }) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const Router = useRouter();
  const { pid } = Router.query;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
    payment_type: 1,
  });

  const { user_details, isLoggedIn, access_token } = useSelector(
    (state) => state.auth
  );
  const { selectedAddress, selected_payment_option_by_user } = useSelector(
    (state) => state.cart
  );

  const [loading1, setloading1] = useState(false);

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
  }, [access_token]);

  const setMethod = (e) => {
    setSelectedPaymentMethod({
      payment_type: e.target.value,
    });
    dispatch(
      selectedPaymentOption({
        payment_type: e.target.value,
      })
    );

    return;
  };
  const paymentOption = paymentMethods.map((method) => {
    return { label: method.title, value: method.id };
  });

  const placeAuctionOrder = async () => {
    setloading1(true);

    let payload = {
      access_token,
      lang_id:localStorage.getItem("langId"),
      device_id: getDeviceId,
      page_url: makePageUrl(Router.asPath),
      os_type: osType(),
      auction_id: pid,
      address_id: selectedAddress.id,
      payment_type: selected_payment_option_by_user.payment_type,
      wallet_amount: 0,
      grand_total: grandTotal,
    };

    if (walletUsed) {
      payload.wallet_amount = auctiondata.wallet_total_amount;
    }

    const responseData = await ProductRepository.placeAuctionOrder(payload);
    if (responseData && responseData.httpcode == 200) {
      localStorage.setItem("auctionorder", responseData.data.order_id);
      notification["success"]({
        message: "Success",
        description: "Congrats, order successfully placed",
        duration: 1,
      });
      setTimeout(() => {
        setloading1(false);

        Router.push("/auction/auction_checkout/auction_thankyou");
      }, 500);
    } else {
      setTimeout(() => {
        setloading1(false);
      }, 500);
      notification["error"]({
        message: "Error",
        description: "something went wrong. please try again",
        duration: 1,
      });
    }
    setloading1(false);
    return;
  };

  // wallet code

  const [walletUsed, setWalletUsed] = useState(false);
  const [grandTotal, setGrandTotal] = useState();

  useEffect(() => {
    setGrandTotal(
      addCurrency(
        addCurrency(
          addCurrency(
            addCurrency(
              auctiondata?.Bidding_amount,
              auctiondata?.Bidding_commission
            ),
            auctiondata?.tax
          ),
          auctiondata?.delivery_charge
        ),
        auctiondata.package_charge
      )
    );
  }, [auctiondata?.Bidding_amount]);

  const handleUseWalletBalance = (e) => {
    if (e.target.checked) {
      setWalletUsed(e.target.checked);
      setGrandTotal(subCurrency(grandTotal, auctiondata.wallet_total_amount));
    } else {
      setWalletUsed(e.target.checked);
      setGrandTotal(addCurrency(grandTotal, auctiondata.wallet_total_amount));
    }
  };

  // walletcode end

  return (
    <>
      <div className="cart-header mt-2" style={{ color: "#ff0000" }}>
        <div className="float-left mt-3" style={{ marginRight: "15px" }}>
          <span style={{ fontSize: "18px" }}>Payment Method</span>
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
        {priceHelper(auctiondata.wallet_total_amount) > 0 ? (
          <>
            <div className="coin-bal">
              <div className="lft-spc">
                <Checkbox
                  onChange={handleUseWalletBalance}
                  checked={walletUsed}
                >
                  <div className="insuf">Use Coins Balance</div>
                </Checkbox>
              </div>
            </div>
            <div className="coin-coun">
              {currencyHelperConvertToRinggit(auctiondata.wallet_total_amount)}
            </div>
          </>
        ) : (
          <>
            <div className="coin-bal">
              <div className="lft-spc">
                <div className="insuf">Insufficient Coins Balance</div>
              </div>
            </div>
            <div className="coin-coun">
              {currencyHelperConvertToRinggit(auctiondata.wallet_total_amount)}
            </div>
          </>
        )}
        <div className="vou-brdr"></div>

        <div className="coin-bal">
          <div className="totl-price p-2">
            <div className="insuf">Shipping Charge</div>
          </div>
        </div>
        <div className="coin-coun">
          {currencyHelperConvertToRinggit(auctiondata.delivery_charge)}
        </div>

        <div className="coin-bal">
          <div className="totl-price p-2">
            <div className="insuf">Package Charge</div>
          </div>
        </div>
        <div className="coin-coun">
          {currencyHelperConvertToRinggit(auctiondata.package_charge)}
        </div>
        <div className="coin-bal">
          <div className="totl-price p-2">
            <div className="insuf">Tax</div>
          </div>
        </div>
        <div className="coin-coun">
          {currencyHelperConvertToRinggit(auctiondata.tax)}
        </div>
        <div className="vou-brdr"></div>

        <div className="vou-slct">
          <div className="slct-spc"></div>
          <div className="totl-itm">
            <div className="totl-prc">
              <div className="totl-price">
                <div className="ttl-itm">Total Payment:</div>

                <div className="ttl-prc mr-4">
                  {currencyHelperConvertToRinggit(grandTotal)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vou-slct">
          <div className="slct-spc"></div>
          <div className="totl-itm">
            <div className="totl-prc">
              <div className="totl-price">
                <div className="ttl-prc">
                  <Button
                    className="chck-out float-right chcko"
                    type="primary"
                    danger
                    loading={loading1}
                    disabled={loading1}
                    onClick={placeAuctionOrder}
                    style={{ fontSize: "1.5rem" }}
                  >
                    Place Order
                  </Button>
                  {/* <button
                    className="chck-out float-right chcko"
                    style={{ width: "auto" }}
                    onClick={placeAuctionOrder}
                    disabled={loading1}
                    style={{ fontSize: "1.5rem" }}
                  >
                    Place Order
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayAuctionCheckoutFooter;
