import React, { useEffect, useState } from "react";
import ProductRepository from "~/repositories/ProductRepository";
import Link from "next/link";
import { Checkbox } from "antd";
import { Radio, Input } from "antd";
import { useRouter } from "next/router";
import { routeWithoutRefresh } from "~/utilities/product-helper";

const WidgetShopBrands = () => {
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
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandlimit, setBrandlimit] = useState(10);
  const pathDetail = Router.pathname;

  async function getBrands() {
    setLoading(true);
    const responseData = await ProductRepository.getBrands();
    if (responseData) {
      let brandsGroup = [];
      if (responseData.data.brands.length > 0) {
        responseData.data.brands.forEach((brand) => {
          brandsGroup.push({
            id: brand.brand_id,
            value: brand.brand_name,
            label: brand.brand_name,
          });
        });
      }
      setBrands(brandsGroup);

      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  function handleSelectBrand(e) {
    Router.replace(`${pathDetail}?brand=${e.target.id}`);
  }

  useEffect(() => {
    getBrands();
  }, []);
  const handleBrand = (brand_id) => {
    let filterpart = window.location.search;
    let pattern = "";
    if (brand) {
      pattern = `&brand=${brand}`;
    }

    if (brand_id == "") {
      let newdd = filterpart.replace(pattern, "").replace("&brand=", "");
      routeWithoutRefresh(`${pathDetail}${newdd}`);
      return;
    }
    if (
      category !== undefined ||
      subcategory_id !== undefined ||
      brand !== undefined ||
      price_gt !== undefined ||
      price_lt !== undefined ||
      page ||
      low_to_high ||
      latest ||
      high_to_low
    ) {
      let newdd = filterpart.replace(pattern, "").replace("&brand=", "");
      let element = document.getElementById("sort_product");
      element.value = "";
      routeWithoutRefresh(`${pathDetail}${newdd}&brand=${brand_id}`);
    } else {
      routeWithoutRefresh(`${pathDetail}?&brand=${brand_id}`);
    }
  };

  const viewAll = () => {
    setBrandlimit(brands.length);
  };
  let brandsView;
  if (!loading) {
    const brandylist =
      brands.length > 10 ? brands.slice(0, brandlimit) : brands;
    if (brandylist && brandylist.length > 0) {
      const items = brandylist.map((item) => (
          <li
          key={item.value}
          className={item.id == brand ? "cat_item--brand active" : "cat_item"}
          onClick={() => handleBrand(item.id)}
        >
          <input type="radio" name="age"  key={item.value}/>
          {item.value}
        </li>
      ));
      brandsView = (
        <ul className="ps-list--categories">
          <li
            key={"empty"}
            className={
              brand == undefined ? "cat_item--brand active" : "cat_item"
            }
            onClick={() => handleBrand("")}
          >
            {`All Brands`}
          </li>
          {items}
        </ul>
      );
    } else {
    }
  } else {
    brandsView = <p>Loading...</p>;
  }

  return (
    <aside className="widget widget_shop widget_shop--brand">
      <h4 className="widget-title">By Brands</h4>
      {brandsView}
      {brands.length > 10 && brandlimit === 10 && (
        <span onClick={() => viewAll()} className="view_allbtn">
          View all
        </span>
      )}
    </aside>
  );
};

export default WidgetShopBrands;
