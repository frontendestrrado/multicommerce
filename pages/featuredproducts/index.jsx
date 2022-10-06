import React from "react";
import ContainerShop from "~/components/layouts/ContainerShop";
import WidgetShopCategories from "~/components/shared/widgets/WidgetShopCategories";
import WidgetShopBrands from "~/components/shared/widgets/WidgetShopBrands";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
import ShopItemsShockingSale from "~/components/partials/homepage/shockingsale/ShopItemShockingSale";
import ShopItemsFeatureProducts from "~/components/partials/homepage/featureproducts/ShopItemsFeatureProducts";

const FeaturedProductsDefaultPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Featured Products",
    },
  ];

  return (
    <ContainerShop title="Featured Products">
      <div className="ps-page--shop">
        <div className="ps-container">
          <div className="ps-layout--shop">
            <div className="ps-layout__left">
              <WidgetShopCategories />
              <WidgetShopBrands />
              <WidgetShopFilterByPriceRange />
            </div>
            <div className="ps-layout__right">
              <ShopItemsFeatureProducts columns={6} pageSize={12} />
            </div>
          </div>
        </div>
      </div>
    </ContainerShop>
  );
};
export default FeaturedProductsDefaultPage;
