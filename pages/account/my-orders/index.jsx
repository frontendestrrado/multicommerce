import React from "react";

import BreadCrumb from "~/components/elements/BreadCrumb";
import ShoppingCart from "~/components/partials/account/ShoppingCart";
import ConatainerPageShoppingCart from "~/components/layouts/ConatainerPageShoppingCart";
import MyOrder from "~/components/partials/account/MyOrder";

const MyOrderPage = () => {
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
    <ConatainerPageShoppingCart title="Orders" boxed={true}>
      <div className="ps-page--simple cart_page">
        <div className="cart_heading">My Account</div>
        {/* <BreadCrumb breacrumb={breadCrumb} /> */}
        <MyOrder />
      </div>
    </ConatainerPageShoppingCart>
  );
};

export default MyOrderPage;
