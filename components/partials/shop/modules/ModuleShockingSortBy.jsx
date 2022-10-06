import React from "react";
import { useRouter } from "next/router";

const ModuleShockingSortBy = () => {
  const Router = useRouter();

  const handleChange = (e) => {
    if (e.target.value !== "") {
      Router.push("/shockingproducts?" + e.target.value + "=1");
    } else {
      Router.push("/shockingproducts");
    }
  };
  return (
    <select
      className="ps-select form-control"
      data-placeholder="Sort Items"
      onChange={handleChange}
      id="sort_product"
    >
      <option value="">--select--</option>
      <option value="latest">Sort by latest</option>
      <option value="low_to_high">Sort by price: low to high</option>
      <option value="high_to_low"> Sort by price: high to low</option>
    </select>
  );
};

export default ModuleShockingSortBy;
