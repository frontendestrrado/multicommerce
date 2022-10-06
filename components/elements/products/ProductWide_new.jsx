import React from "react";
import Link from "next/link";
import LazyLoad from "react-lazyload";
import { StrapiProductThumbnail } from "~/utilities/product-helper";
import ModuleProductWideActions from "~/components/elements/products/modules/ModuleProductWideActions";

const ProductWide = ({ product }) => {
  return (
    <div className="ps-product ps-product--wide">
      <div className="ps-product__thumbnail">
        <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
          <a>
            <LazyLoad>
              <img
                src={
                  product.image.length > 0
                    ? product.image[0]?.image
                    : "/static/img/vendor/store/vendor-150x150.jpg"
                }
                alt={product.product_name}
                height="150px"
              />
            </LazyLoad>
          </a>
        </Link>
      </div>
      <div className="ps-product__container">
        <div className="ps-product__content">
          <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
            <a className="ps-product__title">{product.product_name}</a>
          </Link>
          <p className="ps-product__vendor">
            Sold by:
            <Link href="/shop">
              <a>{product.seller}</a>
            </Link>
          </p>
          <ul className="ps-product__desc">
            <li>Unrestrained and portable active stereo speaker</li>
            <li> Free from the confines of wires and chords</li>
            <li> 20 hours of portable capabilities</li>
            <li>Double-ended Coil Cord with 3.5mm Stereo Plugs Included</li>
            <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
          </ul>
        </div>
        {/* <ModuleProductWideActions product={product} /> */}
      </div>
    </div>
  );
};

export default ProductWide;
