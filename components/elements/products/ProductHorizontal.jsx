import React from "react";
import Link from "next/link";
import {
  StrapiProductPrice,
  StrapiProductThumbnail,
} from "~/utilities/product-helper";
import Rating from "~/components/elements/Rating";

const ProductHorizontal = ({ product }) => {
  return (
    <div className="ps-product--horizontal">
      <div className="ps-product__thumbnail">
        {/* {StrapiProductThumbnail(product)} */}
        <a href="/product/3">
          <img src="/static/img/brand/2-6.jpg" alt="Kangtao" />
        </a>
      </div>
      <div className="ps-product__content">
        <Link href="/product/[pid]" as={`/product/${product.id}`}>
          <a className="ps-product__title">Book Eaters Shop</a>
        </Link>

        <div className="ps-product__rating">
          <Rating />
        </div>
        {/* {StrapiProductPrice(product)} */}
      </div>
    </div>
  );
};

export default ProductHorizontal;
