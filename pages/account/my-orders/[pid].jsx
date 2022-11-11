import React, { useEffect } from "react";
import ContainerPage from "~/components/layouts/ContainerPage";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails } from "~/store/account/action";
import MyOrderDetails from "~/components/partials/account/modules/MyOrder/MyOrderDetails";

const EditAddressDefault = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { pid } = router.query;
  const { access_token } = useSelector((state) => state.auth);

  useEffect(() => {
    let userdata = localStorage.getItem("user");

    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      router.push("/");
    } else if (access_token) {
      let payload = {
        access_token,
        lang_id:localStorage.getItem("langId"),
        sale_id: pid,
      };
      dispatch(getOrderDetails(payload));
    }
  }, [pid, access_token]);

  return (
    <ContainerPage boxed={true} title="Orders">
      <div className="ps-page--my-account">
        <div className="cart_heading">My Account</div>
        <MyOrderDetails pid={pid} />
      </div>
    </ContainerPage>
  );
};

export default EditAddressDefault;
