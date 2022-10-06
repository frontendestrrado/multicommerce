import React, { Component, useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  getCustomerProfile,
  getCustomerRecentViews,
} from "~/store/account/action";
import Rating from "~/components/elements/Rating";
import { Card, Image } from "antd";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";

const RecentViewedProducts = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    auth?.access_token &&
      dispatch(getCustomerProfile({ access_token: auth.access_token }));
    auth?.access_token &&
      dispatch(getCustomerRecentViews({ access_token: auth.access_token }));
  }, [auth]);

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
      active: true,
      icon: "icon-store",
    },
    {
      text: "Wishlist",
      url: "/account/user-wishlist",
      icon: "icon-heart",
    },
  ];

  const { customer_profile, recent_views } = useSelector((state) => {
    return state.account;
  });

  let { profile_image } = customer_profile;

  const recentItemsRender = recent_views.map((product) => {
    return (
      <div
        className="ps-product ps-product--simple col-xl-3 col-lg-3 col-md-3 col-sm-6 col-4 mx-3"
        key={product}
      >
        <Card style={{ width: 200 }}>
          <div className="ps-product__thumbnail">
            {/* {StrapiProductThumbnail(product)}
            {StrapiProductBadge(product)} */}
            <img
              src={product.product_image[0]?.image}
              alt={product.product_name}
              preview={false}
              height="150"
            />
          </div>
          <div className="ps-product__container">
            <Link href="/shop">
              <a className="ps-product__vendor">{product.shop_name}</a>
            </Link>
            <div className="ps-product__content">
              <Link href="/product/[pid]" as={`/product/${product.id}`}>
                <a className="ps-product__title">
                  {product.product_name.length > 14
                    ? product.product_name.slice(0, 14) + "..."
                    : product.product_name}
                </a>
              </Link>
              <div className="ps-product__rating">
                <Rating rating={product.rating} />
                <span>02</span>
              </div>
              {/* {featureproductprice(product)} */}
              {product.sale_price > (product.price || product.actual_price) ? (
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
              <AccountMenuSidebar activeModule="RecentViewedProducts" />
            </div>
          </div>
          <div className="col-lg-8">
            {recent_views.length > 0 ? (
              <section className="ps-section--account-setting">
                <div className="ps-section__content row">
                  {recentItemsRender}
                </div>
              </section>
            ) : (
              <section className="ps-section--account-setting">
                <div className="ps-section__content">
                  <p>No product here.</p>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentViewedProducts;
