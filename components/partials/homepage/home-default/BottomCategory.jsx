import React, { useEffect, useState } from "react";
const BottomCategory = ({ homeitems, loading }) => {

  useEffect(() => {

   
  }, []);


  return (

  <>



  <div className="ps-bottomcategory">
    <div className="ps-container">
        <div className="row">
            <div className="col-md-4">
                <div className="offer-banner">
                    <a href="product-style-2.html" className="banner-hover">
                        {/* <img src="image/home-9/banner-1.jpg" alt="offer-banner" className="img-fluid"> */}
                    </a>
                    <div className="banner-content">
                        <span>Fresh food</span>
                        <h2>Oraganic and fresh 30% off</h2>
                        <a href="product-style-2.html" className="btn-style2">Shop now</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="offer-banner">
                    <a href="product-style-2.html" className="banner-hover">
                        {/* <img src="image/home-9/banner-1.jpg" alt="offer-banner" className="img-fluid"> */}
                    </a>
                    <div className="banner-content">
                        <span>Fresh food</span>
                        <h2>Oraganic and fresh 30% off</h2>
                        <a href="product-style-2.html" className="btn-style2">Shop now</a>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="offer-banner">
                    <a href="product-style-2.html" className="banner-hover">
                        {/* <img src="image/home-9/banner-1.jpg" alt="offer-banner" className="img-fluid"> */}
                    </a>
                    <div className="banner-content">
                        <span>Fresh food</span>
                        <h2>Oraganic and fresh 30% off</h2>
                        <a href="product-style-2.html" className="btn-style2">Shop now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>




  </>
   
    

  );
};

export default BottomCategory;
/*connect(state => state.media)();*/
