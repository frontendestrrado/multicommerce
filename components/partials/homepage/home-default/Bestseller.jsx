import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";
import BestSellersHome from "~/components/elements/products/BestSellersHome";
BestSellersHome;

const Bestseller = ({ homeitems }) => {
  const [productItems, setProductItems] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkSalesobject = (homeitems) => {
    if (homeitems) {
      if ("sellers" in homeitems) {
        return true;
      } else {
        return false;
      }
    }
  };
  // Views
  let productItemView;
  if (!loading) {
    if (
      checkSalesobject(homeitems) &&
      homeitems &&
      homeitems.sellers.length > 0
    ) {
      const productItems =
        homeitems.sellers.length > 8
          ? homeitems.sellers.slice(0, 8)
          : homeitems.sellers;
      productItemView = productItems.map((item) => (
        <div
          className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
          key={item.seller_id}
        >
          <BestSellersHome seller={item} />
        </div>
      ));
    } else {
      productItemView = <p>No product found.</p>;
    }
  } else {
    productItemView = <p>Loading...</p>;
  }
  return (
    <div className="ps-product-list ps-new-arrivals home-bestseller">
      <div className="ps-container">
        <div className="ps-section__header">
          <h3>Best Seller</h3>
          <ul className="ps-section__links">
            <li>
              <Link href="/seller">
                <a>View All</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="ps-section__content">
          <div className="row" style={{ padding: "20px" }}>
            {productItemView}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestseller;
