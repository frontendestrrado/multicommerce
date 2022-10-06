import React, { useEffect, useState } from "react";
import Link from "next/link";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";
import {
  carouselFullwidth,
  carouselStandard,
} from "~/utilities/carousel-helpers";
import { generateTempArray } from "~/utilities/common-helpers";
import { Productfeatureproducts } from "~/components/partials/product/Productfeatureproducts";
import Slider from "react-slick";

const Featureproducts = ({ title, homeitems, loading }) => {
  const [productItems, setProductItems] = useState(null);

  const checkfeaturesobject = (homeitems) => {
    if ("featured_products" in homeitems) {
      return true;
    } else {
      return false;
    }
  };
  let productItemsView;
  if (!loading) {
    if (
      homeitems &&
      homeitems?.featured_products?.length > 0 &&
      checkfeaturesobject(homeitems)
    ) {
      const newfeatureproduct = homeitems?.featured_products;
      const slideItems = newfeatureproduct.map((item) => {
        return (
          <Productfeatureproducts
            product={item}
            key={item.product_id}
            type="fullwidth"
          />
        );
      });
      productItemsView =
        homeitems?.featured_products?.length > 5 ? (
          <Slider {...carouselStandard} className="ps-carousel outside">
            {slideItems}
          </Slider>
        ) : (
          <div className="align-content-lg-stretch row">{slideItems}</div>
        );
    } else {
      productItemsView = <p>No product(s) found.</p>;
    }
  } else {
    const skeletons = generateTempArray(6).map((item) => (
      <div className="col-xl-3 col-lg-3" key={item}>
        <SkeletonProduct />
      </div>
    ));
    productItemsView = <div className="row">{skeletons}</div>;
  }

  return (
    <div className="ps-product-list home-featureproducts new">
      <div className="ps-container">
        <div className="ps-section__header justify-content-center">
          <div className="ps-block--countdown-deal">
            <div className="ps-block__left">
              <h3>{title}</h3>
              <p className="text-center p-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
          </div>
        </div> 
        <div className="d-flex justify-content-end vual">
          <ul className="ps-section__links">
            <li key={productItems}>
              <Link href={`/featuredproducts`}>
                <a>View All</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="ps-section__content">{productItemsView}</div>
      </div>
    </div>
  );
};

export default Featureproducts;
