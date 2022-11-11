import React, { useEffect, useState } from "react";
import Link from "next/link";
const FeatureAndRecent = ({ homeitems, getFeatureProduct, loading }) => {

  useEffect(() => {

   console.log(".....f....",getFeatureProduct)
  }, []);

  let mainCarouselView;
  if (!loading && getFeatureProduct?.products?.length > 0) {
    // const carouseItems = homeitems.main_banner.map((item, index) => (
    //   <div key={index}>{mainBannerMedia(item)}</div>
    // ));
    mainCarouselView = (
        homeitems.featured_products.slice(0, 3).map((item, index) => (
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

  
  let mainCarouselView1;
  if (!loading && homeitems?.center_offer_banner?.length > 0) {
    // const carouseItems = homeitems.main_banner.map((item, index) => (
    //   <div key={index}>{mainBannerMedia(item)}</div>
    // ));
    mainCarouselView1 = (
        <div className="col-12 col-md-8 mx-auto col-lg-4 mb-50" style={{display : homeitems.center_offer_banner.length > 0 ? 'block':'none'}}>
        <div className="banner-thumb">
            <a href="shop-grid-4-column.html"
                className="zoom-in d-block overflow-hidden position-relative zIndex-3">
                 <img src={homeitems.center_offer_banner.length > 0 ? homeitems.center_offer_banner[0].media :''} alt="banner-thumb-naile"/> 
            </a>
        </div>
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
                    <h2 className="title text-dark text-capitalize">Recommended Products</h2>
                </div>
                <div className="featured-init2 slick-nav">
                    <div className="slider-item">
                        <div className="product-list mb-30">
                            <div className="card product-card border-0">
                                <div className="card-body p-0">
                                    <div className="media">
                                        <div className="product-thumbnail">
                                            <a href="single-product.html">
                                                {/* <img className="first-img" src="assets/img/category/5.jpg" alt="thumbnail"> */}
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <div className="product-desc">
                                                <h3 className="title"><a href="shop-grid-4-column.html">Brixton Patrol All
                                                        Terrain Anorak Jacket</a></h3>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="product-price">$11.90</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product-list mb-30">
                            <div className="card product-card border-0">
                                <div className="card-body p-0">
                                    <div className="media">
                                        <div className="product-thumbnail">
                                            <a href="single-product.html">
                                                {/* <img className="first-img" src="assets/img/category/6.jpg" alt="thumbnail"> */}
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <div className="product-desc">
                                                <h3 className="title"><a href="shop-grid-4-column.html">Juicy Couture Solid
                                                        Sleeve Puffer Jacket</a></h3>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="product-price">$11.90</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product-list mb-30">
                            <div className="card product-card border-0">
                                <div className="card-body p-0">
                                    <div className="media">
                                        <div className="product-thumbnail">
                                            <a href="single-product.html">
                                                {/* <img className="first-img" src="assets/img/category/7.jpg" alt="thumbnail"> */}
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <div className="product-desc">
                                                <h3 className="title"><a href="shop-grid-4-column.html">New Balance Fresh
                                                        Foam LAZR v1 Sport</a></h3>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="product-price">$11.90</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="product-list">
                            <div className="card product-card border-0">
                                <div className="card-body p-0">
                                    <div className="media">
                                        <div className="product-thumbnail">
                                            <a href="single-product.html">
                                                {/* <img className="first-img" src="assets/img/category/8.jpg" alt="thumbnail">
                                                <img className="second-img" src="assets/img/category/8.1.jpg"
                                                    alt="thumbnail"> */}
                                            </a>
                                        </div>
                                        <div className="media-body">
                                            <div className="product-desc">
                                                <h3 className="title"><a href="shop-grid-4-column.html">Couture Juicy
                                                        Quilted Terry Track Jacket</a></h3>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="product-price">$11.90</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

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
