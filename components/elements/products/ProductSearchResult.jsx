import React from "react";
import Link from "next/link";
import LazyLoad from "react-lazyload";

import {
  StrapiProductPrice,
  StrapiProductThumbnail,
} from "~/utilities/product-helper";
import Rating from "~/components/elements/Rating";

const ProductSearchResult = ({ product }) => {
  return (
    <div className="ps-product ps-product--wide ps-product--search-result">
      <div className="ps-product__thumbnail">
        {/* {StrapiProductThumbnail(product)} */}

        {product?.image[0]?.image ? (
          <Link href="/product/[pid]" as={`/product/${product.id}`}>
            <a>
              <LazyLoad>
                <img src={product?.image[0]?.image} alt={product.title} />
              </LazyLoad>
            </a>
          </Link>
        ) : (
          <Link href="/product/[pid]" as={`/product/${product.id}`}>
            <a>
              <LazyLoad>
                <img src="/static/img/not-found.jpg" alt="Kangtao" />
              </LazyLoad>
            </a>
          </Link>
        )}
      </div>
      <div className="ps-product__content">
        <Link href="/product/[pid]" as={`/product/${product.id}`}>
          <a className="ps-product__title">{product.product_name}</a>
        </Link>
        <div className="ps-product__rating">
          <Rating rating={product.rating} />
          {/* <span>{product.ratingCount}</span> */}
        </div>
        {product.sale_price > 0 ? (
          <p className="ps-product__price sale">
            SAR {product.sale_price}
            <del className="ml-2">SAR {product.actual_price}</del>
          </p>
        ) : (
          <p className="ps-product__price sale">SAR {product.actual_price}</p>
        )}
      </div>
    </div>
  );
};
export default ProductSearchResult;
