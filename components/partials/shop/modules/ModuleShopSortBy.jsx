import React from "react";
import { useRouter } from "next/router";
import { routeWithoutRefresh } from "~/utilities/product-helper";

const ModuleShopSortBy = () => {
  const Router = useRouter();
  const {
    page,
    category,
    subcategory_id,
    brand,
    price_gt,
    price_lt,
    low_to_high,
    high_to_low,
    latest,
  } = Router.query;

  const pathDetail = Router.pathname;

  const handleChange = (e) => {
    let filterpart = window.location.search;
    let pattern = "";
    if (low_to_high) {
      pattern = "&low_to_high=1";
    }
    if (high_to_low) {
      pattern = "&high_to_low=1";
    }
    if (latest) {
      pattern = "&latest=1";
    }
    if (e.target.value !== "") {
      if (
        category !== undefined ||
        subcategory_id !== undefined ||
        brand !== undefined ||
        price_gt !== undefined ||
        price_lt !== undefined ||
        page
      ) {
        let newdd = filterpart.replace(pattern, "");
        routeWithoutRefresh(
          `${pathDetail}` + newdd + `&${e.target.value}` + "=1"
        );
      } else {
        routeWithoutRefresh(`${pathDetail}?&${e.target.value}=1`);
      }
    } else {
      let newdd = filterpart.replace(pattern, "");
      routeWithoutRefresh(`${pathDetail}` + newdd);
    }
    // if (e.target.value !== "") {
    //   Router.push(`${pathDetail}?${e.target.value}=1`);
    // } else {
    //   Router.push(`${pathDetail}`);
    // }
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

export default ModuleShopSortBy;
