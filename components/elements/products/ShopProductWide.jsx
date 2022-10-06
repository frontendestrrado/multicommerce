import React from "react";
import Link from "next/link";
import { Shockingproductthumbnail } from "~/utilities/product-helper";
import ModuleProductShopWideActions from "~/components/elements/products/modules/ModuleProductShopWideActions";
import Rating from "../Rating";

const ShopProductWide = ({ product }) => {
  return (
    <div className="ps-product ps-product--wide">
      <div className="ps-product__thumbnail">
        {Shockingproductthumbnail(product)}
      </div>
      <div className="ps-product__container">
        <div className="ps-product__content">
          <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
            <a className="ps-product__title">{product.product_name}</a>
          </Link>
          <p className="ps-product__vendor">
            Sold by:
            <Link href={`/seller/${product.seller_id}`}>
              <a>{product.seller}</a>
            </Link>
          </p>
          <p>{product.short_description}</p>
          <div className="ps-product__rating">
            <Rating rating={product.rating} />
            <span>{product.rating}</span>
          </div>
          {/* <ul className="ps-product__desc">
            <li>Unrestrained and portable active stereo speaker</li>
            <li> Free from the confines of wires and chords</li>
            <li> 20 hours of portable capabilities</li>
            <li>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
            <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
          </ul> */}
        </div>
        <ModuleProductShopWideActions product={product} />
      </div>
    </div>
  );
};

export default ShopProductWide;
