import React, { useEffect, useState } from "react";
const Brand = ({ homeitems, loading }) => {

  useEffect(() => {

   
  }, []);

  let mainCarouselView;
  if (!loading && homeitems?.brands?.length > 0) {

    mainCarouselView = (
       
        homeitems.brands.slice(0,6).map((item, index) => (
        <div className="col-md-2">
            <div className="offer-banner">
                <a href="product-style-2.html" className="banner-hover">
                     <img src={item.brand_image} alt="offer-banner" className="img-fluid"/> 
                </a>
                <div className="banner-content">
                    <span>{item.brand_name}</span>
                </div>
            </div>
        </div>
        ))
   
     )

  }
  return (

  <>



  <div className="ps-bottomcategory">
    <div className="ps-container">
    <div className="row">
       {mainCarouselView}
       </div>
    </div>
  </div>




  </>
   
    

  );
};

export default Brand;
/*connect(state => state.media)();*/
