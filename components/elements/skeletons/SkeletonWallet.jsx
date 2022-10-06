import React from "react";
import { Skeleton, List } from "antd";

const SkeletonWallet = () => {
  return (
    <div className="ps-skeleton--product">
      <div className="container">
        <Skeleton.Input style={{ width: 200 }} active />
      </div>
    </div>
  );
};

export default SkeletonWallet;
