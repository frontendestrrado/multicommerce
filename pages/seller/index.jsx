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
import SellerDetails from "~/components/partials/homepage/seller/SellerDetails";

const SellerDefaultPage = () => {
  return (
    <ContainerShop title="Best Sellers">
      <div className="ps-page--shop">
        <div className="ps-container">
          <div className="ps-layout--shop">
            <SellerDetails columns={6} pageSize={12} />
          </div>
        </div>
      </div>
    </ContainerShop>
  );
};

export default SellerDefaultPage;
