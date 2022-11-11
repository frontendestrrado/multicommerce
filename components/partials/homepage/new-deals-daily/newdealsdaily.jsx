import React, { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import {
  carouselFullwidth,
  carouselStandard1,
} from "~/utilities/carousel-helpers";
import ProductDealOfDay from "~/components/elements/products/ProductDealOfDay";
import ProductDealOfDaySlider from "~/components/elements/products/ProductDealOfDaySlider";
import { generateTempArray } from "~/utilities/common-helpers";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";

const Newdealsdaily = ({ homeitems, loading }) => {
  // Views
  console.log("...kkkkkkkk....",homeitems)
  const checkdealsobject = (homeitems) => {
    if ("products" in homeitems) {
      return true;
    } else {
      return false;
    }
  };
  let productItemsView;
  if (!loading) {
    if (checkdealsobject && homeitems && homeitems?.products?.length > 0) {
 
      const slideItems =
        homeitems?.products?.length > 5
          ? homeitems?.products?.map((item) => (
              <ProductDealOfDaySlider product={item} key={item.product_id} />
            ))
          : homeitems?.products?.map((item) => (
              <ProductDealOfDay product={item} key={item.product_id} />
            ));

      productItemsView =
        homeitems?.products?.length > 5 ? (
          <Slider {...carouselStandard1} className="ps-carousel outside">
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
      <div className="col-xl-3 col-lg-3 col-md-3" key={item}>
        <SkeletonProduct />
      </div>
    ));
    productItemsView = <div className="row">{skeletons}</div>;
  }

  return (
    <div className="ps-deal-of-day newarrivals">
      <div className="ps-container">
      <div className="ps-section__header justify-content-center">
          <div className="ps-block--countdown-deal">
            <div className="ps-block__left">
              <h3>New Arrivals</h3>
              <p className="text-center p-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end vual">
          <Link href="/newdeals">
            <a>View All</a>
          </Link>
        </div>
        <div className="ps-section__content">{productItemsView}</div>
      </div>
    </div>
  );
};

export default Newdealsdaily;
