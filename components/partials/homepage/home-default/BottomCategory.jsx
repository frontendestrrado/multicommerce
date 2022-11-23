import React, { useEffect, useState } from "react";
import Link from "next/link";
const BottomCategory = ({ homeitems, loading }) => {

  useEffect(() => {

   
  }, []);

  let mainCarouselView;
  if (!loading && homeitems?.second_category?.length > 0) {

    mainCarouselView = (
        <div className="row">
            <div className="col">
                <div className="organic-food-fresh-banner">

                    <div className="offer-banner">
                        <a href="product-style-2.html" className="banner-hover">
                            <img src={homeitems.second_category[0].subcategory_image} alt="offer-banner" className="img-fluid"/> 
                        </a>
                        <div className="banner-content">
                            <span>{homeitems.second_category[0].subcategory_name}</span>
                             <h2>{homeitems.category[0].media}</h2>
                             <Link href={`/shop?subcategory_id=${homeitems.second_category[0].id}`}>
                            <a href="product-style-2.html" className="btn-style2">Shop now</a>
                            </Link>
                        </div>
                    </div>
                
                    <div className="offer-banner">
                        <a href="product-style-2.html" className="banner-hover">
                        <img src={homeitems.second_category[1].subcategory_image} alt="offer-banner" className="img-fluid"/>
                        </a>
                        <div className="banner-content">
                            <span>{homeitems.second_category[1].subcategory_name}</span>
                             <h2>{homeitems.category[0].media}</h2> 
                             <Link href={`/shop?subcategory_id=${homeitems.second_category[1].id}`}>
                            <a href="product-style-2.html" className="btn-style2">Shop now</a>
                            </Link>
                        </div>
                    </div>
                
                    <div className="offer-banner">
                        <a href="product-style-2.html" className="banner-hover">
                        <img src={homeitems.second_category[2].subcategory_image} alt="offer-banner" className="img-fluid"/> 
                        </a>
                        <div className="banner-content">
                            <span>{homeitems.second_category[2].subcategory_name}</span>
                             <h2>{homeitems.category[0].media}</h2> 
                             <Link href={`/shop?subcategory_id=${homeitems.second_category[2].id}`}>
                            <a href="product-style-2.html" className="btn-style2">Shop now</a>
                            </Link>
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
