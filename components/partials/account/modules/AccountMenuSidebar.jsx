import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Link from "next/link";
import { logOut } from "~/store/auth/action";
import { getCustomerProfile } from "~/store/account/action";
import { notification, Avatar, Image } from "antd";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const AccountMenuSidebar = ({ auth, activeModule }) => {
  const { isLoggedIn, access_token } = useSelector((state) => state.auth);
  const { customer_profile } = useSelector((state) => state.account);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      let userdata = localStorage.getItem("user");
      if (userdata == undefined || userdata == null) {
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        router.replace("/");
      }
    }
    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCustomerProfile());
    }
  }, [access_token, isLoggedIn, customer_profile.user_id]);

  const [loading, setLoading] = useState(true);

  let { profile_image, first_name, last_name } = customer_profile;
  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
      active: activeModule === "UserInformation",
    },
    {
      text: "My Address",
      url: "/account/address",
      icon: "icon-map-marker",
      active: activeModule === "Addresses",
    },
    {
      text: "My Orders",
      url: "/account/my-orders",
      icon: "icon-bag",
      active: activeModule === "MyOrders",
    },
    {
      text: "My Wishlist",
      url: "/account/user-wishlist",
      icon: "icon-heart",
      active: activeModule === "Wishlist",
    },
    {
      text: "Chats",
      url: "/account/my-chats",
      icon: "icon-bubble",
      active: activeModule === "MyChats",
    },
    // {
    //   text: "Support",
    //   url: "/account/support",
    //   icon: "icon-phone",
    //   active: activeModule === "MySupport",
    // },
    // {
    //   text: "My Wallet",
    //   url: "/account/my-wallet",
    //   icon: "icon-database",
    //   active: activeModule === "MyWallet",
    // },
    // {
    //   text: "My Auction",
    //   url: "/account/my-auction",
    //   icon: "icon-bullhorn",
    //   active: activeModule === "MyAuction",
    // },
    {
      text: "Invite & Earn",
      url: "#",
      icon: "icon-thumbs-up",
      active: activeModule === "InviteEarn",
    },
    {
      text: "Notifications",
      url: "/account/notifications",
      icon: "icon-alarm-ringing",
      active: activeModule === "Notifications",
    },
    // {
    //   text: "Invoices",
    //   url: "/account/invoices",
    //   icon: "icon-papers",
    //   active: activeModule === "Invoices",
    // },
    // {
    //   text: "Recent Viewed Product",
    //   url: "/account/recent-viewed-product",
    //   icon: "icon-store",
    //   active: activeModule === "RecentViewedProducts",
    // },
  ];

  const handleLogout = (e) => {
    e.preventDefault();
    setTimeout(function () {
      router.push("/");
      // window.location.reload();
    }, 500);
    localStorage.removeItem("user");
    localStorage.removeItem("order");
    localStorage.removeItem("seller_chat_id");
    dispatch(logOut());
  };

  return (
    <aside className="ps-widget--account-dashboard d-none d-xl-block">
      <div className="ps-widget__content">
        <ul className="ps-list--user-links">
          <li
            key={"username"}
            // className={link.active ? "active" : ""}
          >
            <div className="ps-widget__header" style={{ padding: "1rem" }}>
              <Avatar
                style={{
                  width: "85px",
                  height: "65px",
                  lineHeight: "85px",
                  fontSize: "18px",
                }}
                src={profile_image}
              />
              <figure>
                <figcaption>Hello</figcaption>
                <p>
                  {first_name}&nbsp;
                  {last_name}
                </p>
              </figure>
            </div>
          </li>
          {accountLinks.map((link) => (
            <li key={link.text} className={link.active ? "active" : ""}>
              <Link href={link.url}>
                <a>
                  <i className={link.icon}></i>
                  {link.text}
                </a>
              </Link>
            </li>
          ))}
          <li>
            {/* <Link href="/account/my-account"> */}
            <a href="#" onClick={(e) => handleLogout(e)}>
              <i className="icon-power-switch"></i>
              Logout
            </a>
            {/* </Link> */}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AccountMenuSidebar;
