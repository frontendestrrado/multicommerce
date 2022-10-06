import React, { Component, useEffect, useState } from "react";
import { getCustomerProfile } from "~/store/account/action";
import Rating from "~/components/elements/Rating";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";

import { Icon } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { connect, useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../store/cart/action";
import { removeWishlistItem } from "../../../store/wishlist/action";
import Link from "next/link";
import { Card, Rate, Alert, Empty } from "antd";
import ProductThumbnail from "~/components/elements/common/ProductThumbnail";

const UserWishist = () => {
  const dispatch = useDispatch();
  const { auth, wishlist } = useSelector((state) => state);
  const { wishlistItems, wishlistTotal } = wishlist;

  useEffect(() => {
    const handler = setTimeout(() => {
      auth?.access_token &&
        dispatch(getCustomerProfile({ access_token: auth.access_token }));
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [auth]);

  const handleRemoveWishListItem = (e, product) => {
    e.preventDefault();
    dispatch(removeWishlistItem(product.product_id));
  };

  const handleAddItemToCart = (e, product) => {
    e.preventDefault();
    let payload = {
      product,
      cart_type: "web",
      quantity: 1,
      access_token: auth.access_token,
    };
    dispatch(addItem(payload));
  };

  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
    },
    {
      text: "Notifications",
      url: "/account/notifications",
      icon: "icon-alarm-ringing",
    },
    {
      text: "Invoices",
      url: "/account/invoices",
      icon: "icon-papers",
    },
    {
      text: "Address",
      url: "/account/addresses",
      icon: "icon-map-marker",
    },
    {
      text: "Recent Viewed Product",
      url: "/account/recent-viewed-product",
      icon: "icon-store",
    },
    {
      text: "Wishlist",
      url: "/account/wishlist",
      icon: "icon-heart",
      active: true,
    },
  ];

  const { customer_profile, recent_views } = useSelector((state) => {
    return state.account;
  });

  let { profile_image } = customer_profile;

  const wishListItemsRender = wishlistItems
    ?.map((wishList) => wishList)
    ?.map((product, index) => {
      return (
        <div
          className="ps-product ps-product--simple col-xl-3 col-lg-3 col-md-3 col-sm-6 col-4 mx-3"
          key={index}
        >
          <Card style={{ width: 200 }}>
            <a>
              <Favorite
                color={"secondary"}
                fontSize="large"
                onClick={(e) => handleRemoveWishListItem(e, product)}
                style={{ cursor: "pointer" }}
              />
            </a>

            <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
              <a>
                <ProductThumbnail
                  imageLink={product?.product_image[0]?.thumbnail}
                />
              </a>
            </Link>
            <div className="ps-product__container">
              <Link href={`/seller/${product.seller_id}`}>
                <a className="ps-product__vendor d-block">
                  {product.shop_name}
                </a>
              </Link>
              <div className="ps-product__content">
                <Link href="/product/[pid]" as={`/product/${product.id}`}>
                  <a className="ps-product__title">
                    {product.product_name.length > 14
                      ? product.product_name.slice(0, 14) + "..."
                      : product.product_name}
                  </a>
                </Link>
                <div className="ps-product__rating mt-4">
                  <Rating rating={product.rating} />
                  <span>02</span>
                </div>
                {/* {featureproductprice(product)} */}
                {product.sale_price > product.price ? (
                  <p className="ps-product__price">
                    RM {product.sale_price}{" "}
                    <span className="lin-prdt">
                      RM {product.price || product.actual_price}
                    </span>
                  </p>
                ) : (
                  <p className="ps-product__price">
                    RM {product.price || product.actual_price}{" "}
                  </p>
                )}
                <div className="add_to_cart">
                  <a
                    className="ps-btn"
                    href=""
                    onClick={(e) => handleAddItemToCart(e, product)}
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </div>
      );
    });

  return (
    <section
      className="ps-my-account ps-page--account"
      style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="ps-section__left">
              <AccountMenuSidebar activeModule="Wishlist" />
            </div>
          </div>
          <div className="col-lg-9">
            {wishlistTotal > 0 ? (
              <section className="ps-section--account-setting">
                <div className="ps-section__content row">
                  {wishListItemsRender}
                </div>
              </section>
            ) : (
              <section className="ps-section--account-setting">
                <div className="ps-section__content">
                  <Empty description={<span>No Wishlist Found!</span>} />
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserWishist;
