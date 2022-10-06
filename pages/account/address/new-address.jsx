import React from "react";
import ContainerPage from "~/components/layouts/ConatainerPageShoppingCart";
import EditAddress from "~/components/partials/account/EditAddress";

const NewAddress = () => {
  return (
    <ContainerPage boxed={true} title="Address">
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>
        <EditAddress formHeader="Add New Address" />
      </div>
    </ContainerPage>
  );
};

export default NewAddress;
