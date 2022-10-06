import React from "react";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Wishlist from "~/components/partials/account/Wishlist";
import ConatainerPageShoppingCart from "~/components/layouts/ConatainerPageShoppingCart";

const WishlistPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Wishlist",
    },
  ];
  return (
    <ConatainerPageShoppingCart title="Wishlist" boxed={true}>
      <div className="ps-page--simple">
        <div className="cart_heading">Wishlist</div>
        <Wishlist />
      </div>
    </ConatainerPageShoppingCart>
  );
};

export default WishlistPage;
