import React from "react";
import ThumbnailDefault from "~/components/elements/detail/thumbnail/ThumbnailDefault";
import DefaultDescription from "~/components/elements/detail/description/DefaultDescription";
import ModuleProductDetailDescription from "~/components/elements/detail/modules/ModuleProductDetailDescription";
import ModuleDetailShoppingActions from "~/components/elements/detail/modules/ModuleDetailShoppingActions";
import ModuleProductDetailSpecification from "~/components/elements/detail/modules/ModuleProductDetailSpecification";
import ModuleProductDetailSharing from "~/components/elements/detail/modules/ModuleProductDetailSharing";
import ModuleDetailActionsMobile from "~/components/elements/detail/modules/ModuleDetailActionsMobile";
import ModuleDetailTopInformation from "~/components/elements/detail/modules/ModuleDetailTopInformation";
import { connect } from "react-redux";
import ModuleVarientShoppingActions from "./modules/ModuleVarientShoppingActions";
import ModuleVarientActionMobile from "./modules/ModuleVarientActionMobile";

const ProductDetailFullwidth = React.memo(({ product }) => {
  return (
    <div className="ps-product--detail ps-product--fullwidth">
      <div className="ps-product__header">
        <ThumbnailDefault product={product} />
        <div className="ps-product__info">
          <ModuleDetailTopInformation product={product} />
          <ModuleProductDetailDescription product={product} />

          {/* {product?.product?.service_status == 1 &&
          (product?.product?.is_out_of_stock == false ||
            product?.product?.out_of_stock_selling == true) ? ( */}
          {product?.product?.product_type?.toLowerCase() == "config" ? (
            <ModuleVarientShoppingActions product={product} />
          ) : (
            <ModuleDetailShoppingActions product={product} />
          )}

          {/* ) : null} */}

          {/* <ModuleDetailShoppingActions product={product} /> */}

          <ModuleProductDetailSpecification product={product} />
          <ModuleProductDetailSharing />
          {/* {product?.product?.service_status == 1 &&
          (product?.product?.is_out_of_stock == false ||
            product?.product?.out_of_stock_selling == true) ? ( */}

          {product?.product?.product_type?.toLowerCase() == "config" ? (
            <ModuleVarientActionMobile product={product} />
          ) : (
            <ModuleDetailActionsMobile product={product} />
          )}

          {/* ) : null} */}
          {/* <ModuleDetailActionsMobile product={product} /> */}
        </div>
      </div>
      <DefaultDescription product={product} />
    </div>
  );
});

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(ProductDetailFullwidth);
// export default ProductDetailFullwidth;
