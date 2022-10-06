import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProductRepository from "~/repositories/ProductRepository";
import { clearCartSuccess, getCart } from "~/store/cart/action";
import {
  returnTotalCommission,
  returnTotalOfCartTaxValue,
  returnTotalOfCartValue,
} from "~/utilities/product-helper";
import { getDeviceId, makePageUrl, osType } from "~/utilities/common-helpers";

const DisplayPlaceOrderDetails = () => {
  const [loading1, setloading1] = useState(false);
  const Router = useRouter();
  const dispatch = useDispatch();

  const { user_details, isLoggedIn, access_token } = useSelector(
    (state) => state.auth
  );

  const {
    total_discount,
    cart,
    applied_voucher,
    seller_wise_messages,
    selectedAddress,
    applied_platform_voucher,
    used_wallet_amount_detail,
    selected_payment_option_by_user,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
    }
    return () => {
      isMounted = false;
    };
  }, [cart?.product]);

  const placeOrderNew = async () => {
    if (!isLoggedIn) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      return false;
    } else {
      if (selectedAddress.id == undefined || selectedAddress.id == null) {
        notification["error"]({
          message: "Error",
          description: "Please Select Valid Address Detail",
          duration: 1,
        });
        return;
      }

      if (
        selected_payment_option_by_user.payment_type == undefined ||
        selected_payment_option_by_user.payment_type == null
      ) {
        notification["error"]({
          message: "Error",
          description: "Please Select Valid Payment type",
          duration: 1,
        });
        return;
      }

      let cart_payload = cart.product
        ?.map((product) => {
          return {
            seller_id: product.seller.seller_id,
            products: product.seller.products,
            coupon: product.seller.coupon,
          };
        })
        .map((cart_detail) => {
          let voucher_details = applied_voucher?.filter(
            (voucher) => voucher.seller_id == cart_detail.seller_id
          );

          let seller_message = seller_wise_messages?.filter(
            (message) => message.seller_id == cart_detail.seller_id
          );

          let sellerPayload = {
            seller_id: cart_detail.seller_id,
            total_cost: returnTotalOfCartValue(cart_detail.products),
            total_tax: returnTotalOfCartTaxValue(cart_detail.products),
            commission: returnTotalCommission(cart_detail.products),
          };

          if (voucher_details.length > 0) {
            let vou_det = voucher_details[0];
            sellerPayload = {
              ...sellerPayload,
              is_coupon: vou_det.is_coupon,
              coupon_id: vou_det.coupon_id,
              discount_type: vou_det.discount_type,
              discount_amt: vou_det.discount_amt,
              packing_charge: "",
              shipping_charge: "0",
              message: seller_message.message,
            };
          } else {
            sellerPayload = {
              ...sellerPayload,
              is_coupon: false,
              coupon_id: "",
              discount_type: "",
              discount_amt: "",
              packing_charge: "",
              shipping_charge: "0",
              message: seller_message.message,
            };
          }

          if (seller_message.length > 0) {
            let seller_msg = seller_message[0];
            sellerPayload = {
              ...sellerPayload,
              message: seller_msg.message,
            };
          } else {
            sellerPayload = {
              ...sellerPayload,
              message: "",
            };
          }

          return sellerPayload;
        });

      let platform_coupon_payload;

      if (applied_platform_voucher.is_platform_coupon) {
        platform_coupon_payload = {
          is_platform_coupon: applied_platform_voucher.is_platform_coupon,
          platform_coupon_id: applied_platform_voucher.coupon_id,
          platform_discount_type: applied_platform_voucher.offer_type,
          discount_amt: applied_platform_voucher.discount_amount,
        };
      } else {
        platform_coupon_payload = {
          is_platform_coupon: applied_platform_voucher.is_platform_coupon,
          is_platform_coupon: 0,
          platform_coupon_id: "",
          platform_discount_type: "",
          discount_amt: 0,
        };
      }

      let payload = {
        seller_array: { ...cart_payload },
        access_token,
        lang_id: "",
        ...platform_coupon_payload,
        total_amt: cart.grand_total,
        e_money_amt: used_wallet_amount_detail.wallet_used
          ? used_wallet_amount_detail.wallet_balance
          : used_wallet_amount_detail.wallet_used,
        payment_type: selected_payment_option_by_user.payment_type,
        address_id: selectedAddress.id,
        reward_id: "",
        commission: 0,
        reward_amt: "",
        device_id: getDeviceId,
        page_url: makePageUrl(Router.asPath),
        os_type: osType(),
      };

      // setloading1(false);

      // console.log(JSON.stringify(payload, null, 4));
      // return;

      const responseData = await ProductRepository.placeOrder(payload);
      if (responseData && responseData.httpcode === 200) {
        setloading1(false);
        localStorage.setItem("order", responseData.data.order_id);
        notification["success"]({
          message: "Success",
          description: "Congrats, order successfully placed",
          duration: 1,
        });
        setTimeout(() => {
          dispatch(clearCartSuccess());
        }, 1000);
        Router.push("/account/thankyou");
      } else {
        setloading1(false);

        notification["error"]({
          message: "Error",
          description: "something went wrong. please try again",
          duration: 1,
        });
      }
      setloading1(false);
      return;
    }
  };

  return (
    <div className="totl-itm">
      <div className="totl-prc">
        <div className="totl-price">
          <div className="ttl-prc">
            <button
              className="chck-out float-right chcko"
              style={{ width: "auto" }}
              onClick={placeOrderNew}
              // disabled={loading1}
              style={{ fontSize: "1.5rem" }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPlaceOrderDetails;
