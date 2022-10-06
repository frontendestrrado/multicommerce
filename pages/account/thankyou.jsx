import React, { useEffect, useState } from "react";

import BreadCrumb from "~/components/elements/BreadCrumb";
import Payment from "~/components/partials/account/Payment";
import { useDispatch, connect } from "react-redux";
import { getCart, clearCart } from "~/store/cart/action";
import ContainerPage from "~/components/layouts/ContainerPage";

const ThankuyPage = () => {
  const [order, setOrder] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    let orderid = localStorage.getItem("order");
    setOrder(orderid);
    orderid && dispatch(clearCart());
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
  // const dispatch = useDispatch();

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

export default connect()(ThankuyPage);
