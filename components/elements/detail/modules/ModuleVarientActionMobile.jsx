import React, { useState, useEffect } from "react";
import { addItem, getCart } from "~/store/cart/action";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import { displayNotification } from "~/utilities/common-helpers";

const ModuleVarientActionMobile = ({ product }) => {
  const dispatch = useDispatch();
  const Router = useRouter();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const auth = useSelector((state) => state.auth);
  const {
    productQuantity,
    productIdOfConfig,
    out_of_stock_selling,
    stock,
    outerAttrProductId,
    outerConfigStock,
    outerConfigOutOfstockSell,
    subAttrCheck,
  } = useSelector((state) => state.product);

  const makePayload = (token) => {
    let payload = {
      user_id: 1,
      quantity: productQuantity || 1,
      cart_type: "web",
      access_token: token,
    };

    if (product.product.product_type == "config") {
      if (subAttrCheck == 0) {
        payload = {
          ...payload,
          product_id: outerAttrProductId,
        };

        if (outerConfigOutOfstockSell === false && outerConfigStock <= 0) {
          notification["error"]({
            message: "Error",
            description: "Product Out of Stock!",
            duration: 2,
          });
          setLoading1(false);
          return false;
        }
      } else if (subAttrCheck > 0) {
        payload = {
          ...payload,
          product_id: productIdOfConfig,
        };

        if (out_of_stock_selling == false && stock <= 0) {
          notification["error"]({
            message: "Error",
            description: "Product Out of Stock!",
            duration: 2,
          });
          setLoading1(false);
          return false;
        }
      }
    } else {
      payload = {
        ...payload,
        product_id: product.product.product_id,
      };
      if (
        product.product.out_of_stock_selling === false &&
        product.product.stock <= 0
      ) {
        displayNotification("error", "Error", "Product Out of Stock!");

        setLoading2(false);

        return false;
      }
    }
    return payload;
  };

  const handleAddItemToCart = async (e) => {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let token = parsedata?.access_token;

    if (userdata === undefined || userdata === null) {
      displayNotification("error", "Error", "Please login first");
      return false;
    } else if (
      product.product.product_type == "config" &&
      (productIdOfConfig == 0 ||
        productIdOfConfig == null ||
        productIdOfConfig == undefined)
    ) {
      displayNotification("error", "Error", "Please Select Varient");
      return false;
    } else {
      setLoading1(true);
      let payload = makePayload(token);

      if (payload) {
        const responseData =
          token && (await ProductRepository.addProductToCart(payload));

        if (responseData && responseData.httpcode == "200") {
          dispatch(getCart());

          setLoading1(false);
          displayNotification(
            responseData.status,
            responseData.status,
            responseData.response
          );
          setTimeout(function () {
            Router.push("/account/shopping-cart");
          }, 200);
        } else if (responseData && responseData.httpcode == 400) {
          let error = responseData.errors;
          for (const [key, value] of Object.entries(error)) {
            displayNotification("error", "", value, 2);
          }
        } else {
          displayNotification("error", "Error", responseData.message);
          setLoading1(false);
        }
      } else {
        setLoading1(false);
        return false;
      }
    }
    return false;
  };

  const handleBuynow = async (e) => {
    if (auth.isLoggedIn !== true) {
      displayNotification("error", "Error", "Please login first");
      return false;
    } else if (
      product.product.product_type == "config" &&
      (productIdOfConfig == 0 ||
        productIdOfConfig == null ||
        productIdOfConfig == undefined)
    ) {
      displayNotification("error", "Error", "Please Select Varient");
      return false;
    } else {
      setLoading2(true);
      let payload = makePayload(auth.access_token);

      if (payload) {
        const responseData = await ProductRepository.addProductToCart(payload);

        if (responseData.httpcode == 200) {
          displayNotification(
            responseData.status,
            responseData.status,
            responseData.response
          );
          setTimeout(function () {
            Router.push("/account/checkout");
          }, 1000);
          setLoading2(false);
          return false;
        } else {
          displayNotification("error", "Error", responseData.message);
          setLoading2(false);
          return false;
        }
      } else {
        setLoading2(false);

        return false;
      }
    }
    return false;
  };

  return (
    <div className="ps-product__actions-mobile">
      <a
        className="ps-btn ps-btn--black"
        onClick={(e) => handleAddItemToCart(e)}
      >
        Add to cart2
      </a>
      <a className="ps-btn" onClick={(e) => handleBuynow(e)}>
        Buy Now
      </a>
    </div>
  );
};

export default ModuleVarientActionMobile;
