import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ContainerProductDetail from "~/components/layouts/ContainerProductDetail";
import HeaderDefault from "~/components/shared/headers/HeaderDefault";
import BreadCrumb from "../../components/elements/BreadCrumb";
// import VendorStore from "../../components/partials/vendor/VendorStore";
import VendorStoreNew from "../../components/partials/vendor/VendorStore_new";

const SellerDefaultPage = () => {
  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Vendor store",
    },
  ];
  const [container, setContainer] = useState(null);

  const router = useRouter();
  const { pid } = router.query;

  return (
    <ContainerProductDetail
      title="Shop Detail"
      // ref={setContainer}
    >
      <HeaderDefault />
      <div
        className="ps-page--product product-details"
        style={{ backgroundColor: "#fff" }}
      >
        <div className="ps-container">
          <div className="ps-page__container">
            <div className="ps-page--single ps-page--vendor">
              {/* <BreadCrumb breacrumb={breadCrumb} /> */}
              <VendorStoreNew pid={pid} />
            </div>
          </div>
        </div>
      </div>
    </ContainerProductDetail>
  );
};

export default SellerDefaultPage;
