import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ViewedProductsScroller from "~/components/partials/homepage/new-deals-daily/ViewedProductsScroller";
import RelativePRoductsScroller from "~/components/partials/homepage/new-deals-daily/RelativeProductsScroller";
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
import { logOut } from "~/store/auth/action";
const ProductDefaultPage = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getProduct(pid) {
    setLoading(true);
    let payload = pid;
    const responseData = await ProductRepository.getProductsById(payload);
    console.log("....pid........",pid)
    console.log("....payload........",payload)
    console.log("....xxxxxxxxxx........",responseData)
    if (
      responseData &&
      responseData.httpcode == 200 &&
      responseData.data !== undefined
    ) {
      setProduct(responseData.data);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    } else if (responseData && responseData.httpcode == 401) {
      notification["error"]({
        message: "Error",
        description: responseData.message,
        duration: 4,
      });
      dispatch(logOut());
      router.push(`/${responseData.data.redirect}`);
    } else {
      notification["error"]({
        message: "Error",
        description: "Error While Fetching Data From Server.",
        duration: 4,
      });
      router.push("/");
    }
  }

  useEffect(() => {
    console.log("...mmmmm...",pid)
    getProduct(pid);
    dispatch(getProductsById(pid));
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
  //    alert("1")
      productView = <ProductDetailFullwidth product={product} />;
      headerView = <HeaderProduct product={product} />;
    } else {
    //  alert("2")
      headerView = <HeaderDefault />;
    }
  } else {
    productView = <SkeletonProductDetail />;
  }
  return (
    <ContainerProductDetail
      title={product ? product?.product?.product_name : "Loading..."}
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
          {/* {product && product?.relative_products?.length > 0 && (
            <DetailRelatedProduct
              collectionSlug="shop-recommend-items"
              product={product}
            />
          )} */}

           {product && product?.relative_products?.length > 0 && (
            <RelativePRoductsScroller
            collectionSlug="shop-recommend-items"
              homeitems={product}
              loading={loading}
            />
          )}

{product && product?.viewed_products?.length > 0 && (
            <ViewedProductsScroller
            collectionSlug="shop-recommend-items"
              homeitems={product}
              loading={loading}
            />
          )}
        </div>
      </div>
    </ContainerProductDetail>
  );
};

export default ProductDefaultPage;
