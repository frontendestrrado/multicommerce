import React from "react";
import Link from "next/link";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";
import { Card } from "antd";
import ProductThumbnail from "../common/ProductThumbnail";
import CountDownSimpleDiff from "../CountDownSimpleDiff";

const ProductAuction = ({ product, widthGiven, marginGiven }) => {
  return (
    <Card style={{ width: widthGiven || 255, margin: marginGiven || "20px" }}>
      <div className="ps-block--countdown-deal mb-3">
        <figure className="figure-timer--font">
          <figcaption>End in:</figcaption>
          <CountDownSimpleDiff
            endTime={product.end_date}
            classAdd={"home-auction--slider"}
          />
        </figure>
      </div>
      <div className="ps-product__thumbnail">
        <Link href="/auction/[pid]" as={`/auction/${product.auction_id}`}>
          <a>
            <ProductThumbnail imageLink={product?.image[0]?.image} />
          </a>
        </Link>
      </div>
      <div className="ps-product__container mt-2 text-truncate">
        <Link href="/auction/[pid]" as={`/auction/${product.auction_id}`}>
          <a className="ps-product__vendor" style={{ fontWeight: "400" }}>
            {product.seller ? product.seller : "NA"}
          </a>
        </Link>
        <hr />
        {product.sale_price !== false ? (
          <p
            className="ps-product__price"
            style={{ fontWeight: "bold", fontSize: "large" }}
          >
            RM {product.sale_price}
            <del className="ml-2">RM {product.price}</del>
          </p>
        ) : (
          <p
            className="ps-product__price"
            style={{ fontWeight: "bold", fontSize: "large" }}
          >
            RM {product.price}
          </p>
        )}
        <div className="ps-product__content">
          <Link href="/auction/[pid]" as={`/auction/${product.auction_id}`}>
            <a
              className="ps-product__title d-inline-block text-truncate"
              style={{
                fontSize: "large",
                fontWeight: 500,
                marginTop: "1rem",
                maxWidth: "200px",
              }}
            >
              {product.product_name}
            </a>
          </Link>
        </div>
        <div className="mt-2">
          <p>
            No. of Bids
            <span className="float-right">{product.no_of_bids}</span>
            <br />
            Min. Bid
            <span className="float-right">
              {currencyHelperConvertToRinggit(product.min_bid_price)}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProductAuction;
