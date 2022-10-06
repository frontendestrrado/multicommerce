import React from "react";
import ModuleCardProduct from "../detail/modules/DealOfDay/ModuleDealOfDayCardProduct";

const ProductDealOfDay = ({ product }) => {
  return (
    <div className="col-xl-2 col-lg-3 col-sm-3 col-6">
      <ModuleCardProduct product={product} />
    </div>
  );
};

export default ProductDealOfDay;
