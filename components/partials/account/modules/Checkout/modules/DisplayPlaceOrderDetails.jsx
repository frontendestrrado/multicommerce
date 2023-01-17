import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { useSelector } from "react-redux";
import ProductRepository from "~/repositories/ProductRepository";
import Repository, { baseUrl, serializeQuery, apibaseurl } from "~/repositories/Repository";
import { clearCartSuccess, getCart } from "~/store/cart/action";
import {
  returnTotalCommission,
  returnTotalOfCartTaxValue,
  returnTotalOfCartValue,
} from "~/utilities/product-helper";
import { getDeviceId, makePageUrl, osType } from "~/utilities/common-helpers";

const DisplayPlaceOrderDetails = ({address}) => {
  console.log("..22...",address)
  const [loading1, setloading1] = useState(false);
  const Router = useRouter();
  const [cartdata, setCartdata] = useState(null); 
  const [totalItems, setTotalItems] = useState(0);
  const [getDefltAdd, setDefltAdd] = useState({});
  // const [getAddressId, setAddressId] = useState('');
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
console.log("....**************...........",useSelector((state) => state.auth))
  useEffect(() => {
    console.log(".....6.6.6.6......",cart)
    getCartItem()
    let isMounted = true;
    if (isMounted) {
      let address_default = addressFilter(1, null);
      console.log("..111..a...",address_default)
      setDefltAdd(address_default)
    }
    else{
      let address_default = addressFilter(1, null);
      console.log("..222..a...",address_default)
      setDefltAdd(address_default)
    }
    return () => {
      isMounted = false;
    };

  }, [cart?.product]);
  const addressFilter = (is_default, address_id) => {
    console.log("....333333.....",is_default)
    console.log("....22222.....",address_id)
    console.log("....111111.....",address)
    let address_select = address.filter(
      (address) =>
        address.is_default === is_default || address.id === address_id
    )[0];
  
    return address_select;

  };
  const getCartItem = (payload) => {
     // alert("7777767")
    //alert("d")
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;
    const user_token = access_token;
    console.log("....email...login.... ${apibaseurl}...",{apibaseurl})
    console.log("....aaaaaaaaaaaaaaaa...",user_token)
    console.log("....bbbbbbbbbbbbbbbb...",getDeviceId)

    const data = Axios.post(
      `${apibaseurl}/api/customer/cart`,
      {
        access_token: user_token,
        lang_id:localStorage.getItem("langId"),
        device_id: getDeviceId,
        page_url: "http://localhost:3000/product/2",
        os_type: "WEB",
      })
      .then((response) => response.data)
      .then((data) => {
        console.log("...iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii.",data)
    //    console.log("....email...login.... response...",response)
        if (data.httpcode == 400 && data.status == "error") {
          // notification["error"]({
          //   message: data.message,
          // });
          // return;
        }
        if (data.httpcode == 200 && data.status == "success") {
          setCartdata(data.data)
          setTotalItems(data.data.cart_count)
       //   alert("yes")
        //  setOfferData(data.data)
          // notification["success"]({
          //   message: data.message,
          // });
         // localStorage.setItem("user", JSON.stringify(data.data));
          return;
        }
      })
      .catch((error) => {
        // notification["error"]({
        //   message: error,
        // });
      });


     console.log("....bbbbb...bbb.ccccc..",getDeviceId)
   // console.log("....bbbbb...bbb...",payload)
    // let userdata = localStorage.getItem("user");
    // let parsedata = JSON.parse(userdata);
    // let access_token = parsedata?.access_token;
    // const user_token = access_token;

    // const response =  Repository.post(`${apibaseurl}/api/customer/cart`, {
    //   access_token: user_token,
    //   lang_id: 1,
    //   device_id: getDeviceId,
    //   page_url: "http://localhost:3000/product/2",
    //   os_type: "WEB",
    // })
    // console.log("....bbbbb...bbb..444444444444.",response)
    //   // .then((response) => {
    //     if (response.data.httpcode == "200") {
    //       return response.data;
    //     }
    //   //   return response.data;
    //   // })
    //   // .catch((error) => ({ error: JSON.stringify(error) }));
    // return response;
  }
  const placeOrderNew = async () => {
    console.log("....1111...1..",selectedAddress.id)
    console.log("....1111...2..",getDefltAdd)
    // console.log("....1111...3..",getDefltAdd.id)
    if(selectedAddress.id == undefined && getDefltAdd == undefined){
      notification["error"]({
        message: "Error",
        description: "Please Select Valid Address Detail",
        duration: 1,
      });
      return;

    }
    var addId = ''
    if(selectedAddress.id === undefined){
    //  alert("1")
      addId = getDefltAdd.id
    //   setAddressId(getDefltAdd.id)
    }
    else{
    //  alert("2")
      addId = selectedAddress.id
     // setAddressId(selectedAddress.id)
    }
  
  alert("checkout")
    if (!isLoggedIn) {
     
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      return false;
    } else {
      if (addId == undefined || addId == null) {
        console.log("....2222.....")
        notification["error"]({
          message: "Error",
          description: "Please Select Valid Address Detail",
          duration: 1,
        });
        return;
      }

      // if (
      //   selected_payment_option_by_user.payment_type == undefined ||
      //   selected_payment_option_by_user.payment_type == null
      // ) {
      //   notification["error"]({
      //     message: "Error",
      //     description: "Please Select Valid Payment type",
      //     duration: 1,
      //   });
      //   return;
      // }

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
          is_coupon: applied_platform_voucher.is_platform_coupon,
          coupon_id: applied_platform_voucher.coupon_id,
          discount_type: applied_platform_voucher.offer_type,
          discount_amt: applied_platform_voucher.discount_amount,
        };
      } else {
        platform_coupon_payload = {
          is_coupon: applied_platform_voucher.is_platform_coupon,
          is_coupon: 0,
          coupon_id: "",
          discount_type: "",
          discount_amt: 0,
        };
      }
console.log("...cartdata....cartdata....cartdata....",cartdata)
var a=cartdata.grand_total
a=a.replace(/\,/g,''); // 1125, but a string, so convert it to number
a=parseInt(a,10);
var b=cartdata.total_cost
b=b.replace(/\,/g,''); // 1125, but a string, so convert it to number
b=parseInt(b,10);

      let payload = {
       // seller_array: { ...cart_payload },
        access_token,
        lang_id: localStorage.getItem("langId"),
        ...platform_coupon_payload,
        total_amt: a,
        e_money_amt: used_wallet_amount_detail.wallet_used
          ? used_wallet_amount_detail.wallet_balance
          : used_wallet_amount_detail.wallet_used,
     //   payment_type: selected_payment_option_by_user.payment_type,
     payment_type: "2",
        address_id: addId,
        reward_id: "",
       // commission: 0,
        reward_amt: "",
        device_id: getDeviceId,
        page_url: makePageUrl(Router.asPath),
        os_type: osType(),


        total_cost: b,
        total_tax: 0.0,
        packing_charge: "0",
        shipping_charge: "0",
        message: "",
        currency_code:"SAR",
        invite_coupon_id:"",
   //     total_amt:336.3,
        branch_id:"0"
    
      };

      // setloading1(false);

      // console.log(JSON.stringify(payload, null, 4));
      // return;
      console.log("....1111...placeOrder...payload....",payload)
      const responseData = await ProductRepository.placeOrder(payload);
  
      console.log("....1111...placeOrder....",responseData)
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
