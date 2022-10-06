import React from "react";
import Head from "next/head";

import BreadCrumb from "~/components/elements/BreadCrumb";
import Login from "~/components/partials/account/Login";
import ContainerPage from "~/components/layouts/ContainerPage";
import FooterFullwidth from "~/components/shared/footers/FooterFullwidth";
import FooterFullwidthForLogin from "~/components/shared/footers/FooterFullwidthForLogin";

import FooterDefault from "~/components/shared/footers/FooterDefault";

const LoginPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Login",
    },
  ];

  let titleView;
  titleView = process.env.title + " | Login";
  return (
    <div
      className="Kangtao"
      style={{
        overflowX: "hidden",
      }}
    >
      <Head>
        <title>{titleView}</title>
      </Head>
      <Login />
      <FooterFullwidthForLogin />
    </div>
  );
};

export default LoginPage;
