import React, { Component } from "react";
import { connect } from "react-redux";
import LazyLoad from "react-lazyload";
import Link from "next/link";
import { Modal } from "antd";
import ProductDetailQuickView from "../detail/ProductDetailQuickView";
import Rating from "../Rating";
import {
  currencyHelperConvertToRinggit,
  formatCurrency,
  priceHelper,
} from "../../../utilities/product-helper";
import { addItem } from "../../../store/cart/action";
import { addItemToCompare } from "../../../store/compare/action";
import { addItemToWishlist } from "../../../store/wishlist/action";
import ProductThumbnail from "../common/ProductThumbnail";

const Product = ({ product, classAdd }) => {
  let priceView;
  if (priceHelper(product.sale_price) == 0) {
    priceView = (
      <p className="ps-product__price">
        {currencyHelperConvertToRinggit(product.actual_price)}
      </p>
    );
  } else if (
    priceHelper(product.actual_price) > priceHelper(product.sale_price)
  ) {
    priceView = (
      <p className="ps-product__price sale text-truncate">
        {currencyHelperConvertToRinggit(product.sale_price)}
        <del className="ml-2">
          {currencyHelperConvertToRinggit(product.actual_price)}
        </del>
      </p>
    );
  } else {
    priceView = (
      <p className="ps-product__price">
        {currencyHelperConvertToRinggit(product.actual_price)}
      </p>
    );
  }
  return (
    <div className={`ps-product ${classAdd}`}>
      <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
        <a>
          <ProductThumbnail
            imageLink={
              product.image.length > 0
                ? product?.image[0]?.image
                : "/static/img/vendor/store/vendor-150x150.jpg"
            }
          />
        </a>
      </Link>
      <div className="ps-product__container">
        <Link href={`/seller/${product.seller_id}`}>
          <a className="ps-product__vendor">{product.seller}</a>
        </Link>
        <div className="">
          <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
            <a className="ps-product__title text-capitalize text-truncate">
              {product.product_name}
            </a>
          </Link>
          <div className="ps-product__rating">
            <Rating rating={product.rating} />
            <span>{product.rating}</span>
          </div>
          {priceView}
        </div>
        {/* <div className="ps-product__content hover">
          <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
            <a className="ps-product__title">{product.product_name}</a>
          </Link>
          <div className="ps-product__rating">
            <Rating rating={product.rating} />
            <span>{product.rating}</span>
          </div>
          {Number(product.actual_price) > Number(product.sale_price) ? (
            <p className="ps-product__price sale">
              RM {product.sale_price}{" "}
              <del className="ml-2">RM {product.actual_price}</del>
            </p>
          ) : (
            <p className="ps-product__price">RM {product.actual_price}</p>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default Product;
