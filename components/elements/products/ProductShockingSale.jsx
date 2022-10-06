import React from "react";
import Link from "next/link";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";
import Rating from "~/components/elements/Rating";
import { Card } from "antd";
import ProductThumbnail from "../common/ProductThumbnail";
import CountDownSimpleDiff from "../CountDownSimpleDiff";

const ProductShockingSale = ({ product }) => {
  return (
    <>
      <Card style={{ width: 255, margin: "20px" }} className="text-capitalize">
        <div className="ps-block--countdown-deal mb-3">
          <figure className="figure-timer--font">
            <figcaption>End in:</figcaption>
            <CountDownSimpleDiff
              endTime={product.end_time}
              classAdd={"home-shockingsale--slider"}
            />
          </figure>
        </div>
        <Link
          href={`shockingsale/${product.shock_sale_id}?pr_id=${product.product_id}`}
        >
          <a>
            <ProductThumbnail imageLink={product?.image[0]?.image} />
          </a>
        </Link>
        <div className="ps-product__container text-truncate">
          <div className="ps-product__content mt-4">
            <Link
              href={`shockingsale/${product.shock_sale_id}?pr_id=${product.product_id}`}
            >
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
            <div className="ps-product__rating">
              <Rating rating={product.rating} /> <span>{product.rating}</span>
            </div>
            <p
              className="ps-product__price"
              style={{
                fontWeight: "lighter",
              }}
            >
              RM {product.offer_price !== false ? product.offer_price : ""}
              <small>
                <del className="ml-2">
                  RM {product.actual_price ? product.actual_price : ""}
                </del>
              </small>
              <small style={{ color: "red" }} className="ml-2">
                {product.offer ? product.offer : ""}
              </small>
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProductShockingSale;
