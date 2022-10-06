import React from "react";

import BreadCrumb from "~/components/elements/BreadCrumb";
import ContainerPage from "~/components/layouts/ContainerPage";
import UserWishist from "~/components/partials/account/UserWishlist";

const UserWishlistPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Recent Viewed Products",
    },
  ];
  return (
    <ContainerPage title="My Wishlist">
      <div className="ps-page--my-account">
        {/* <BreadCrumb breacrumb={breadCrumb} /> */}
        <div className="cart_heading">My Account</div>
        <UserWishist />
      </div>
    </ContainerPage>
  );
};

export default UserWishlistPage;
