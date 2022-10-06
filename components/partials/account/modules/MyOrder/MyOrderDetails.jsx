import React from "react";
import AccountMenuSidebar from "../AccountMenuSidebar";
import Link from "next/link";
import { useSelector } from "react-redux";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";
import ReturnOrder from "./partials/ReturnOrder";
import { date_diff } from "~/utilities/common-helpers";
import { useRouter } from "next/router";
import ProductThumbnail from "~/components/elements/common/ProductThumbnail";
import moment from "moment";
import OrderStatus from "./partials/OrderStatus";
import CancelOrder from "./partials/CancelOrder";

const MyOrderDetails = ({ pid }) => {
  const { order_detail } = useSelector((state) => state.account);
  const router = useRouter();

  const renderOrderDetails = () => {
    return;
  };

  const renderProductOrderSummery = () => {
    let summery;

    if (order_detail) {
      let shipping_data = order_detail.shipping_address;
      summery = (
        <div className="card mb-2">
          <div className="row orderd">
            <div className="col-md-4 mt-4">
              <h6 style={{ fontWeight: "600" }}>Shipping Address</h6>
              <p>{shipping_data.name}</p>
              <p>{shipping_data.address1}</p>
              <p>{shipping_data.address2}</p>
              <p>
                {shipping_data.city}, {shipping_data.state},{" "}
                {shipping_data.country}
              </p>
              <p>{shipping_data.zip_code}</p>
            </div>
            <div className="col-md-4 mt-4">
              <h6 style={{ fontWeight: "600" }}>Payment Method</h6>
              <p>{order_detail.pay_method}</p>
            </div>
            <div className="col-md-4 mt-4">
              <table className="table table-borderless table-sm">
                <tbody>
                  <tr>
                    <td>
                      <p style={{ fontWeight: "600" }}>Order Summary</p>
                    </td>
                  </tr>
                  <tr>
                    <td>Item Subtotal:</td>
                    <td>
                      {currencyHelperConvertToRinggit(order_detail.sub_total)}
                    </td>
                  </tr>
                  {order_detail.shipping ? (
                    <tr>
                      <td>Shipping:</td>
                      <td>
                        {currencyHelperConvertToRinggit(order_detail.shipping)}
                      </td>
                    </tr>
                  ) : null}
                  <tr>
                    <td>Total:</td>
                    <td>
                      {currencyHelperConvertToRinggit(order_detail.total)}
                    </td>
                  </tr>
                  {order_detail.promotion ? (
                    <tr>
                      <td>Promotion Applied:</td>
                      <td>
                        {currencyHelperConvertToRinggit(order_detail.promotion)}
                      </td>
                    </tr>
                  ) : null}

                  {order_detail.tax ? (
                    <tr>
                      <td>Tax:</td>
                      <td>
                        {currencyHelperConvertToRinggit(order_detail.tax)}
                      </td>
                    </tr>
                  ) : null}
                  <tr>
                    <td>
                      <p style={{ fontWeight: "600" }}>Grand Total:</p>
                    </td>
                    <td>
                      <p className="" style={{ fontWeight: "600" }}>
                        {currencyHelperConvertToRinggit(
                          order_detail.grand_total
                        )}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    return summery;
  };

  const renderProductDetails = () => {
    let productDetails;
    if (order_detail) {
      productDetails = (
        <div className="card mb-2">
          <div className="row">
            <div className="col-md-4">
              {/* <div className="arriv">Arriving 20 Sep - 25 Sep</div> */}
              {order_detail?.order_status !== "cancelled" &&
                date_diff(order_detail.order_date) < 2 &&
                date_diff(order_detail.order_date) > 0 && (
                  <div className="rtn">
                    Return window closing on{" "}
                    {moment(`${order_detail.order_date}`)
                      .add(2, "d")
                      .format("DD-MMM-YYYY")}
                  </div>
                )}
            </div>
            <div className="col-md-3"></div>
            <div className="col-md-5">
              <div className="ordid">Order Id: {order_detail.order_id}</div>
              {order_detail.delivery_status.toLowerCase() == "delivered" && (
                <>
                  | <a style={{ fontWeight: "600" }}>Invoice</a>
                </>
              )}
            </div>
          </div>
          <div className="row">
            {order_detail.products.map((order, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="col-md-2">
                    <ProductThumbnail
                      imageLink={
                        order?.product_image
                          ? order?.product_image[0]?.image
                          : ""
                      }
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="row">
                      <div className="col-md-12">
                        <OrderStatus status={order_detail.order_status} />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <h5>{order.product_name}</h5>
                        <div className="sold">
                          Sold by: <a href="">{order_detail.sold_by}</a>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-3">
                        <div className="ordrplc">Order placed</div>
                        <div className="ordrdat">{order_detail.order_date}</div>
                      </div>
                      <div className="col-md-3">
                        <div className="ordrplc">Quantity</div>
                        <div className="ordrdat">{order.quantity}</div>
                      </div>
                      <div className="col-md-6">
                        <div className="ordrplc">Ship To</div>
                        <div className="ordrdat">
                          {order_detail.shipping_address.address1},{" "}
                          {order_detail.shipping_address.address2},{" "}
                          {order_detail.shipping_address.city},{" "}
                          {order_detail.shipping_address.state},{" "}
                          {order_detail.shipping_address.country},{" "}
                          {order_detail.shipping_address.zip_code}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="rin mt-2">
                      {currencyHelperConvertToRinggit(
                        order.sale_price ? order.sale_price : order.actual_price
                      )}
                    </div>
                    {order_detail.order_status == "cancel_initiated" && (
                      <CancelOrder
                        cancel_order_detail={order_detail.cancel_order_detail}
                        saleId={pid}
                        paymentMode={order_detail.pay_method}
                      />
                    )}
                    {order_detail.order_status == "cancel_initiated" &&
                      order_detail.payment_status == "refunded" && (
                        <button className="buybtn mt-2">
                          Refund Initiated
                        </button>
                      )}
                    {order_detail?.order_status == "cancelled" && (
                      <>
                        <button className="ratbtn mt-2">Cancelled</button>
                        <button
                          className="buybtn mt-2"
                          onClick={() =>
                            router.push(`/product/${order.product_id}`)
                          }
                        >
                          Buy It Again
                        </button>
                        <button
                          className="ratbtn mt-2"
                          onClick={() =>
                            router.push(`/product/${order.product_id}`)
                          }
                        >
                          Rate Product
                        </button>
                      </>
                    )}
                    {order_detail.order_status == "delivered" && (
                      <>
                        <button
                          className="buybtn mt-2"
                          onClick={() =>
                            router.push(`/product/${order.product_id}`)
                          }
                        >
                          Buy It Again
                        </button>
                        <button
                          className="ratbtn mt-2"
                          onClick={() =>
                            router.push(`/product/${order.product_id}`)
                          }
                        >
                          Rate Product
                        </button>
                      </>
                    )}
                    {order.order_status == "delivered" && (
                      <ReturnOrder
                        sale_id={pid}
                        product_id={order.product_id}
                      />
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      );
    }
    return productDetails;
  };

  return (
    <>
      <section
        className="ps-my-account ps-page--account"
        style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="ps-section__left">
                <AccountMenuSidebar activeModule="MyOrders" />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="ps-page__content">
                <div className="ps-section--account-setting">
                  <div className="ps-section__content">
                    <figure className="ps-block--address">
                      <figcaption>
                        My Orders
                        <div className="float-right"></div>
                      </figcaption>
                      <div className="ps-block__content">
                        <div className="ps-container">
                          <div className="row">
                            {/* <div className="col-lg-3"></div> */}
                            <div
                              id="ordr"
                              className="col-lg-12"
                              style={{ background: "#fff" }}
                            >
                              <div className="bck">
                                <Link
                                  href="/account/my-orders"
                                  className="font-weight-bold"
                                >
                                  Back
                                </Link>
                              </div>
                              {renderProductOrderSummery()}

                              <hr />
                              {renderProductDetails()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrderDetails;
