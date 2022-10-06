import React from "react";
import Rating from "~/components/elements/Rating";
import Link from "next/link";

const SellerStoreDetails = ({ source }) => {
  return (
    <article className="ps-block--store-2">
      <div
        className="ps-block__content bg--cover"
        style={{
          background: `url('/static/img/vendor/store/default-store-banner.png')`,
        }}
      >
        <figure>
          <h4 className="">
            <Link href="/seller/[slug]" as={`/seller/${source.seller_id}`}>
              <a>{source.store_name}</a>
            </Link>
          </h4>

          <div className="ps-block__rating">
            <Rating rating={source.store_rating} />
          </div>
          {/* <p>{source.address}</p>
          {source.phone && (
            <p>
              <i className="icon-telephone"></i> {source.phone}
            </p>
          )} */}
        </figure>
      </div>
      <div className="ps-block__author">
        <Link href="/seller/[slug]" as={`/seller/${source.seller_id}`}>
          <a className="ps-block__user d-flex justify-content-center">
            <img
              src={source.logo || source.banner}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/static/img/vendor/store/vendor-150x150.jpg";
              }}
              alt={source.name}
            />
          </a>
        </Link>

        <Link href="/seller/[slug]" as={`/seller/${source.seller_id}`}>
          <a className="ps-btn">Visit Store</a>
        </Link>
      </div>
    </article>
  );
};

export default SellerStoreDetails;
