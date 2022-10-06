import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContainerPage from "~/components/layouts/ContainerPage";
import SupportPage from "~/components/partials/account/support/SupportPage";
import { getCustomerProfile, getTokenList } from "~/store/account/action";

const SupportDefaultPage = () => {
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

    token && dispatch(getTokenList({ access_token: token }));
  }, [token]);

  return (
    <ContainerPage boxed={true} title="Support">
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>
        <SupportPage />
      </div>
    </ContainerPage>
  );
};

export default SupportDefaultPage;
