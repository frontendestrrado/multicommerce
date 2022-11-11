import React from "react";
import Link from "next/link";
import Rating from "../Rating";
import { StrapiProductPrice_New } from "~/utilities/product-helper";
import ProductThumbnail from "../common/ProductThumbnail";
import CountDownSimpleDiff from "../CountDownSimpleDiff";

const ShockingProduct = ({ product }) => {
  // Views
  const priceView = StrapiProductPrice_New(product);
  return (
    <div className="ps-product mb-5 text-capitalize">
      {product?.end_time && (
        <div className="ps-block--countdown-deal mb-3">
          <figure style={{ fontSize: "10px" }}>
            <figcaption>End in:</figcaption>
            <CountDownSimpleDiff
              endTime={product.end_time}
              classAdd={"home-auction--slider"}
            />
          </figure>
        </div>
      )}
      <Link
        href={`shockingsale/${product.shock_sale_id}?pr_id=${product.product_id}`}
      >
        <a>
          <ProductThumbnail imageLink={product?.image[0]?.image} />
        </a>
      </Link>
      <div className="ps-product__container">
        <Link href={`/seller/${product.seller_id}`}>
          <a className="ps-product__vendor">
            {product.seller ? product.seller : "NA"}
          </a>
        </Link>
        <div className="">
          <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
            <a className="ps-product__title text-truncate">
              {product.product_name}
            </a>
          </Link>
          <div className="ps-product__rating">
            <Rating rating={product.rating} />
            <span>{product.rating}</span>
          </div>
          <p
            className="ps-product__price"
            style={{
              fontWeight: "lighter",
            }}
          >
            SAR {product.offer_price !== false ? product.offer_price : ""}
            <br />
            <small>
              <del className="">
              SAR {product.actual_price ? product.actual_price : ""}
              </del>
            </small>
            <small style={{ color: "red" }} className="ml-2">
              {product.offer ? product.offer : ""}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShockingProduct;
