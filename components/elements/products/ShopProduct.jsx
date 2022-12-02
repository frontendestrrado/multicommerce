import React from "react";
import Link from "next/link";
import Rating from "../Rating";
import {
  homePageProductPriceHelper,
  StrapiProductPrice_New,
} from "~/utilities/product-helper";
import ProductThumbnail from "../common/ProductThumbnail";
import CountDownSimpleDiff from "../CountDownSimpleDiff";

const ShopProduct = ({ product }) => {
  // Views
  const priceView = homePageProductPriceHelper(product);
  return (
    <div className="ps-product shadw mb-5 text-capitalize">
      {product?.end_time && (
        <div className="ps-block--countdown-deal mb-3">
          <figure style={{ fontSize: "11px" }}>
            <figcaption>End in:</figcaption>
            <CountDownSimpleDiff
              endTime={product.end_time}  
              classAdd={"home-auction--slider"}
            />
          </figure>
        </div>
      )}
      <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
        <a>
          <ProductThumbnail imageLink={product?.image[0]?.image} />
        </a>
      </Link>
      <div className="ps-product__container">
        {/* <Link href={`/seller/${product.seller_id}`}>
          <a className="ps-product__vendor">
            {product.seller ? product.seller : "NA"}
          </a>
        </Link> */}
        <div className="ps-product__content">
          <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
            <a className="ps-product__title text-truncate text-center">
              {product.product_name}
            </a>
          </Link>
          {/* <div className="ps-product__rating">
            <Rating rating={product.rating} />
            <span>{product.rating}</span>
          </div> */}
          {priceView}
        </div>
        {/* <div className="ps-product__content hover">
          <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
            <a className="ps-product__title text-truncate">
              {product.product_name}
            </a>
          </Link>
          <div className="ps-product__rating">
            <Rating rating={product.rating} />
            <span>{product.rating}</span>
          </div>
          {priceView}
        </div> */}
      </div>
    </div>
  );
};

export default ShopProduct;
