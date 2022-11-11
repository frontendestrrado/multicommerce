import { useRouter } from "next/router";
import React from "react";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";

const AuctionDetail = ({ auction_order_list }) => {
  const statusBtn = (status) => {
    switch (status.toLowerCase()) {
      case "auction inprogress":
        return (
          <button className="updtbtn text-warning mt-2">
            Auction Inprogress
          </button>
        );
      case "refund initiated":
        return <button className="updtbtn mt-2">Refund Initiated</button>;
      case "refunded":
        return <button className="updtbtn adto mt-2">Refunded</button>;
      case "refund rejected":
        return <button className="updtbtn mt-2 rej">Refund Rejected</button>;
      case "closed":
        return <button className="updtbtn mt-2 text-dark">Closed</button>;
      default:
        break;
    }
  };
  const router = useRouter();
  const handleAuctionWinner = () => {
    router.push(`account/my-orders/${auction_order_list.sale_id}`);
  };

  return (
    <div className="ps-container">
      <div className="row">
        {/* <div className="col-lg-3"></div> */}
        <div
          id="ordr"
          className="col-lg-12"
          style={{ background: "#fff", height: "60rem", overflowY: "scroll" }}
        >
          {auction_order_list?.length > 0 &&
            auction_order_list.map((order, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="card mb-2">
                    <div className="row">
                      <div className="col-md-9">
                        <div className="row">
                          <div className="col-md-12">
                            <h5 style={{ color: "#ff0000" }}>
                              {order.product_name}
                            </h5>
                            <div className="sold">
                              Sold by: <a href="">{order.seller_name}</a>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-3">
                            <div className="ordrplc">Start Date</div>
                            <div className="ordrdat">{order.start_date}</div>
                          </div>
                          <div className="col-md-3">
                            <div className="ordrplc">End Date</div>
                            <div className="ordrdat">{order.end_date}</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="bid">Bid Price</div>
                        <div className="rin">
                          {currencyHelperConvertToRinggit(order.bid_price)}
                        </div>
                        {order.winner_status == 0 ? (
                          statusBtn(order.status)
                        ) : (
                          <button
                            className="updtbtn adto mt-2"
                            onClick={handleAuctionWinner}
                          >
                            You Won this Auction
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <hr />
                </React.Fragment>
              );
            })}
          {/* <div className="card mb-2">
            <div className="row">
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-12">
                    <h5 style={{ color: "#ff0000" }}>Dual Camera 20px</h5>
                    <div className="sold">
                      Sold by: <a href="">Samsung</a>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <div className="ordrplc">Start Date</div>
                    <div className="ordrdat">25/09/2021</div>
                  </div>
                  <div className="col-md-3">
                    <div className="ordrplc">End Date</div>
                    <div className="ordrdat">25/09/2021</div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bid">Bid Price</div>
                <div className="rin">SAR 1234</div>
                <button className="updtbtn mt-2">Inprogress</button>
              </div>
            </div>
          </div>

          <hr />

          <div className="card mb-2">
            <div className="row">
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-12">
                    <h5 style={{ color: "#ff0000" }}>Dual Camera 20px</h5>
                    <div className="sold">
                      Sold by: <a href="">Samsung</a>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <div className="ordrplc">Start Date</div>
                    <div className="ordrdat">25/09/2021</div>
                  </div>
                  <div className="col-md-3">
                    <div className="ordrplc">End Date</div>
                    <div className="ordrdat">25/09/2021</div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bid">Bid Price</div>
                <div className="rin">SAR 1234</div>
                <button className="updtbtn rej mt-2">Rejected</button>
              </div>
            </div>
          </div>

          <hr />

          <div className="card mb-2">
            <div className="row">
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-12">
                    <h5 style={{ color: "#ff0000" }}>Dual Camera 20px</h5>
                    <div className="sold">
                      Sold by: <a href="">Samsung</a>
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-3">
                    <div className="ordrplc">Start Date</div>
                    <div className="ordrdat">25/09/2021</div>
                  </div>
                  <div className="col-md-3">
                    <div className="ordrplc">End Date</div>
                    <div className="ordrdat">25/09/2021</div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="bid">Bid Price</div>
                <div className="rin">SAR 1234</div>
                <button className="updtbtn adto mt-2">Added To Cart</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AuctionDetail;
