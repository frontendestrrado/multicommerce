import React, { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import {
  carouselFullwidth,
  carouselStandard,
} from "~/utilities/carousel-helpers";
import ProductDealOfDay1 from "~/components/elements/products/ProductDealOfDay1";
import ProductDealOfDaySlider1 from "~/components/elements/products/ProductDealOfDaySlider1";
import { generateTempArray } from "~/utilities/common-helpers";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";

const Newdealsdaily = ({ homeitems, loading }) => {
  // Views
  const checkdealsobject = (homeitems) => {
    if ("category" in homeitems) {
      return true;
    } else {
      return false;
    }
  };
  let productItemsView;
  if (!loading) {
    if (checkdealsobject && homeitems && homeitems?.category?.length > 0) {
 
      const slideItems =
        homeitems?.category?.length > 5
          ? homeitems?.category?.map((item) => (
              <ProductDealOfDaySlider1 product={item} key={item.id} />
            ))
          : homeitems?.category?.map((item) => (
              <ProductDealOfDay1 product={item} key={item.id} />
            ));

      productItemsView =
        homeitems?.category?.length > 5 ? (
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
      <div className="col-xl-3 col-lg-3 col-md-3" key={item}>
        <SkeletonProduct />
      </div>
    ));
    productItemsView = <div className="row">{skeletons}</div>;
  }

  return (
    <div className="ps-deal-of-day newdealsdaily cate">
      <div className="ps-container">
        <div className="ps-section__header justify-content-center">
          <div className="ps-block--countdown-deal">
            <div className="ps-block__left">
              <h3>Shop By Category</h3>
              <p className="text-center p-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end vual">
        <Link href={`/shop`}>
            <a>View All</a>
          </Link>
        </div>
        <div className="ps-section__content shpcate">{productItemsView}</div>
      </div>
    </div>
  );
};

export default Newdealsdaily;
