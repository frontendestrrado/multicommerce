import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import BreadCrumb from "~/components/elements/BreadCrumb";
import ContainerPage from "~/components/layouts/ContainerPage";

const AuctionThankuyPage = () => {
  const [order, setOrder] = useState("");
  useEffect(() => {
    let orderid = localStorage.getItem("auctionorder");
    setOrder(orderid);
  }, []);
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Shopping Cart",
      url: "/account/shopping-cart",
    },
    {
      text: "Checkout Information",
      url: "/account/checkout",
    },
    {
      text: "Payment",
    },
  ];

  const Router = useRouter();

  return (
    <ContainerPage title="Thankyou" boxed={true}>
      <div className="ps-page--simple">
        {/* <BreadCrumb breacrumb={breadCrumb} /> */}
        <div className="thankyou-page">
          <b> Thank you for placing order. Your order id is {order}</b>
          <p>we will notify you regarding status of the order.</p>
        </div>
      </div>
    </ContainerPage>
  );
};

export default AuctionThankuyPage;
