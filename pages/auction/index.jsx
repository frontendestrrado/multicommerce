import React from "react";
import ContainerShop from "~/components/layouts/ContainerShop";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ShopItems from "~/components/partials/shop/ShopItems";
import ProductGroupByCarousel from "~/components/partials/product/ProductGroupByCarousel";
import ShopCategories from "~/components/partials/shop/ShopCategories";
import ShopBrands from "~/components/partials/shop/ShopBrands";
import ShopBanner from "~/components/partials/shop/ShopBanner";
import WidgetShopCategories from "~/components/shared/widgets/WidgetShopCategories";
import WidgetShopBrands from "~/components/shared/widgets/WidgetShopBrands";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
import AuctionItems from "~/components/partials/homepage/auction/AuctionItems";

const AuctionDefaultPage = () => {
  return (
    <ContainerShop title="Shop">
      <div className="ps-page--shop">
        {/* <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" /> */}
        <div className="ps-container">
          {/* <ShopBanner /> */}
          {/* <ShopBrands />
                  <ShopCategories /> */}
          <div className="ps-layout--shop">
            {/* <div className="ps-layout__left">
              <WidgetShopCategories />
              <WidgetShopBrands />
              <WidgetShopFilterByPriceRange />
            </div> */}
            {/* <div className="ps-layout__right"> */}
            {/* <ProductGroupByCarousel
                              collectionSlug="shop-best-seller-items"
                              title="Best Sale Items"
                          />
                          <ProductGroupByCarousel
                              collectionSlug="shop-recommend-items"
                              title="Recommended Items"
                          /> */}
            {/* <ShopItems columns={6} pageSize={12} /> */}
            <AuctionItems columns={6} pageSize={12} />
            {/* </div> */}
          </div>
        </div>
      </div>
    </ContainerShop>
  );
};

export default AuctionDefaultPage;
