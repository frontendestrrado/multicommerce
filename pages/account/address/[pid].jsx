import React, { useEffect } from "react";

import ContainerPage from "~/components/layouts/ContainerPage";
import { useRouter } from "next/router";
import EditAddress from "~/components/partials/account/EditAddress";
import { useSelector, useDispatch } from "react-redux";
import { getCustomerAddress } from "~/store/account/action";
const EditAddressDefault = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { pid } = router.query;
  const auth = useSelector((state) => state.auth);
  const token = auth.access_token;
  useEffect(() => {
    let userdata = localStorage.getItem("user");

    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      router.push("/");
    }

    if (token) {
      dispatch(getCustomerAddress({ access_token: token }));
    }
  }, [token]);

  return (
    <ContainerPage boxed={true} title="Address">
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>
        <EditAddress formHeader="Edit Address" pid={pid} />
      </div>
    </ContainerPage>
  );
};

export default EditAddressDefault;
