import React from "react";
import Link from "next/link";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";
import ThumbnailHelper from "~/components/elements/detail/thumbnail/ThumbnailHelper";

import DisplayOtherOptions from "./modules/DisplayOtherOptions";
import DisplayCartVoucher from "../ShoppingCart/DisplayCartVoucher";

const DisplayOrders = ({ cartdata }) => {
  return (
    <>
      <div className="cart-header">
        <div className="prdct-tit">
          <span style={{ fontSize: "18px" }}>Product Ordered</span>
        </div>
        <div className="unt-tit d-none d-xl-block">Unit Price</div>
        <div className="Qty-tit d-none d-xl-block">Quantity</div>
        <div className="tot-tit d-none d-xl-block"></div>
        {/* <div className="tot-tit d-none d-xl-block">Total Price</div> */}
        <div className="act-tit d-none d-xl-block">Item Subtotal</div>
      </div>
      {cartdata != null &&
        cartdata?.product !== undefined &&
        cartdata?.product?.length > 0 &&
        cartdata?.product?.map((productItem, index) => {
          return (
            <div className="prdt-box" key={index}>
              <div
                className="stor-slct"
                style={{
                  borderBottom: "none",
                  padding: "0",
                }}
              >
                {/* <a className="stor-tit ml-5" href="">
                  {productItem.seller.seller}
                </a> */}
              </div>

              {/* {productItem.seller.products.map((product, index) => { */}
                {/* return ( */}
                  <div
                    className="prdt-det"
                    key={index}
                    style={{ paddingLeft: "10px" }}
                  >
                    <div className="prdt-det-inner">
                      <div className="prdct-innr">
                        <div className="prdt-img">
                          <div className="prdt-img-innr">
                            <div className="prodct-imge">
                              <Link
                                href={`/product/${productItem.product_id}`}
                                as={`/product/${productItem.product_id}`}
                              >
                                <a>
                                  <img
                                    src={
                                      productItem?.image[0]?.image ||
                                      "/static/img/not-found.jpg"
                                    }
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "/static/img/vendor/store/vendor-150x150.jpg";
                                    }}
                                    alt={productItem.brand_name}
                                    height="80"
                                  />
                                  {/* <ThumbnailHelper
                                  imageData={product?.image[0]?.image}
                                  height={"auto"}
                                /> */}
                                </a>
                              </Link>
                            </div>
                            <div className="prod-title">
                              <div className="prod-title-inner">
                                {productItem.product_name}
                                {productItem.attr_name1
                                  ? ` (${productItem.attr_name1}${
                                    productItem.attr_name2
                                        ? ` ${productItem.attr_name2}`
                                        : ""
                                    })`
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="prdct-vari">Variations</div> */}
                        <div className="prdct-vari"></div>
                        <div className="prdct-unt-pric">
                          <div>
                            {productItem.unit_discount_price == false ? (
                              <span
                                className="prdt"
                                style={{ fontSize: "1.5rem" }}
                              >
                                {currencyHelperConvertToRinggit(
                                  productItem.unit_actual_price
                                )}
                              </span>
                            ) : (
                              <>
                                <span
                                  className="lin-prdt"
                                  style={{ fontSize: "1.5rem" }}
                                >
                                  {currencyHelperConvertToRinggit(
                                    productItem.unit_actual_price
                                  )}
                                </span>
                                <span
                                  className="prdt"
                                  style={{ fontSize: "1.5rem" }}
                                >
                                  {currencyHelperConvertToRinggit(
                                    productItem.unit_discount_price
                                  )}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="prdt-add">
                          <div className="prdt-qty">
                            <span style={{ fontSize: "1.5rem" }}>
                              {productItem.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="prdt-totl"></div>
                        <div className="prdt-totl">
                          <span style={{ fontSize: "1.5rem" }}>
                            {currencyHelperConvertToRinggit(
                              productItem.total_discount_price == false
                                ? productItem.total_actual_price
                                : productItem.total_discount_price
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                {/* ); */}
               {/* })} */}
              {/* <DisplayCartVoucher product_seller={productItem.seller} />*/}
              {/* <DisplayOtherOptions productItem={cartdata.product} />  */}
            </div>
          );
        })}
    </>
  );
};

export default DisplayOrders;
