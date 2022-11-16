import React, { useState, useEffect } from "react";
import { Empty, notification } from "antd";
import Router from "next/router";
import Repository, { baseUrl, serializeQuery, apibaseurl } from "~/repositories/Repository";
import Axios from "axios";
import { getDeviceId } from "~/utilities/common-helpers";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerProfile, getCustomerAddress } from "~/store/account/action";
import DisplayAddress from "./modules/Checkout/DisplayAddress";
import DisplayOrders from "./modules/Checkout/DisplayOrders";
import DisplayVoucher from "./modules/Checkout/DisplayVoucher";
import DisplayCartFooter from "./modules/Checkout/DisplayCartFooter";
import DisplayAddAddress from "./modules/Checkout/DisplayAddAddress";
const Checkout = () => {
  const dispatch = useDispatch();

  const { customer_address } = useSelector((state) => state.account);
  const { access_token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  //const { cart } = useSelector((state) => state.cart);

 // const [cartdata, setCartdata] = useState(useSelector((state) => state.cart));
  const [cartdata, setCartdata] = useState([]);
  useEffect(() => {
    console.log(".....kkkkkkkkk......",customer_address)
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      Router.push("/");
    } else {
     // alert("hjhgjrt")
    
      dispatch(getCustomerProfile());
      dispatch(getCustomerAddress());
      getCartItem()

    }
  }, [access_token]);
  const getCartItem = (payload) => {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;
    const user_token = access_token;
   // console.log("....email...login.... ${apibaseurl}...",{apibaseurl})
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
        console.log("...caaaaaaaaaaaaaartttt,,,,,,,,,,",data)
        if (data.httpcode == 400 && data.status == "error") {
        }
        if (data.httpcode == 200 && data.status == "success") {
          setCartdata(data.data)
    
          return;
        }
      
        
        setLoading(false);
      })
      .catch((error) => {
      });
  }
  return (
    
    <div className="ps-checkout ps-section--shopping ps-shopping-cart">
      {cartdata != null &&
      cartdata !== undefined &&
      cartdata.errors !== "Cart is empty" &&
      cartdata?.product?.length &&
      cartdata?.product?.length !== 0 
    
       ? (
        <div className="container">
          <div
            className="ps-section__content"
            style={{ borderTop: "5px solid #dc3545" }}
          >
            <div className="prdt-box pt-4 pl-4 pb-2">
              {customer_address?.length > 0 ? (
                <DisplayAddress address={customer_address} />
              ) : (
                <DisplayAddAddress />
              )}
            </div>
            <div className="ordered-product">
              <DisplayOrders cartdata={cartdata} />
            </div>
            <div className="voucher-and-payment">
              <DisplayVoucher />
            </div>
            <div className="cart-footer">
              <DisplayCartFooter cartdata={cartdata} />
            </div>
          </div>
        </div>
      ) : (
        <div>
        {  loading === false ?(
          <div className="container">
          {/* <Empty description={<span>Cart is empty!</span>} /> */}
        </div>):(<span> </span>) }
          </div>
      )}
    </div>

  );
};

export default Checkout;
