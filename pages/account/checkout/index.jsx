import React, { useEffect } from "react";
import Checkout from "~/components/partials/account/Checkout";
import { getCart } from "~/store/cart/action";
import { connect, useDispatch } from "react-redux";
import ContainerPage from "~/components/layouts/ContainerPage";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <ContainerPage title="Checkout" boxed={true}>
      <div className="ps-page--simple cart_page">
        <div className="cart_heading">Checkout</div>
        <Checkout />
      </div>
    </ContainerPage>
  );
};

export default connect()(CheckoutPage);
