import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { relatedProduct } from "../../../public/static/data/product";
import VendorProducts from "./modules/VendorProducts_new";
import Rating from "../../elements/Rating";
import { carouselStandard } from "../../../utilities/carousel-helpers";
import ProductOffline from "../../elements/products/ProductOffline_new";
import PartialSellerReview from "~/components/elements/detail/description/PartialSellerReview";
import Link from "next/link";
import ProductRepository from "~/repositories/ProductRepository";
import { notification, Spin, Tabs, Comment, Empty } from "antd";
import { useDispatch } from "react-redux";
import { updateSellerReviewData } from "~/store/product/action";
import { useSelector } from "react-redux";
import { setChatSellerId, setCustomerChatId } from "~/store/account/action";
import { useRouter } from "next/router";
import { getDeviceId, makePageUrl } from "~/utilities/common-helpers";

const { TabPane } = Tabs;

const VendorStore = ({ pid }) => {
  const Router = useRouter();

  const { sellerReviewLength } = useSelector((state) => state.product);
  const { access_token, isLoggedIn } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [shopData, setShopData] = useState(null);
  const [product, setProduct] = useState(null);
  const [seller_review, setSellerReview] = useState([]);
  const [shop_detail, setShopDetail] = useState([]);
  const [best_products, setBestProducts] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tabKey, setkey] = useState(1);

  async function getProduct(pid) {
    let payload = {
      seller_id: pid,
      lang_id: localStorage.getItem("langId"),
      device_id: getDeviceId,
      page_url: makePageUrl(Router.asPath),
      os_type: "WEB",
    };
    const responseData = await ProductRepository.getShopDetailById(payload);

    if (responseData && responseData.data !== undefined) {
      setShopData(responseData.data);

      setProduct(responseData.data.product);
      setShopDetail(responseData.data.shop_detail[0]);
      setSellerReview(responseData.data.seller_review);
      setBestProducts(responseData.data.best_products);

      dispatch(updateSellerReviewData(responseData.data.seller_review.length));

      setTimeout(function () {
        setLoading(false);
      }, 500);
    } else {
      notification["error"]({
        message: "Error",
        description: "Error While Fetching Seller Data!",
        duration: 1,
      });
      setTimeout(function () {
        setLoading(false);
      }, 500);
      return false;
    }
  }

  useEffect(() => {
    setLoading(true);

    const handler = setTimeout(() => {
      getProduct(pid);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [pid, sellerReviewLength]);

  function callbackKeyUpdate(key) {
    setkey(key);
  }

  const renderProduct = (products) => {
    const render_product = products && (
      <VendorProducts vendor_products={products} />
    );

    return render_product;
  };

  const handleContactSeller = () => {
    if (isLoggedIn) {
      localStorage.setItem(
        "seller_chat_id",
        JSON.stringify({
          seller_chat_id: "",
          seller_id: shop_detail.seller_id,
          store_name: shop_detail.store_name,
          store_logo: shop_detail.logo,
        })
      );

      dispatch(setChatSellerId(pid));
      dispatch(setCustomerChatId(null));

      setTimeout(() => {
        Router.push("/account/my-chats");
      }, 500);
    } else {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
    }
  };

  function numberOfRating() {
    if (seller_review?.length > 0) {
      return Math.ceil(
        (seller_review?.filter((review) => review.rating > 3)?.length /
          seller_review?.length) *
          100
      );
    } else {
      return 0;
    }
  }

  function sellerReviewTextStyle() {
    let totalRating = numberOfRating();
    if (totalRating > 60) {
      return "text-success";
    } else if (totalRating > 30) {
      return "text-warning";
    } else {
      return "text-danger";
    }
  }

  return (
    <>
      {!loading && shopData?.shop_detail?.length > 0 ? (
        <div className="ps-vendor-store">
          <div className="container">
            <div className="ps-section__container">
              <div className="ps-section__left">
                <div className="ps-block--vendor">
                  <div className="ps-block__thumbnail">
                    <img
                      src={shop_detail.logo}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "/static/img/vendor/store/vendor-150x150.jpg";
                      }}
                      alt={shop_detail.name}
                    />
                  </div>
                  <div className="ps-block__container">
                    <div className="ps-block__header">
                      <h4>{shop_detail.store_name}</h4>
                      <Rating rating={shop_detail.store_rating} />
                      {seller_review?.length > 0 ? (
                        <p>
                          <strong className={sellerReviewTextStyle()}>
                            {numberOfRating()}% Positive
                          </strong>{" "}
                          ({`${seller_review?.length} rating`})
                        </p>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="ps-block__divider"></div>
                    <div className="ps-block__content">
                      <p>
                        <strong>{shop_detail.store_name}</strong>{" "}
                        {shop_detail.about}
                      </p>
                      <span className="ps-block__divider"></span>
                      <p>
                        <strong>Address</strong> {shop_detail.address_line1}{" "}
                        {shop_detail.address_line2} {shop_detail.city}{" "}
                        {shop_detail.state} {shop_detail.country}
                      </p>
                      <figure>
                        <figcaption>Follow us on social</figcaption>
                        <ul className="ps-list--social-color">
                          <li>
                            <a className="facebook" href="#">
                              <i className="fa fa-facebook"></i>
                            </a>
                          </li>
                          <li>
                            <a className="twitter" href="#">
                              <i className="fa fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a className="linkedin" href="#">
                              <i className="fa fa-linkedin"></i>
                            </a>
                          </li>
                          <li>
                            <a className="feed" href="#">
                              <i className="fa fa-feed"></i>
                            </a>
                          </li>
                        </ul>
                      </figure>
                    </div>
                    <div className="ps-block__footer">
                      {shop_detail.contact_num ? (
                        <p>
                          Call us directly
                          <strong>{shop_detail.contact_num}</strong>
                          {/* <strong>(+053) 77-637-3300</strong> */}
                        </p>
                      ) : null}
                      <p>Or if you have any question</p>
                      {/* <Link href="/account/my-chats"> */}
                      <button
                        className="ps-btn ps-btn--fullwidth"
                        onClick={handleContactSeller}
                      >
                        Contact Seller
                      </button>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ps-section__right">
                <div className="ps-block--vendor-filter">
                  <div
                    className="ps-block__left"
                    style={{ paddingLeft: "15px", paddingTop: "6px" }}
                  >
                    <Tabs
                      defaultActiveKey={tabKey}
                      onChange={callbackKeyUpdate}
                    >
                      <TabPane tab="Products" key="1" />
                      <TabPane tab="Shop Review & Rating" key="2" />
                      <TabPane tab="About" key="3" />
                    </Tabs>
                  </div>
                  {tabKey == 1 && (
                    <div
                      className="ps-block__right"
                      style={{ padding: "16px" }}
                    >
                      <form className="ps-form--search" action="/" method="get">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Search in this shop"
                          onChange={(event) => {
                            setSearchTerm(event.target.value);
                          }}
                        />
                        <button>
                          <i className="fa fa-search"></i>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
                {tabKey == 1 && (
                  <>
                    {searchTerm.length == 0 ? (
                      <>
                        <div className="ps-vendor-best-seller">
                          <div className="ps-section__header">
                            <h3>Best Seller items</h3>
                          </div>
                          <div className="ps-section__content">
                            {best_products && best_products.length > 5 ? (
                              <Slider
                                {...carouselStandard}
                                className="ps-carousel"
                              >
                                {best_products.map((product, index) => (
                                  <ProductOffline
                                    product={product}
                                    key={index}
                                  />
                                ))}
                              </Slider>
                            ) : (
                              <>
                                <div className="ps-shopping-product">
                                  <div className="row">
                                    {best_products.map((product, index) => (
                                      <ProductOffline
                                        product={product}
                                        key={index}
                                        classAdd={"col-lg-3 col-md-4 col-sm-6"}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <VendorProducts vendor_products={product} />
                      </>
                    ) : (
                      renderProduct(
                        product.filter((value) => {
                          if (searchTerm === "") {
                            return value;
                          } else if (
                            value.product_name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          ) {
                            return value;
                          }
                          return null;
                        })
                      )
                    )}
                  </>
                )}
                {tabKey == 2 && (
                  <>
                    <div className="ps-vendor-best-seller">
                      <div className="ps-section__content">
                        <PartialSellerReview
                          seller_review={seller_review}
                          shop_detail={shop_detail}
                        />
                      </div>
                    </div>
                  </>
                )}
                {tabKey == 3 && (
                  <>
                    <div className="ps-vendor-best-seller">
                      <div className="ps-section__content">
                        <p>
                          <strong>{shop_detail.store_name}</strong>{" "}
                          {shop_detail.about}
                        </p>
                        <span className="ps-block__divider"></span>
                        <p>
                          <strong>Address</strong> {shop_detail.address_line1}{" "}
                          {shop_detail.address_line2} {shop_detail.city}{" "}
                          {shop_detail.state} {shop_detail.country} 10002
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="ps-vendor-store">
          <div className="container">
            <div className="ps-section__container">
              <Spin spinning={loading}>
                <Empty description="Seller Data Not Found" />
              </Spin>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VendorStore;
