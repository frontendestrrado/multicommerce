import React, { useEffect, useState } from "react";
const Discount= ({ homeitems, loading }) => {

  useEffect(() => {

   
  }, []);


  return (

  <>



  <div className="ps-discount">
    <div className="ps-container">
      <div className="row g-4 justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div className="offer-single">
              <div className="offer-shape-text">
                <h5>Fresh Fruits Iteam With 25% Discount</h5>
                <a href="product.html" className="eg-btn offer-btn btn--capsule">Shop Now</a>
              </div>
            {/* <img src="assets/images/banner/offer-banner1.jpg" alt=""> */}
            </div>
          </div>
        <div className="col-lg-4 col-md-6">
          <div className="offer-single">
            <div className="offer-shape2">
              <span>25% Off</span>
              <h5>Weekly Special Offers on Vegetable</h5>
              <a href="product.html" className="eg-btn offer-btn2 btn--capsule">Shop Now</a>
            </div>
          {/* <img src="assets/images/banner/offer-banner-2.jpg" alt=""> */}
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="offer-single">
            <div className="offer-shape-text">
              <h5>Fresh Fruits Iteam With 25% Discount</h5>
              <a href="product.html" className="eg-btn offer-btn btn--capsule">Shop Now</a>
            </div>
          {/* <img src="assets/images/banner/offer-banner3.jpg" alt=""> */}
          </div>
        </div>
      </div>
    </div>
  </div>




  </>
   
    

  );
};

export default Discount;
/*connect(state => state.media)();*/
