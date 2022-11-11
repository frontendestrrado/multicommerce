import React, { useEffect, useState } from "react";
const Advert = ({ homeitems, loading }) => {

  useEffect(() => {
console.log("....33333333...",homeitems)
   
  }, []);
  let mainCarouselView;
  if (!loading && homeitems?.web_banners?.web_middle_large?.length > 0) {
    mainCarouselView =(
    <div className="row">
    <div className="col-md-6 mb-30">
        <div className="banner-thumb">
            <a href="shop-grid-4-column.html" className="zoom-in d-block overflow-hidden">
                <img src={homeitems.web_banners.web_middle_large[0].media} alt="banner-thumb-naile"/>
            </a>
        </div>
    </div>
    <div className="col-md-6 mb-30">
        <div className="banner-thumb mb-30">
            <a href="shop-grid-4-column.html" className="zoom-in d-block overflow-hidden">
                <img src={homeitems.web_banners.web_middle_small[0].media} alt="banner-thumb-naile"/>
            </a>
        </div>
        <div className="banner-thumb">
            <a href="shop-grid-4-column.html" className="zoom-in d-block overflow-hidden">
                <img src={homeitems.web_banners.web_middle_small[1].media} alt="banner-thumb-naile"/>
            </a>
        </div>
    </div>
</div>)
    // const carouseItems = homeitems.main_banner.map((item, index) => (
    //   <div key={index}>{mainBannerMedia(item)}</div>
    // ));
    // mainCarouselView = (
    //   <Slider {...carouselStandard} className="ps-carousel">
    //     {carouseItems}
    //   </Slider>
    // );
  }
  return (

  <>



  <div className="ps-advert">
    <div className="ps-container">
      {mainCarouselView}
    </div>
  </div>




  </>
   
    

  );
};

export default Advert;
/*connect(state => state.media)();*/
