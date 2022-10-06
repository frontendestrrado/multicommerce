import React from "react";
import ContainerShop from "~/components/layouts/ContainerShop";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ShockingSaleItems from "~/components/partials/shop/ShockingSaleItems";
import ProductGroupByCarousel from "~/components/partials/product/ProductGroupByCarousel";
import ShopCategories from "~/components/partials/shop/ShopCategories";
import ShopBrands from "~/components/partials/shop/ShopBrands";
import ShopBanner from "~/components/partials/shop/ShopBanner";
import WidgetShockingSaleCategories from "~/components/shared/widgets/WidgetShockingSaleCategories";
import WidgetShockingSaleBrands from "~/components/shared/widgets/WidgetShockingSaleBrands";
import Pricefilterforshockingsale from "~/components/shared/widgets/Pricefilterforshockingsale";

const ShopDefaultPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Shocking Sale",
    },
  ];

  return (
    <ContainerShop title="Shop">
      <div className="ps-page--shop">
        {/* <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" /> */}
        <div className="ps-container">
          {/* <ShopBanner />
          <ShopBrands />
          <ShopCategories /> */}
          <div className="ps-shockingsale-layout ps-layout--shop">
            <div className="ps-layout__left">
              <WidgetShockingSaleCategories />
              <WidgetShockingSaleBrands />
              <Pricefilterforshockingsale />
            </div>
            <div className="ps-layout__right">
              {/* <ProductGroupByCarousel
                collectionSlug="shop-best-seller-items"
                title="Best Sale Items"
              />
              <ProductGroupByCarousel
                collectionSlug="shop-recommend-items"
                title="Recommended Items"
              /> */}
              <ShockingSaleItems columns={6} pageSize={12} />
            </div>
          </div>
        </div>
      </div>
    </ContainerShop>
  );
};
export default ShopDefaultPage;
