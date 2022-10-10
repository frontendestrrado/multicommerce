import React, { useEffect, useState } from "react";
const Advert = ({ homeitems, loading }) => {

  useEffect(() => {

   
  }, []);


  return (

  <>



  <div className="ps-advert">
    <div className="ps-container">
        <div className="row">
            <div className="col-md-6 mb-30">
                <div className="banner-thumb">
                    <a href="shop-grid-4-column.html" className="zoom-in d-block overflow-hidden">
                        <img src="assets/img/banner/15.jpg" alt="banner-thumb-naile"/>
                    </a>
                </div>
            </div>
            <div className="col-md-6 mb-30">
                <div className="banner-thumb mb-30">
                    <a href="shop-grid-4-column.html" className="zoom-in d-block overflow-hidden">
                        <img src="assets/img/banner/16.jpg" alt="banner-thumb-naile"/>
                    </a>
                </div>
                <div className="banner-thumb">
                    <a href="shop-grid-4-column.html" className="zoom-in d-block overflow-hidden">
                        <img src="assets/img/banner/17.jpg" alt="banner-thumb-naile"/>
                    </a>
                </div>
            </div>
        </div>
    </div>
  </div>




  </>
   
    

  );
};

export default Advert;
/*connect(state => state.media)();*/
