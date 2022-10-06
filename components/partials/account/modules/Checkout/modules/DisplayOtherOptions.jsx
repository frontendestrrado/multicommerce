import { Input, Tooltip } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sellerWiseMessage } from "~/store/cart/action";
import {
  currencyHelperConvertToRinggit,
  priceHelper,
  returnTotalOfCartValue,
  returnTotalOfProductValue,
} from "~/utilities/product-helper";

const DisplayOtherOptions = ({ productItem }) => {
  const [messageForSeller, setMessageForSeller] = useState("");
  const [inputVal, setInputVal] = useState("");
  const dispatch = useDispatch();

  const { seller_wise_messages } = useSelector((state) => state.cart);

  const handleOnRemoveInputMessage = () => {
    let array_without_selected_seller = seller_wise_messages.filter(
      (message) => {
        message.seller_id !== productItem.seller_id;
      }
    );
    dispatch(sellerWiseMessage(array_without_selected_seller));
  };

  const handleOnEnterInputMessage = () => {
    setInputVal(messageForSeller);

    dispatch(
      sellerWiseMessage([
        ...seller_wise_messages,
        {
          seller_id: productItem.seller.seller_id,
          message: messageForSeller,
        },
      ])
    );
    setMessageForSeller("");
  };

  let seller_message = seller_wise_messages?.filter(
    (message) => message.seller_id == productItem.seller.seller_id
  );

  return (
    <>
      <div
        style={{
          background: "#fffaf9",
          borderTop: "1px dashed",
        }}
      >
        <div className="row align-items-center">
          <div
            className="col"
            style={{
              borderRight: "1px dashed",
            }}
          >
            <div className="p-4">
              {seller_message?.length > 0 ? (
                <Tooltip title={"Click to Remove Message"}>
                  <span
                    onClick={handleOnRemoveInputMessage}
                    style={{ cursor: "pointer" }}
                  >
                    Message: {seller_message[0].message}
                  </span>
                </Tooltip>
              ) : (
                <Input
                  placeholder="(Optional)Leave a message to seller"
                  size="middle"
                  prefix={
                    <span className="d-none d-lg-block d-xl-block">
                      Message
                    </span>
                  }
                  value={messageForSeller}
                  onChange={(e) => setMessageForSeller(e.target.value)}
                  onPressEnter={handleOnEnterInputMessage}
                />
              )}
            </div>
          </div>
          <div className="col">
            <div>
              <span style={{ color: "rgb(255, 0, 0)" }}>Shipping Option</span>
              <span className="float-right font-weight-bold">
                Standard Delivery
              </span>
            </div>
          </div>
          <div className="col">
            <div>
              <span style={{ color: "rgb(255, 0, 0)" }}>Change</span>
              <span className="float-right mr-5">RM 0.00</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="stor-slct p-5 d-flex"
        style={{
          background: "#fffaf9",
          borderTop: "1px dashed",
        }}
      >
        <div className="p-2 flex-fill bd-highlight">
          <p className="float-right">
            Order total({productItem.seller.products.length} item):
            <span
              className="prdt ml-4"
              style={{ color: "#ff0000", fontSize: "large" }}
            >
              {currencyHelperConvertToRinggit(
                returnTotalOfCartValue(productItem.seller.products)
              )}
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default DisplayOtherOptions;
