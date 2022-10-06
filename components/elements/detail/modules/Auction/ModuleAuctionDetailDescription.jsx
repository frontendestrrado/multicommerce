import React from "react";
import Link from "next/link";

const ModuleAuctionDetailDescription = ({ product }) => (
  <div className="ps-product__desc">
    <p>
      Sold By:
      <Link href={`/seller/${product?.seller_id}`}>
        <a>
          <strong> {product?.seller}</strong>
        </a>
      </Link>
    </p>
    <p>{product?.short_desc ? product?.short_desc : "NA"}</p>
    {/* <ul className="ps-list--dot">
      <li>Unrestrained and portable active stereo speaker</li>
      <li> Free from the confines of wires and chords</li>
      <li> 20 hours of portable capabilities</li>
      <li>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
      <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
    </ul> */}
  </div>
);

export default ModuleAuctionDetailDescription;
