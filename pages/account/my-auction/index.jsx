import React, { useEffect } from "react";
import ContainerPage from "~/components/layouts/ConatainerPageShoppingCart";
import MyAuctionPage from "~/components/partials/account/myaution/MyAuctionPage";

const MyAuctionDefaultPage = () => {
  return (
    <ContainerPage boxed={true} title="My Auction">
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>
        <MyAuctionPage />
      </div>
    </ContainerPage>
  );
};

export default MyAuctionDefaultPage;
