import React from "react";
import Link from "next/link";

const ModuleProductDetailDescription = ({ product }) => {
  return (
    <>
      <div className="ps-product__desc">
        <p>
          Sold By:
          <Link href={`/seller/${product?.product?.seller_id}`}>
            <a>
              <strong> {product?.product?.seller}</strong>
            </a>
          </Link>
          <span className="text-warning">
            {product?.product?.service_status == 1
              ? ""
              : " (Shop Service Unavailable)"}
          </span>
          <span className="text-warning">
            {/* {product?.product?.is_out_of_stock === true &&
            product?.product?.out_of_stock_selling === false
              ? " (Product Out of Stock)"
              : ""} */}
          </span>
        </p>
        <p>
          {product?.product?.short_description
            ? product.product.short_description
            : "NA"}
        </p>
        {/* <ul className="ps-list--dot">
      <li>Unrestrained and portable active stereo speaker</li>
      <li> Free from the confines of wires and chords</li>
      <li> 20 hours of portable capabilities</li>
      <li>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
      <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
    </ul> */}
      </div>
    </>
  );
};

export default ModuleProductDetailDescription;
