import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Axios from "axios";
import { getCart, removeItem } from "~/store/cart/action";
import ProductOnCart from "~/components/elements/products/ProductOnCart";
import ProductRepository from "~/repositories/ProductRepository";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";
import { getDeviceId } from "~/utilities/common-helpers";
import Repository, { baseUrl, serializeQuery, apibaseurl } from "~/repositories/Repository";
const MiniCart = React.memo(({ cart }) => {
  let cartItemsView;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const productItemWithSeller = cart?.product?.map((productItem) => (
    <div key={productItem?.seller?.seller_id}>
      <p className="stor-tit">{productItem?.seller?.seller}</p>
      {productItem?.seller?.products?.map((cartProduct) => (
        <ProductOnCart product={cartProduct} key={cartProduct?.cart_id} />
      ))}
    </div>
  ));
  const [cartdata, setCartdata] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    console.log(".productItemNext......cart.....", cart)
   // console.log(".productItemNext...........", productItemNext)
    let isMounted = true;

    if (isMounted) {
      //alert("bhbhhbhhh")
      const cartTotalProductsFromAllSeller = cart?.product?.reduce(
        (productItemPrev, productItemNext) => {
          return (
            Number(productItemPrev) 
             +
             Number(productItemNext.seller.products.length)
          );
        },
        0
      );

      setTotalItems(cartTotalProductsFromAllSeller);
      setCartdata(cart);
    }
    return () => {
      isMounted = false;
    };
  }, [cart?.product]);
  
  // async getCartItem(payload) {

    const getCartItem = (payload) => {
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
  useEffect(() => {
    console.log("..557..",cart)
    getCartItem()
    if (cart == undefined) {
     // alert("ddfffd")
      auth?.access_token && dispatch(getCart());
    }
  }, [auth.access_token, cart?.product]);

  if (
    cartdata !== null &&
    cartdata !== undefined &&
    cartdata?.product?.length &&
    cartdata?.product?.length !== 0
  ) {
    cartItemsView = (
      <div className="ps-cart__content">
        <div className="ps-cart__items">{productItemWithSeller}</div>
        <div className="ps-cart__footer mincart">
          <h3>
            Sub Total:
            <strong>
              {cartdata && cartdata !== null && cartdata?.product?.length > 0
                ? currencyHelperConvertToRinggit(cartdata.grand_total)
                : 0}
            </strong>
          </h3>
          <figure>
            <Link href="/account/shopping-cart">
              <a className="ps-btn ps-btn--yellow">View Cart</a>
            </Link>
            <Link href="/account/checkout">
              <a className="ps-btn ps-btn--blu">Checkout</a>
            </Link>
          </figure>
        </div>
      </div>
    );
  } else {
    cartItemsView = (
      <div className="ps-cart__content">
        <div className="ps-cart__items">
          <span>No products in cart</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-cart--mini">
      <a className="header__extra" href="#">
        <i className="icon-bag2"></i>
        <span>
          <i>
            {cartdata !== null && cartdata !== undefined && totalItems > 0
              ? totalItems
              : 0}
          </i>
        </span>
      </a>
      {cartItemsView}
    </div>
  );
});

export default connect((state) => state.cart)(MiniCart);
