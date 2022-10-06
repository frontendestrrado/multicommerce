import React, { useEffect, useState } from "react";
const FeatureAndRecent = ({ homeitems, loading }) => {

  useEffect(() => {

   
  }, []);


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
                        <div className="product-list mb-30">
                            <div className="card product-card border-0">
                                <div className="card-body p-0">
                                    <div className="media">
                                        <div className="product-thumbnail">
                                            <a href="single-product.html">
                                                {/* <img className="first-img" src="assets/img/category/1.jpg" alt="thumbnail">
                                                <img className="second-img" src="assets/img/category/1.1.jpg" alt="thumbnail"> */}
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
                                                {/* <img className="first-img" src="assets/img/category/2.jpg" alt="thumbnail"> */}
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
                                                {/* <img className="first-img" src="assets/img/category/3.jpg" alt="thumbnail">
                                                <img className="second-img" src="assets/img/category/3.1.jpg" alt="thumbnail"> */}
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
                                                {/* <img className="first-img" src="assets/img/category/4.jpg" alt="thumbnail">
                                                <img className="second-img" src="assets/img/category/4.1.jpg"
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
            <div className="col-12 col-md-8 mx-auto col-lg-4 mb-50">
                <div className="banner-thumb">
                    <a href="shop-grid-4-column.html"
                        className="zoom-in d-block overflow-hidden position-relative zIndex-3">
                        {/* <img src="assets/img/banner/18.jpg" alt="banner-thumb-naile"> */}
                    </a>
                </div>
            </div>
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
