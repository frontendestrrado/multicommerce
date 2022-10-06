import React from "react";
import Link from "next/link";
import Rating from "../Rating";

import {
  StrapiProductBadge,
  StrapiProductPrice_New,
  Shockingproductthumbnail,
} from "~/utilities/product-helper";

import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";

const ProductRealtedSlider = ({ product }) => {
  // Views
  const priceView = StrapiProductPrice_New(product);
  const thumbnailImage = Shockingproductthumbnail(product);
  const badgeView = StrapiProductBadge(product);

  return (
    <div className="ps-product">
      <div className="ps-product__thumbnail">
        {thumbnailImage}
        {badgeView}
        {/* <ModuleProductActions product={product} /> */}
      </div>
      <div className="ps-product__container">
        <Link href="/shop">
          <a className="ps-product__vendor">{product.brand_name}</a>
        </Link>
        <div className="ps-product__content">
          <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
            <a className="ps-product__title">{product.product_name}</a>
          </Link>
          <div className="ps-product__rating">
            <Rating rating={product.rating} />
            <span>{product.rating}</span>
          </div>
          {priceView}
        </div>
      </div>
    </div>
  );
};

export default ProductRealtedSlider;
