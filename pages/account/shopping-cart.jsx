import React from "react";

import BreadCrumb from "~/components/elements/BreadCrumb";
import ShoppingCart from "~/components/partials/account/ShoppingCart";
import ConatainerPageShoppingCart from "~/components/layouts/ConatainerPageShoppingCart";

const ShoppingCartPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Shopping Cart",
    },
  ];
  return (
    <ConatainerPageShoppingCart title="Shopping Cart" boxed={true}>
      <div className="ps-page--simple cart_page">
        <div className="cart_heading">Shopping Cart</div>
        {/* <BreadCrumb breacrumb={breadCrumb} /> */}
        <ShoppingCart />
      </div>
    </ConatainerPageShoppingCart>
  );
};

export default ShoppingCartPage;
