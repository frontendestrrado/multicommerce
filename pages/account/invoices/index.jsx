import React from "react";

import Invoices from "~/components/partials/account/Invoices";
import ContainerPage from "~/components/layouts/ContainerPage";

const InvoicePage = () => {
  return (
    <ContainerPage title="Invoice" boxed={true}>
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>

        <Invoices />
      </div>
    </ContainerPage>
  );
};

export default InvoicePage;
