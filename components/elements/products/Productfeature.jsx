import React, { useState, useEffect } from "react";
import Link from "next/link";
import Rating from "../Rating";

import {
  homePageProductPriceHelper,
  StrapiProductBadge,
  StrapiProductThumbnailOther,
} from "~/utilities/product-helper";
import { useSelector } from "react-redux";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import { Image } from "antd";
import ProductThumbnail from "../common/ProductThumbnail";

const Productfeature = ({ product }) => {
  // Views
  const priceView = homePageProductPriceHelper(product);
  const thumbnailImage = StrapiProductThumbnailOther(product);
  const badgeView = StrapiProductBadge(product);
  const [prodLen, setProdLen] = useState(0);
  const { homedata } = useSelector((state) => state.home);
  // views
  useEffect(() => {
    if (homedata !== null && homedata !== undefined) {
      setProdLen(homedata?.featured_products?.length);
    }
  }, [homedata?.featured_products]);

  return (
    <>
      <div
        className={`${prodLen > 5 ? "" : "col-xl-2 col-lg-3 col-sm-3 col-6"}`}
        style={{ margin: "10px" }}
      >
        <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
          <a>
            <ProductThumbnail imageLink={product?.image[0]?.image} />
          </a>
        </Link>
        <div className="ps-product__container text-truncate">
          <Link href={`/seller/${product.seller_id}`}>
            <a
              className="ps-product__vendor text-capitalize"
              style={{
                fontWeight: "400",
              }}
            >
              {product.seller ? product.seller : ""}
            </a>
          </Link>
          <hr />
          <div className="ps-product__content">
            <Link
              href={"product/" + product.product_id}
              as={`/product/${product.product_id}`}
            >
              <a
                className="ps-product__title text-capitalize d-inline-block text-truncate"
                style={{
                  fontSize: "medium",
                  fontWeight: "500",
                  maxWidth: "170px",
                }}
              >
                {product.product_name}
              </a>
            </Link>
            <div className="ps-product__rating">
              <Rating rating={product.rating} />
              <span>{product.rating}</span>
            </div>
            {priceView}
          </div>
        </div>
      </div>
    </>
  );
};

export default Productfeature;
