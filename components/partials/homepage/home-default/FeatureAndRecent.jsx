import React, { useEffect, useState } from "react";
import Link from "next/link";
const FeatureAndRecent = ({ homeitems, getFeatureProduct, loading }) => {

  useEffect(() => {

   console.log(".....f....",getFeatureProduct)
  }, []);
  console.log(".....f.1...",getFeatureProduct)
  let mainCarouselView;
  if (!loading && getFeatureProduct?.products?.length > 0) {
    mainCarouselView = (
        getFeatureProduct.products.slice(0, 3).map((item, index) => (
        <div className="product-list mb-30">
        <div className="card product-card border-0">
            <div className="card-body p-0">
                <div className="media">
                    <div className="product-thumbnail"style={{display : item.image.length > 0 ? 'block':'none'}}>

                    <Link href="/product/[pid]" as={`/product/${item.product_id}`}>
                        <a href="single-product.html">
                             <img className="first-img" src={item.image.length > 0 ? item.image[0].thumbnail :''} alt="thumbnail"/>  
                        </a>
                        </Link>
                    </div>
                    <div className="media-body">
                        <div className="product-desc">
                            <h3 className="title"><a href="shop-grid-4-column.html">{item.product_name}</a></h3>
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className="product-price">SAR {item.actual_price}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     ))
    );
  }
  let mainCarouselView2;
  if (!loading && getFeatureProduct?.products?.length > 0) {
    mainCarouselView2 = (
        getFeatureProduct.products.slice(3, 6).map((item1, index1) => (
        <div className="product-list mb-30">
        <div className="card product-card border-0">
            <div className="card-body p-0">
                <div className="media">
                    <div className="product-thumbnail"style={{display : item1.image.length > 0 ? 'block':'none'}}>

                    <Link href="/product/[pid]" as={`/product/${item1.product_id}`}>
                        <a href="single-product.html">
                             <img className="first-img" src={item1.image.length > 0 ? item1.image[0].thumbnail :''} alt="thumbnail"/>  
                        </a>
                        </Link>
                    </div>
                    <div className="media-body">
                        <div className="product-desc">
                            <h3 className="title"><a href="shop-grid-4-column.html">{item1.product_name}</a></h3>
                            <div className="d-flex align-items-center justify-content-between">
                                <h6 className="product-price">SAR {item1.actual_price}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     ))
    );
  }

  
  let mainCarouselView1;
  if (!loading && homeitems?.web_banners?.web_bottom?.length > 0) {
    // const carouseItems = homeitems.main_banner.map((item, index) => (
    //   <div key={index}>{mainBannerMedia(item)}</div>
    // ));
    mainCarouselView1 = (
        <div className="col-12 col-md-8 mx-auto col-lg-4 mb-50" style={{display : homeitems.web_banners.web_bottom.length > 0 ? 'block':'none'}}>
<Link href={`/shop?`}>
        <div className="banner-thumb">
            <a href="shop-grid-4-column.html"
                className="zoom-in d-block overflow-hidden position-relative zIndex-3">
                 <img src={homeitems.web_banners.web_bottom.length > 0 ? homeitems.web_banners.web_bottom[0].media :''} alt="banner-thumb-naile"/> 
            </a>
        </div>
        </Link>
    </div>
    )
    
  }
  return (

  <>

    <div className="featurandrecent">
    <div className="ps-container">
        <div className="row">
            <div className="col-12 col-lg-4 mb-50">
                <div className="section-title mb-30">
                    <h2 className="title text-dark text-capitalize">Featured products </h2>
                </div>
                <div className="featured-init">
                    <div className="slider-item">
                    {mainCarouselView}
                  

                    </div>

                </div>
            </div>
            {mainCarouselView1}
            <div className="col-12 col-lg-4 mb-50">
                <div className="section-title mb-30">
                    <h2 className="title text-dark text-capitalize">Featured products</h2>
                </div>
                <div className="featured-init2 slick-nav">
                    <div className="slider-item">
                        

                     
                    {mainCarouselView2}
                    </div>

                </div>
            </div>
        </div>
    </div>
    </div>


  </>
   
    
   
  );
};

export default FeatureAndRecent;
/*connect(state => state.media)();*/
