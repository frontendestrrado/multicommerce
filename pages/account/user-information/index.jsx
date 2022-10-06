import React from "react";

import UserInformation from "~/components/partials/account/UserInformation";
import ContainerPageShoppingCart from "~/components/layouts/ConatainerPageShoppingCart";
import { useSelector } from "react-redux";

const UserInformationPage = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <ContainerPageShoppingCart title="User Information" boxed={true}>
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>
        <UserInformation token={auth.access_token} />
      </div>
    </ContainerPageShoppingCart>
  );
};

export default UserInformationPage;
