import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";
import CancelOrder from "./CancelOrder";
import ShipmentDetailsForReturn from "./ShipmentDetailsForReturn";
import { date_diff } from "~/utilities/common-helpers";
import { useRouter } from "next/router";
import ProductThumbnailWithoutLazyLoad from "~/components/elements/common/ProductThumbnailWithoutLazyLoad";
import moment from "moment";
import OrderStatus from "./OrderStatus";
import ReturnOrder from "./ReturnOrder";

const OrdersList = () => {
  const { orders } = useSelector((state) => state.account);
  const router = useRouter();
console.log("...orders...........orders.......",orders)
  const returnOrderDetails = () => {
    let orderDetaisRender;
    if (orders && orders.length > 0) {
      orderDetaisRender = orders?.map((order, index) => {
        return (
          <React.Fragment key={index}>
            <div className="card mb-2">
              <div className="row">
                <div className="col-md-4">
                  {/* <div className="arriv">Arriving 20 Sep - 25 Sep</div> */}
                  {/* {date_diff(order.order_date) 2 < 2 && ( */}
                  {order?.order_status !== "cancelled" &&
                    date_diff(order.order_date) < 2 &&
                    date_diff(order.order_date) > 0 && (
                      <div className="rtn">
                        Return window closing on{" "}
                        {moment(`${order.order_date}`)
                          .add(2, "d")
                          .format("DD-MMM-YYYY")}
                      </div>
                    )}
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-5">
                  <div className="ordid">Order Id: {order.order_id}</div>
                  <div className="orddet">
                    <Link
                      href="/account/my-orders/[pid]"
                      as={`/account/my-orders/${order?.sale_id}`}
                    >
                      <a style={{ fontWeight: "600" }}>Order Details </a>
                    </Link>
                    {order.order_status == "delivered" && (
                      <>
                        | <a style={{ fontWeight: "600" }}>Invoice</a>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-2">
                  <ProductThumbnailWithoutLazyLoad
                    imageLink={
                      order.image
                    }
                  />
                </div>
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12">
                      <OrderStatus status={order.order_status} />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <h5>{order.product_name}</h5>
                      <div className="sold">
                        Sold by: <a href="">{order.sold_by}</a>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-3">
                      <div className="ordrplc">Order placed</div>
                      <div className="ordrdat">
                        {order.order_date}
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="ordrplc">Quantity</div>
                      <div className="ordrdat">{order.items_count}</div>
                    </div>
                    <div className="col-md-6">
                      <div className="ordrplc">Ship To</div>
                      <div className="ordrdat">
                        {order.shipping_address.address1},{" "}
                        {order.shipping_address.address2},{" "}
                        {order.shipping_address.city},{" "}
                        {order.shipping_address.state},{" "}
                        {order.shipping_address.country},{" "}
                        {order.shipping_address.zip_code}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="rin mt-2">
                    {currencyHelperConvertToRinggit(
                      order.g_total
                      // order.sale_price ? order.sale_price : order.actual_price
                    )}
                  </div>
                  {order.order_status == "cancel_initiated" && (
                    <CancelOrder
                      cancel_order_detail={order.cancel_order_detail}
                      paymentMode={order.payment_mode}
                    />
                  )}
                  {order.order_status == "cancel_initiated" &&
                    order.payment_status == "refunded" && (
                      <button className="buybtn mt-2">Refund Initiated</button>
                    )}
                  {order?.order_status == "cancelled" && (
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
                  {order.order_status == "delivered" &&
                    order?.return_detail?.length == 0 && (
                      <ReturnOrder
                        sale_id={order.sale_id}
                        product_id={order.product_id}
                        quantity={order.quantity}
                      />
                    )}
                  {order.order_status == "delivered" && (
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
                  {order?.return_detail?.status == "return_accepted" && (
                    <ShipmentDetailsForReturn
                      return_id={order?.return_detail?.id}
                    />
                  )}
                  {order?.return_detail?.status &&
                    order?.return_detail?.status == "return_initiated" && (
                      <button className="updtbtn text-warning mt-2">
                        Return Initiated
                      </button>
                    )}
                  {order?.return_detail?.status &&
                    order?.return_detail?.status == "shipment_initiated" && (
                      <button className="updtbtn text-warning mt-2">
                        Shipment Initiated
                      </button>
                    )}
                  {order?.return_detail?.status &&
                    order?.return_detail?.status == "refund_initiated" && (
                      <button className="updtbtn text-warning mt-2">
                        Refund Initiated
                      </button>
                    )}
                  {order?.return_detail?.status &&
                    order?.return_detail?.status == "return_rejected" && (
                      <button className="ratbtn mt-2">Return Rejected</button>
                    )}
                </div>
              </div>
            </div>
            <hr />
          </React.Fragment>
        );
      });
    } else {
      orderDetaisRender = <Empty description={<span>No order found!</span>} />;
    }

    return orderDetaisRender;
  };

  return (
    <div
      className="ps-container"
      style={{ height: "60rem", overflowY: "scroll" }}
    >
      <div className="row">
        <div id="ordr" className="col-lg-12" style={{ background: "#fff" }}>
          {returnOrderDetails()}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
