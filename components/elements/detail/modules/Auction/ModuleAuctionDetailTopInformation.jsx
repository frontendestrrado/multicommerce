import React from "react";
import Link from "next/link";
import Rating from "~/components/elements/Rating";
import { Productfeatureproducts } from "~/components/partials/product/Productfeatureproducts";
import { Statistic } from "antd";
import {
  currencyHelperConvertToRinggit,
  priceHelper,
} from "~/utilities/product-helper";
import CountDownSimple from "~/components/elements/CountDownSimple";
import CountDownSimpleDiff from "~/components/elements/CountDownSimpleDiff";

const { Countdown } = Statistic;
const ModuleAuctionDetailTopInformation = ({ product }) => {
  // Views
  let priceView;
  if (priceHelper(product.sale_price) == 0) {
    priceView = (
      <h4 className="ps-product__price">
        {currencyHelperConvertToRinggit(product.actual_price)}
      </h4>
    );
  } else if (
    priceHelper(product.actual_price) > priceHelper(product.sale_price)
  ) {
    priceView = (
      <h4 className="ps-product__price sale">
        <del className="mr-2">
          {currencyHelperConvertToRinggit(product.sale_price)}
        </del>
        {currencyHelperConvertToRinggit(product.actual_price)}
      </h4>
    );
  } else {
    priceView = (
      <h4 className="ps-product__price">
        {currencyHelperConvertToRinggit(product.actual_price)}
      </h4>
    );
  }
  return (
    <header className="text-capitalize">
      <h1>{product.product_name}</h1>
      <div className="ps-product__meta">
        <div className="ps-block--countdown-deal">
          <CountDownSimpleDiff endTime={product.end_date} />
          <p></p>
        </div>
        <div>
          <p style={{ fontSize: "1.2rem" }}>
            No. of Bidders:
            <span style={{ color: "rgb(207, 19, 34)" }}>
              {product.no_of_bids}
            </span>
          </p>
        </div>
        <div>
          <p style={{ fontSize: "1.2rem" }}>
            Min Bid Price:{" "}
            <span style={{ color: "rgb(207, 19, 34)" }}>
              {currencyHelperConvertToRinggit(product.min_bid_price)}
            </span>
          </p>
        </div>
      </div>
      <div>
        <p>
          Current Bid Price:{" "}
          <span style={{ color: "rgb(207, 19, 34)" }}>
            {currencyHelperConvertToRinggit(product.latest_bid_amt)}
          </span>
        </p>
      </div>
      {priceView}
    </header>
  );
};

export default ModuleAuctionDetailTopInformation;
