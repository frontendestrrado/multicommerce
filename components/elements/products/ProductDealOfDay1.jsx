import React from "react";
import ModuleCardProduct1 from "../detail/modules/DealOfDay/ModuleDealOfDayCardProduct1";

const ProductDealOfDay1 = ({ product }) => {
  return (
    <div className="col-xl-2 col-lg-3 col-sm-3 col-6">
      <ModuleCardProduct1 product={product} />
    </div>
  );
};

export default ProductDealOfDay1;
