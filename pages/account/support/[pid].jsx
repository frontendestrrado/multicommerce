import React, { useEffect } from "react";
import ContainerPage from "~/components/layouts/ContainerPage";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import SupportChat from "~/components/partials/account/support/SupportChat";

const EditAddressDefault = () => {
  const router = useRouter();

  const { pid } = router.query;
  const { access_token } = useSelector((state) => state.auth);

  return (
    <ContainerPage boxed={true} title="Support Chat">
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>
        <SupportChat pid={pid} />
      </div>
    </ContainerPage>
  );
};

export default EditAddressDefault;
