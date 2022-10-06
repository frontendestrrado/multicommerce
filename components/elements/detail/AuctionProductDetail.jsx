import React from "react";
import ThumbnailAuctionDefault from "~/components/elements/detail/thumbnail/ThumbnailAuctionDefault";
import DefaultAuctionDescription from "~/components/elements/detail/description/DefaultAuctionDescription";
import ModuleAuctionDetailDescription from "~/components/elements/detail/modules/Auction/ModuleAuctionDetailDescription";
import ModuleAuctionAction from "~/components/elements/detail/modules/Auction/ModuleAuctionAction";
import ModuleProductDetailSpecification from "~/components/elements/detail/modules/ModuleProductDetailSpecification";
import ModuleProductDetailSharing from "~/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleAuctionDetailTopInformation from "~/components/elements/detail/modules/Auction/ModuleAuctionDetailTopInformation";
import { connect } from "react-redux";
import ModuleAuctionActionMobile from "./modules/Auction/ModuleAuctionActionMobile";

const AuctionProductDetail = ({ product }) => {
  return (
    <div className="ps-product--detail ps-product--fullwidth">
      <div className="ps-product__header">
        <ThumbnailAuctionDefault product={product} />
        <div className="ps-product__info">
          <ModuleAuctionDetailTopInformation product={product} />
          <ModuleAuctionDetailDescription product={product} />
          <ModuleAuctionAction product={product} />
          {/* <ModuleProductDetailSpecification product={product} /> */}
          <ModuleProductDetailSharing />
          <ModuleAuctionActionMobile product={product} />
        </div>
      </div>
      <DefaultAuctionDescription product={product} />
    </div>
  );
};

export default AuctionProductDetail;
