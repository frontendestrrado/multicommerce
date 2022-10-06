import React from "react";
import { Statistic } from "antd";

const { Countdown } = Statistic;

const CountDownSimpleDiff = ({ endTime, classAdd = "" }) => {
  return (
    <Countdown
      style={{ fontSize: "15px" }}
      value={endTime}
      format="D:H:mm:ss"
      className={`font-weight-bold ${classAdd}`}
    />
  );
};

export default CountDownSimpleDiff;
