import React, { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import {
  carouselFullwidth,
  carouselStandard,
} from "~/utilities/carousel-helpers";
import ProductRelativeProduct1 from "~/components/elements/products/ProductRelativeProduct1";
import ProductRelativeSlider1 from "~/components/elements/products/ProductRelativeSlider1";
import { generateTempArray } from "~/utilities/common-helpers";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";

const RelativePRoductsScroller = ({ homeitems, loading }) => {
  // Views
  const checkdealsobject = (homeitems) => {
    if ("relative_products" in homeitems) {
      return true;
    } else {
      return false;
    }
  };
  let productItemsView;
  if (!loading) {
    if (checkdealsobject && homeitems && homeitems?.relative_products?.length > 0) {
 
      const slideItems =
        homeitems?.relative_products?.length > 5
          ? homeitems?.relative_products?.map((item) => (
              <ProductRelativeSlider1 product={item} key={item.product_id} />
            ))
          : homeitems?.relative_products?.map((item) => (
              <ProductRelativeProduct1 product={item} key={item.product_id} />
            ));

      productItemsView =
        homeitems?.relative_products?.length > 5 ? (
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
        {/* <div className="ps-section__header justify-content-center">
          <div className="ps-block--countdown-deal">
            <div className="ps-block__left">
              <h3>Shop By Category</h3>
              <p className="text-center p-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end vual">
          <Link href="/newdeals">
            <a>View All</a>
          </Link>
        </div> */}
         <div className="ps-section__header">
        <h3>Similar Items</h3>
      </div>
        <div className="ps-section__content">{productItemsView}</div>
      </div>
    </div>
  );
};

export default RelativePRoductsScroller;
