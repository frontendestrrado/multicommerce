import React from "react";

import BreadCrumb from "~/components/elements/BreadCrumb";
import ConatainerPageShoppingCart from "~/components/layouts/ConatainerPageShoppingCart";
import MyChats from "~/components/partials/account/MyChats";
import withAuth from "~/HOC/withAuth";

const ChatDefaultPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "My Chat",
    },
  ];
  return (
    <ConatainerPageShoppingCart title="My Chats" boxed={true}>
      <div className="ps-page--simple cart_page">
        <div className="cart_heading">My Account</div>
        {/* <BreadCrumb breacrumb={breadCrumb} /> */}
        <MyChats />
      </div>
    </ConatainerPageShoppingCart>
  );
};

export default ChatDefaultPage;
