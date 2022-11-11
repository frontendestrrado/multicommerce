// import React, { useEffect, useState } from "react";
// const Brand = ({ homeitems, loading }) => {

//   useEffect(() => {

   
//   }, []);

//   let mainCarouselView;
//   if (!loading && homeitems?.brands?.length > 0) {

//     mainCarouselView = (
       
//         homeitems.brands.slice(0,6).map((item, index) => (
//         <div className="col-md-2">
//             <div className="offer-banner">
//                 <a href="product-style-2.html" className="banner-hover">
//                      <img src={item.brand_image} alt="offer-banner" className="img-fluid"/> 
//                 </a>
//                 <div className="banner-content">
//                     <span>{item.brand_name}</span>
//                 </div>
//             </div>
//         </div>
//         ))
   
//      )

//   }
//   return (

//   <>



//   <div className="ps-bottomcategory">
//     <div className="ps-container">
//     <div className="row">
//        {mainCarouselView}
//        </div>
//     </div>
//   </div>




//   </>
   
    

//   );
// };

// export default Brand;
// /*connect(state => state.media)();*/

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import {
  carouselFullwidth,
  carouselStandard,
} from "~/utilities/carousel-helpers";
import ProductDealOfDay11 from "~/components/elements/products/ProductDealOfDay11";
import ProductDealOfDaySlider11 from "~/components/elements/products/ProductDealOfDaySlider11";
import { generateTempArray } from "~/utilities/common-helpers";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";

const Brand = ({ homeitems, loading }) => {
  // Views
  const checkdealsobject = (homeitems) => {
    if ("brands" in homeitems) {
      return true;
    } else {
      return false;
    }
  };
  let productItemsView;
  if (!loading) {
    if (checkdealsobject && homeitems && homeitems?.brands?.length > 0) {
 
      const slideItems =
        homeitems?.brands?.length > 5
          ? homeitems?.brands?.map((item) => (
              <ProductDealOfDaySlider11 product={item} key={item.brands} />
            ))
          : homeitems?.brands?.map((item) => (
              <ProductDealOfDay11 product={item} key={item.brands} />
            ));

      productItemsView =
        homeitems?.brands?.length > 5 ? (
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
              <h3>Brands You Must Try</h3>
              <p className="text-center p-3">A vertual assistant collects the product from your list.</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end vual">
        <Link href={`/shop`}>
            <a>View All</a>
          </Link>
        </div>
        <div className="ps-section__content">{productItemsView}</div>
      </div>
    </div>
  );
};

export default Brand;

