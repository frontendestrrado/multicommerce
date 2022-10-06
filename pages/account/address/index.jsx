import React, { useEffect } from "react";
import Addresses from "~/components/partials/account/Addresses";
import ContainerPage from "~/components/layouts/ContainerPage";
import { getCustomerProfile } from "~/store/account/action";
import { useDispatch, useSelector } from "react-redux";

const MyAccountPage = () => {
  const auth = useSelector((state) => state.auth);
  const token = auth.access_token;
  const dispatch = useDispatch();

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
      dispatch(getCustomerProfile({ access_token: token }));
    }
  }, [token]);

  return (
    <ContainerPage boxed={true} title="Address">
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>
        <Addresses />
      </div>
    </ContainerPage>
  );
};

export default MyAccountPage;
