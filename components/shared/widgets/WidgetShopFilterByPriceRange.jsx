import React, { useState, useEffect } from "react";
import { Slider, Checkbox } from "antd";
import { useRouter } from "next/router";
import { routeWithoutRefresh } from "~/utilities/product-helper";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const WidgetShopFilterByPriceRange = () => {
  const Router = useRouter();
  const pathDetail = Router.pathname;
  const [keyword, setKeyword] = useState("");
  const debouncedSearchTerm = useDebounce(keyword, 100);

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleChangeRange(keyword);
    }
  }, [debouncedSearchTerm]);

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

  const [min, setMin] = useState(price_gt ? price_gt : 0);
  const [max, setMax] = useState(price_lt ? price_lt : 2000);

  function handleChangeRange(value) {
    let filterpart = window.location.search;
    let pattern = "";
    if (price_gt || price_lt) {
      pattern = `&price_gt=${price_gt}&price_lt=${price_lt}`;
    }

    if (
      category !== undefined ||
      subcategory_id !== undefined ||
      brand !== undefined ||
      price_gt !== undefined ||
      price_lt !== undefined ||
      page !== undefined ||
      low_to_high !== undefined ||
      latest !== undefined ||
      high_to_low !== undefined
    ) {
      let newdd = filterpart.replace(pattern, "");

      setMin(value[0]);
      price_lt: value[1], setMax(value[1]);
      let element = document.getElementById("sort_product");
      element.value = "";
      /*  const params = {
            price_gt: value[0],
        };*/
      routeWithoutRefresh(
        `${pathDetail}${newdd}&price_gt=${value[0]}&price_lt=${value[1]}`
      );
    } else {
      setMin(value[0]);
      price_lt: value[1], setMax(value[1]);
      let element = document.getElementById("sort_product");
      element.value = "";
      /*  const params = {
            price_gt: value[0],
        };*/
      routeWithoutRefresh(
        `${pathDetail}?&price_gt=${value[0]}&price_lt=${value[1]}`
      );
    }
    /*this.props.dispatch(getProductsByPrice(params));*/
  }

  const removePriceFilter = () => {
    let filterpart = window.location.search;
    let pattern = "";
    if (price_gt || price_lt) {
      pattern = `&price_gt=${price_gt}&price_lt=${price_lt}`;
    }
    let newdd = filterpart
      .replace(pattern, "")
      .replace("&price_gt=", "")
      .replace("&price_lt=", "");
    routeWithoutRefresh(`${pathDetail}${newdd}`);
    return;
  };

  return (
    <aside className="widget widget_shop">
      <figure>
        <h4 className="widget-title">By Price</h4>
        <Slider
          range
          defaultValue={[0, 2000]}
          max={2000}
          value={[price_gt ? price_gt : 0, price_lt ? price_lt : 2000]}
          onChange={(e) => handleChangeRange(e)}
          // onAfterChange={(e) => handleChangeRange(e)}
          // onAfterChange={(e) => setKeyword(e)}
        />
        <p>
          Price: SAR {price_gt ? price_gt : 0} - SAR {price_lt ? price_lt : 2000}
        </p>
      </figure>
      <span
        onClick={removePriceFilter}
        className={price_lt || price_gt ? "" : "d-none"}
        style={{ color: "red", fontWeight: "600", cursor: "pointer" }}
      >
        Remove Price Filter
      </span>
    </aside>
  );
};

export default WidgetShopFilterByPriceRange;
