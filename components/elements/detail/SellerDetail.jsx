import React from "react";
import ThumbnailAuctionDefault from "~/components/elements/detail/thumbnail/ThumbnailAuctionDefault";
import DefaultSellerDescription from "~/components/elements/detail/description/DefaultSellerDescription";
import ModuleSellerDetailDescription from "~/components/elements/detail/modules/ModuleSellerDetailDescription";

import ModuleProductDetailSpecification from "~/components/elements/detail/modules/ModuleProductDetailSpecification";
import ModuleProductDetailSharing from "~/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleDetailActionsMobile from "~/components/elements/detail/modules/ModuleDetailActionsMobile";
import ModuleSellerTopInformation from "~/components/elements/detail/modules/ModuleSellerTopInformation";

const SellerDetail = ({ seller, products, seller_review }) => {
  return (
    <div className="ps-product--detail ps-product--fullwidth">
      <div className="ps-product__header">
        <div className="ps-product__thumbnail">
          <figure>
            <div className="ps-wrapper">
              <img
                src={seller[0].logo}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/static/img/vendor/store/vendor-150x150.jpg";
                }}
                alt={seller[0].name}
              />
            </div>
          </figure>
        </div>

        <div className="ps-product__info">
          <ModuleSellerTopInformation product={seller[0]} />
          <ModuleSellerDetailDescription product={seller[0]} />
          {/* <ModuleAuctionAction product={product} /> */}
          {/* <ModuleProductDetailSpecification product={product} /> */}
          {/* <ModuleProductDetailSharing />
          <ModuleDetailActionsMobile /> */}
        </div>
      </div>
      <DefaultSellerDescription
        products_detail={products[0]}
        seller={seller[0]}
        review={seller_review[0]}
      />
    </div>
  );
};

export default SellerDetail;
