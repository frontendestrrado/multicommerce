import React from "react";
import Link from "next/link";
import Rating from "~/components/elements/Rating";
import {
  currencyHelperConvertToRinggit,
  homePageProductPriceHelper,
  priceHelper,
} from "~/utilities/product-helper";

const ModuleDetailTopInformation = ({ product }) => {
  // Views
  let priceView = homePageProductPriceHelper(product.product);

  return (
    <header>
      <h1>{product?.product?.product_name}</h1>
      <div className="ps-product__meta">
        <p>
          Brand:
          <Link href="/shop">
            <a className="ml-2 text-capitalize">
              {product?.product?.brand_name}
            </a>
          </Link>
        </p>
        <div className="ps-product__rating">
          <Rating rating={product?.product?.rating} />
          <span>
            ( {product?.total_review ? product?.total_review : 0} review)
          </span>
        </div>
      </div>
      {product?.product?.product_type == "config" ? null : priceView}
    </header>
  );
};

export default ModuleDetailTopInformation;
