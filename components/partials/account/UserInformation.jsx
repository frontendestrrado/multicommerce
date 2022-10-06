import React, { useEffect } from "react";
import FormChangeUserInformation from "~/components/shared/FormChangeUserInformation";
import { connect, useDispatch, useSelector } from "react-redux";
import { notification, Empty } from "antd";
import { getCustomerProfile } from "~/store/account/action";
import { useRouter } from "next/router";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";

const UserInformation = ({ auth, token }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const checkLogin = () => {
      let userdata = localStorage.getItem("user");
      if (userdata === undefined || userdata === null) {
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        router.push("/");
        return false;
      }
    };

    checkLogin();

    if (token) {
      dispatch(getCustomerProfile({ access_token: token }));
    }
  }, []);

  return (
    <section
      className="ps-my-account ps-page--account"
      style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-3">
            <div className="ps-section__left">
              <AccountMenuSidebar activeModule="UserInformation" />
            </div>
          </div>
          <div className="col-xl-9">
            <div className="ps-page__content">
              {auth?.user_details ? (
                <FormChangeUserInformation />
              ) : (
                <Empty description="User info not found!" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(UserInformation);
