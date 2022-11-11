import React from "react";
import Rating from "~/components/elements/Rating";

const ModuleSellerTopInformation = ({ product }) => {
  // Views
  let priceView;
  if (product.actual_price > product.sale_price) {
    priceView = (
      <h4 className="ps-product__price sale">
        <del className="mr-2">SAR{product.sale_price}</del>
        SAR
        {product.sale_price}
      </h4>
    );
  } else {
    priceView = (
      <h4 className="ps-product__price">SAR {product.actual_price}</h4>
    );
  }
  return (
    <header>
      <h1>{product.store_name}</h1>
      <div className="ps-product__rating">
        <span className="font-weight-bold"> Store Rating:</span>{" "}
        <Rating rating={product.store_rating} />
      </div>
      <div className="ps-product__meta mt-5">
        <div>
          <p>
            Join Date:{" "}
            <span className="font-weight-bold">{product.join_date}</span>
          </p>
        </div>
        <div>
          <p>
            No. Of Products:{" "}
            <span className="font-weight-bold">{product.no_of_products}</span>
          </p>
        </div>
        <div>
          <p>
            Total Orders:{" "}
            <span className="font-weight-bold">{product.total_orders}</span>
          </p>
        </div>
      </div>
      <p>{product.about}</p>
    </header>
  );
};

export default ModuleSellerTopInformation;
