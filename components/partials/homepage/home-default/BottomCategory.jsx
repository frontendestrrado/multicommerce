import React, { useEffect, useState } from "react";
const BottomCategory = ({ homeitems, loading }) => {

  useEffect(() => {

   
  }, []);

  let mainCarouselView;
  if (!loading && homeitems?.category?.length > 0) {

    mainCarouselView = (
        <div className="row">
            <div className="col">
                <div className="organic-food-fresh-banner">

                    <div className="offer-banner">
                        <a href="product-style-2.html" className="banner-hover">
                            <img src={homeitems.category[0].image} alt="offer-banner" className="img-fluid"/> 
                        </a>
                        <div className="banner-content">
                            <span>{homeitems.category[0].category_name}</span>
                             <h2>{homeitems.category[0].media}</h2>
                            <a href="product-style-2.html" className="btn-style2">Shop now</a>
                        </div>
                    </div>
                
                    <div className="offer-banner">
                        <a href="product-style-2.html" className="banner-hover">
                        <img src={homeitems.category[0].image} alt="offer-banner" className="img-fluid"/>
                        </a>
                        <div className="banner-content">
                            <span>{homeitems.category[0].category_name}</span>
                             <h2>{homeitems.category[0].media}</h2> 
                            <a href="product-style-2.html" className="btn-style2">Shop now</a>
                        </div>
                    </div>
                
                    <div className="offer-banner">
                        <a href="product-style-2.html" className="banner-hover">
                        <img src={homeitems.category[0].image} alt="offer-banner" className="img-fluid"/> 
                        </a>
                        <div className="banner-content">
                            <span>{homeitems.category[0].category_name}</span>
                             <h2>{homeitems.category[0].media}</h2> 
                            <a href="product-style-2.html" className="btn-style2">Shop now</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
     )

  }
  return (

  <>



  <div className="ps-bottomcategory">
    <div className="ps-container">
       {mainCarouselView}
    </div>
  </div>




  </>
   
    

  );
};

export default BottomCategory;
/*connect(state => state.media)();*/
