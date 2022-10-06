import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import useWindowDimensions from "~/hooks/windowHooks";
const { Step } = Steps;

const OrderStatus = ({ status }) => {
  const [current, setCurrent] = useState(0);
  const [statusTitle, setStatus] = useState({
    first: "Accepted",
    second: "Shipped",
    third: "Delivered",
  });
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      switch (status.toLowerCase()) {
        case "accepted":
        case "pending":
          setCurrent(0);
          break;
        case "shipped":
          setCurrent(1);
          break;
        case "cancel_initiated":
          setCurrent(1);
          setStatus({
            first: "Accepted",
            second: "Cancel Initiated",
            third: "Cancelled",
          });
          break;
        case "delivered":
        case "success":
          setCurrent(2);
          break;
        case "cancelled":
          setCurrent(2);
          setStatus({
            first: "Accepted",
            second: "Cancel Initiated",
            third: "Cancelled",
          });
          break;
        default:
          break;
      }
    }
    return () => (isMounted = false);
  }, [status]);

  return (
    <>
      <Steps
        progressDot
        current={current}
        size="small"
        direction={width > 992 ? "horizontal" : "vertical"}
      >
        <Step title={statusTitle.first} />
        <Step title={statusTitle.second} />
        <Step title={statusTitle.third} />
      </Steps>
    </>
  );
};

export default OrderStatus;
