import React from "react";
import Link from "next/link";
import Rating from "~/components/elements/Rating";

const ModuleSellerDetailDescription = ({ product }) => {
  return (
    <div className="ps-product__desc">
      <div className="mt-2">
        <span className="font-weight-bold">Store Product Rating: </span>
        <Rating rating={product.store_prd_rating} />
      </div>
      <div className="mt-4">
        <address>
          <h5>Store Address:</h5>
          <p>
            <span>
              {product.address_line1 ? `${product.address_line1}, ` : ""}
            </span>
            <span>
              {product.address_line2 ? `${product.address_line1}, ` : ""}
            </span>
            <span>{product.city ? `${product.city}, ` : ""}</span>
            <span>{product.state ? `${product.state}, ` : ""}</span>
            <span>{product.country ? `${product.country}` : ""}</span>
          </p>
        </address>
      </div>
    </div>
  );
};

export default ModuleSellerDetailDescription;
