import React from "react";
import ContainerShop from "~/components/layouts/ContainerShop";
import ShopItems from "~/components/partials/shop/ShopItems";
import WidgetShopCategories from "~/components/shared/widgets/WidgetShopCategories";
import WidgetShopBrands from "~/components/shared/widgets/WidgetShopBrands";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
import ShopItemsNewDeals from "~/components/partials/homepage/new-deals-daily/ShopItemNewDeals";

const NewDealsDefaultPage = () => {
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
    <ContainerShop title="New Deals">
      <div className="ps-page--shop">
        <div className="ps-container">
          <div className="ps-layout--shop">
            <div className="ps-layout__left">
              <WidgetShopCategories />
              <WidgetShopBrands />
              <WidgetShopFilterByPriceRange />
            </div>
            <div className="ps-layout__right">
              <ShopItemsNewDeals columns={6} pageSize={12} />
            </div>
          </div>
        </div>
      </div>
    </ContainerShop>
  );
};
export default NewDealsDefaultPage;
