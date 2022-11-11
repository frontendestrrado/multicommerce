import React from "react";
import Link from "next/link";
import {
  homePageProductPriceHelper,
  StrapiProductBadge,
  StrapiProductThumbnailOther,
} from "~/utilities/product-helper";
import Rating from "~/components/elements/Rating";
import ThumbnailHelper from "../../thumbnail/ThumbnailHelper";
import { Image } from "antd";
import ProductThumbnail from "~/components/elements/common/ProductThumbnail";

const ModuleDealOfDayCardProduct11 = ({ product }) => {
  const priceView = homePageProductPriceHelper(product);

  return (
    <>
      <Link href={`/shop?category=${product.id}`}>
        <a>
          <ProductThumbnail imageLink={product.brand_image} />
        </a>
      </Link>
      <div className="ps-product__container text-truncate text-center">
        <Link href={`/shop?category=${product.id}`}>
          <a
            className="ps-product__title text-capitalize"
            style={{
              fontSize: "medium",
              fontWeight: "500",
            }}
          >
            {product.brand_name}
          </a>
        </Link>

        {/* <hr /> */}

        {/* <div className="ps-product__content">
          {priceView} */}

          {/* <Link href={`/seller/${product.seller_id}`}>
            <a className="ps-product__title text-capitalize">
              {product.seller}
            </a>
          </Link> */}
          {/* <div  className="ps-product__rating">
            <Rating rating={product.rating} />
          </div> */}
        {/* </div> */}
      </div>
    </>
  );
};
export default ModuleDealOfDayCardProduct11;
