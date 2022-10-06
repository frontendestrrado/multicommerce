import React from "react";
import ContainerPage from "~/components/layouts/ConatainerPageShoppingCart";
import WalletPage from "~/components/partials/account/wallet/WalletPage";

const MyWalletDefaultPage = () => {
  return (
    <ContainerPage boxed={true} title="My Wallet">
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>
        <WalletPage />
      </div>
    </ContainerPage>
  );
};

export default MyWalletDefaultPage;
