import React from "react";
import ModuleRelativeProduct1 from "../detail/modules/DealOfDay/ModuleRelativeProduct1";

const ProductRelativeProduct1 = ({ product }) => {
  return (
    <div className="col-xl-2 col-lg-3 col-sm-3 col-6">
      <ModuleRelativeProduct1 product={product} />
    </div>
  );
};

export default ProductRelativeProduct1;
