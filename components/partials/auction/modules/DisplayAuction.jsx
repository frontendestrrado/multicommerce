import React from "react";
import Link from "next/link";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";

const DisplayAuction = ({ auctiondata }) => {
  return (
    <>
      <div className="cart-header">
        <div className="prdct-tit">
          <span style={{ fontSize: "18px" }}>Product Ordered</span>
        </div>
        <div className="unt-tit d-none d-xl-block">Bidding Amount</div>
        <div className="Qty-tit d-none d-xl-block">Quantity</div>
        <div className="tot-tit d-none d-xl-block"></div>
        <div className="act-tit d-none d-xl-block">Bidding Commission</div>
      </div>
      <div className="prdt-box">
        <div
          className="stor-slct"
          style={{
            borderBottom: "none",
            padding: "0",
          }}
        >
          <a className="stor-tit ml-5" href=""></a>
        </div>
        <div className="prdt-det" style={{ paddingLeft: "10px" }}>
          <div className="prdt-det-inner">
            <div className="prdct-innr">
              <div className="prdt-img">
                <div className="prdt-img-innr">
                  <div className="prodct-imge">
                    <Link
                      href={`/auction/${auctiondata.id}`}
                      as={`/auction/${auctiondata.id}`}
                    >
                      <a>
                        <img
                          src={
                            auctiondata?.product_image[0]?.image ||
                            "/static/img/not-found.jpg"
                          }
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "/static/img/vendor/store/vendor-150x150.jpg";
                          }}
                          alt={auctiondata.product_name}
                          height="80"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="prod-title">
                    <div className="prod-title-inner">
                      <Link
                        href={`/auction/${auctiondata.id}`}
                        as={`/auction/${auctiondata.id}`}
                      >
                        <a>{auctiondata.product_name}</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="prdct-vari"></div>
              <div className="prdct-unt-pric">
                <div>
                  <span className="prdt" style={{ fontSize: "1.5rem" }}>
                    <span className="prdt" style={{ fontSize: "1.5rem" }}>
                      {currencyHelperConvertToRinggit(
                        auctiondata.Bidding_amount
                      )}
                    </span>
                  </span>
                </div>
              </div>
              <div className="prdt-add">
                <div className="prdt-qty">
                  <span style={{ fontSize: "1.5rem" }}>1</span>
                </div>
              </div>
              <div className="prdt-totl"></div>
              <div className="prdt-totl">
                <span style={{ fontSize: "1.5rem" }}>
                  {currencyHelperConvertToRinggit(
                    auctiondata.Bidding_commission
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayAuction;
