import React from "react";
import Link from "next/link";
import {
  StrapiProductPrice,
  StrapiProductThumbnail,
} from "~/utilities/product-helper";
import Rating from "~/components/elements/Rating";

const BestSellersHome = ({ seller }) => {
  return (
    <div className="ps-product--horizontal">
      <div className="ps-product__thumbnail d-flex justify-content-center">
        {/* {StrapiProductThumbnail(product)} */}
        <a href={`/seller/${seller.seller_id}`}>
          <img
            src={seller.logo || seller.banner}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/static/img/vendor/store/vendor-150x150.jpg";
            }}
            alt={seller.name}
            style={{ height: "95px" }}
          />
        </a>
      </div>
      <div className="ps-product__content">
        <Link href="/seller/[pid]" as={`/seller/${seller.seller_id}`}>
          <a className="ps-product__title">{seller.store_name}</a>
        </Link>

        <div className="ps-product__rating">
          <Rating rating={seller.store_rating} />
          <span>{seller.store_rating}</span>
        </div>
        {/* {StrapiProductPrice(product)} */}
      </div>
    </div>
  );
};

export default BestSellersHome;
