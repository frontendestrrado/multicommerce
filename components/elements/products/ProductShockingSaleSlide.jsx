import React from "react";
import Link from "next/link";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";
import Rating from "~/components/elements/Rating";
import { Card } from "antd";
import ProductThumbnail from "../common/ProductThumbnail";
import CountDownSimpleDiff from "../CountDownSimpleDiff";

const ProductShockingSaleSlide = ({ product }) => {
  return (
    <>
      <Card bordered={false} className=" text-capitalize">
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
                className="ps-product__title"
                style={{
                  fontSize: "large",
                  fontWeight: 500,
                  marginTop: "1rem",
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
              SAR {product.offer_price ? product.offer_price : 0}
              <small>
                <del className="ml-2">
                SAR {product.actual_price ? product.actual_price : 0}
                </del>
              </small>
              <small style={{ color: "red" }} className="ml-2">
                {product.offer ? product.offer : 0}
              </small>
            </p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProductShockingSaleSlide;
