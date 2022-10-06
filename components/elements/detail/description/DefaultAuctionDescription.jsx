import React from "react";

import { Tabs } from "antd";
import PartialAuctionDescription from "~/components/elements/detail/description/PartialDescription";
import PartialAuctionSpecification from "~/components/elements/detail/description/PartialAuctionSpecification";
import PartialVendor from "~/components/elements/detail/description/PartialVendor";
import PartialAuctionReview from "~/components/elements/detail/description/PartialAuctionReview";
import PartialOffer from "~/components/elements/detail/description/PartialOffer";

const { TabPane } = Tabs;

const DefaultAuctionDescription = ({ product }) => {
  return (
    <div className="ps-product__content ps-tab-root">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Description" key="1">
          <PartialAuctionDescription product={product} />
        </TabPane>
        <TabPane tab="Specification" key="2">
          <PartialAuctionSpecification product={product} />
        </TabPane>
        {/* <TabPane tab="Vendor" key="3">
          <PartialVendor />
        </TabPane> */}
        {/* <TabPane
          // tab={"Reviews " + "(" + product.total_review + ")"}
          key="4"
        >
          <PartialAuctionReview product={product} />
        </TabPane> */}
        {/* <TabPane tab="Questions and Answers" key="5">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="More Offers" key="6">
          <PartialOffer />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default DefaultAuctionDescription;
