import React from "react";
import Notifications from "~/components/partials/account/Notifications";
// import ContainerPage from "~/components/layouts/ContainerPage";
import ContainerPage from "~/components/layouts/ConatainerPageShoppingCart";

const AccountNotificationsPage = () => {
  return (
    <ContainerPage title="Notifications" boxed={true}>
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>
        <Notifications />
      </div>
    </ContainerPage>
  );
};

export default AccountNotificationsPage;
