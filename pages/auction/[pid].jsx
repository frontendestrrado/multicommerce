import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ContainerProductDetail from "~/components/layouts/ContainerProductDetail";
import ProductRepository from "~/repositories/ProductRepository";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "~/components/elements/BreadCrumb";
import ProductWidgets from "~/components/partials/product/ProductWidgets";
import ProductDetailFullwidth from "~/components/elements/detail/ProductDetailFullwidth";
import CustomerBought from "~/components/partials/product/CustomerBought";
import DetailRelatedProduct from "~/components/partials/product/DetailRelatedProduct";
import ContainerPage from "~/components/layouts/ContainerPage";
import HeaderProduct from "~/components/shared/headers/HeaderProduct";
import HeaderDefault from "~/components/shared/headers/HeaderDefault";
import { notification } from "antd";
import { getProductsById } from "~/store/product/action";
import AuctionProductDetail from "~/components/elements/detail/AuctionProductDetail";
import { getDeviceId, makePageUrl } from "~/utilities/common-helpers";

const AuctionDefaultPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getProduct(pid) {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;
    setLoading(true);
    let payload = {
      auction_id: pid,
      lang_id:localStorage.getItem("langId"),
      access_token: access_token,
      device_id: getDeviceId,
      page_url: makePageUrl(router.asPath),
      os_type: "WEB",
    };
    const responseData = await ProductRepository.getAuctionProductByAuctionId(
      payload
    );
    if (responseData && responseData.data !== undefined) {
      setProduct(responseData.data);

      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        500
      );
    } else {
      notification["error"]({
        message: "Error",
        description: responseData.message,
        duration: 1,
      });
      router.push("/");
    }
  }
  useEffect(() => {
    const handler = setTimeout(() => {
      getProduct(pid);
      //   dispatch(getProductsById(pid));
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [pid]);

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Shop",
      url: "/shop",
    },
    {
      text: product ? product.title : "Loading...",
    },
  ];
  // Views
  let productView, headerView;
  if (!loading) {
    if (product) {
      productView = <AuctionProductDetail product={product} />;
      headerView = <HeaderProduct product={product} />;
    } else {
      headerView = <HeaderDefault />;
    }
  } else {
    productView = <SkeletonProductDetail />;
  }

  return (
    <ContainerProductDetail
      title={product ? product?.product_name : "Loading..."}
    >
      {headerView}
      {/* <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" /> */}
      <div className="ps-page--product product-details">
        <div className="ps-container">
          <div className="ps-page__container">
            <div className="ps-page__left">{productView}</div>
            <div className="ps-page__right">
              <ProductWidgets product={product} />
            </div>
          </div>

          {/* <CustomerBought layout="fullwidth" collectionSlug="deal-of-the-day" /> */}
          {/* <DetailRelatedProduct
            collectionSlug="shop-recommend-items"
            product={product}
          /> */}
        </div>
      </div>
    </ContainerProductDetail>
  );
};

export default AuctionDefaultPage;
