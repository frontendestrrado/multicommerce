import React from "react";
import ContainerShop from "~/components/layouts/ContainerShop";
import WidgetShopCategories from "~/components/shared/widgets/WidgetShopCategories";
import WidgetShopBrands from "~/components/shared/widgets/WidgetShopBrands";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
import ShopItemsShockingSale from "~/components/partials/homepage/shockingsale/ShopItemShockingSale";

const ShockingSaleDefaultPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Shop Default",
    },
  ];

  return (
    <ContainerShop title="Shocking Sale">
      <div className="ps-page--shop">
        <div className="ps-container">
          <div className="ps-layout--shop">
            <div className="ps-layout__left">
              <WidgetShopCategories />
              <WidgetShopBrands />
              <WidgetShopFilterByPriceRange />
            </div>
            <div className="ps-layout__right">
              <ShopItemsShockingSale columns={6} pageSize={12} />
            </div>
          </div>
        </div>
      </div>
    </ContainerShop>
  );
};
export default ShockingSaleDefaultPage;
