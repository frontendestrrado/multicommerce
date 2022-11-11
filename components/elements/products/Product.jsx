import React from "react";
import Link from "next/link";
import Rating from "../Rating";
import LazyLoad from "react-lazyload";

import {
  StrapiProductBadge,
  StrapiProductPrice,
  StrapiProductThumbnail,
} from "~/utilities/product-helper";

import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import ProductThumbnail from "../common/ProductThumbnail";

const Product = ({ product }) => {
  // Views
  const priceView = StrapiProductPrice(product);
  const thumbnailImage = StrapiProductThumbnail(product);
  const badgeView = StrapiProductBadge(product);

  return (
    <div className="">
      <div className="ps-product__thumbnail">
        {/* {thumbnailImage}
        {badgeView} */}
        {/* <ModuleProductActions product={product} /> */}
        <Link href="/product/[pid]" as={`/product/${product.id}`}>
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
      </div>
      <div className="ps-product__container">
        <Link href="/shop">
          <a className="ps-product__vendor">{product.seller}</a>
        </Link>
        <div className="ps-product__content">
          <Link href="/product/[pid]" as={`/product/${product.id}`}>
            <a className="ps-product__title">{product.product_name}</a>
          </Link>
          <div className="ps-product__rating">
            <Rating rating={product.rating} />
            {/* <span>02</span> */}
          </div>
          {/* {priceView} */}
          SAR {product.actual_price}
        </div>
        {/* <div className="ps-product__content hover">
          <Link href="/product/[pid]" as={`/product/${product.id}`}>
            <a className="ps-product__title">{product.title}</a>
          </Link>
          {priceView}
        </div> */}
      </div>
    </div>
  );
};

export default Product;
