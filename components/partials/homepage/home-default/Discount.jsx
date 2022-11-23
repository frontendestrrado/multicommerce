import React, { useEffect, useState } from "react";
import Link from "next/link";
const Discount= ({ getOfferData, homeitems, loading }) => {

  useEffect(() => {

   
  }, []);
  let mainCarouselView;
  if (!loading && homeitems?.first_category?.length > 0) {
    // const carouseItems = homeitems.main_banner.map((item, index) => (
    //   <div key={index}>{mainBannerMedia(item)}</div>
    // ));
    mainCarouselView = (
      <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="offer-single">
              <div className="offer-shape-text">
                <h5>{homeitems.first_category[0].subcategory_name}</h5>
                <Link href={`/shop?subcategory_id=${homeitems.first_category[0].id}`}>
                <a href="product.html" className="eg-btn offer-btn btn--capsule">Shop Now</a>
                </Link>
              </div>
           <img src={homeitems.first_category[0].subcategory_image} alt=""/> 
            </div>
          </div>
        <div className="col-lg-4 col-md-6">
          <div className="offer-single">
            <div className="offer-shape2">
              {/* <span>25% Off</span> */}
              <h5>{homeitems.first_category[1].subcategory_name}</h5>
              <Link href={`/shop?subcategory_id=${homeitems.first_category[1].id}`}>
              <a href="product.html" className="eg-btn offer-btn2 btn--capsule">Shop Now</a>
              </Link>
            </div>
          <img src={homeitems.first_category[1].subcategory_image} alt=""/> 
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="offer-single">
            <div className="offer-shape-text">
              <h5>{homeitems.first_category[2].subcategory_name}</h5>
              <Link href={`/shop?subcategory_id=${homeitems.first_category[2].id}`}>
              <a href="product.html" className="eg-btn offer-btn btn--capsule">Shop Now</a>
              </Link>
            </div>
            
           <img src={homeitems.first_category[2].subcategory_image}  alt=""/> 
           
          </div>
        </div>
      </div>
    );
  }


  return (

  <>



  <div className="ps-discount">
    <div className="ps-container">
     {mainCarouselView}
    </div>
  </div>




  </>
   
    

  );
};

export default Discount;
/*connect(state => state.media)();*/
