import React from "react";
import Link from "next/link";
import Rating from "~/components/elements/Rating";
import {
  currencyHelperConvertToRinggit,
  priceHelper,
} from "~/utilities/product-helper";
import CountDownSimpleDiff from "~/components/elements/CountDownSimpleDiff";

const ModuleShockingSaleDetailTopInformation = ({ product }) => {
  let priceView = (
    <p className="ps-product__price offer">
        {currencyHelperConvertToRinggit(
          product.product.offer_price ? product.product.offer_price : 0
        )}
      <small>
        <del className="ml-2">
          {currencyHelperConvertToRinggit(
            product.product.actual_price ? product.product.actual_price : 0
          )}
        </del>
      </small>
      <small style={{ color: "red" }} className="ml-2">
        {product.product.offer ? product.product.offer : 0}
      </small>
    </p>
  );

  return (
    <header>
      <h1>{product.product.product_name}</h1>
      <div className="ps-product__meta">
        {product.product.brand_name ? (
          <p>
            Brand:
            <Link href="/shop">
              <a className="ml-2 text-capitalize">
                {product.product.brand_name}
              </a>
            </Link>
          </p>
        ) : null}
        <div className="ps-block--countdown-deal">
          <CountDownSimpleDiff endTime={product.product.end_time} />
          <p></p>
        </div>
        <div className="ps-product__rating">
          <Rating rating={product.product.rating} />
          <span>
            ( {product.total_review ? product.total_review : 0} review)
          </span>
        </div>
      </div>
      {product.product.product_type == "config" ? null : priceView}
    </header>
  );
};

export default ModuleShockingSaleDetailTopInformation;
