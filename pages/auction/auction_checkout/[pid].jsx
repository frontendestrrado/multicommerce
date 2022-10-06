import React, { useEffect } from "react";

import BreadCrumb from "~/components/elements/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import ContainerPage from "~/components/layouts/ContainerPage";
import AuctionCheckout from "~/components/partials/auction/AuctionCheckout";
import { getAuctionCartData } from "~/store/account/action";
import { useRouter } from "next/router";
import { getDeviceId, makePageUrl, osType } from "~/utilities/common-helpers";
const AuctionCheckoutPage = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const Router = useRouter();
  const { pid } = Router.query;

  useEffect(() => {
    let payload = {
      access_token,
      lang_id: 1,
      device_id: getDeviceId,
      page_url: makePageUrl(Router.asPath),
      os_type: osType(),
      auction_id: pid,
    };
    access_token && dispatch(getAuctionCartData(payload));
  }, [pid, access_token]);
  return (
    <ContainerPage title="Auction Checkout" boxed={true}>
      <div className="ps-page--simple cart_page">
        <div className="cart_heading">Auction Checkout</div>
        <AuctionCheckout />
      </div>
    </ContainerPage>
  );
};

export default AuctionCheckoutPage;
