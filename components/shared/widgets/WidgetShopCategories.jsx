import React, { useEffect, useState } from "react";
import ProductRepository from "~/repositories/ProductRepository";
import Link from "next/link";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import { routeWithoutRefresh } from "~/utilities/product-helper";
const WidgetShopCategories = () => {
  const Router = useRouter();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catlimit, setCatlimit] = useState(10);
  const [expandcat, setExpandcat] = useState("");

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

  async function getCategories() {
    setLoading(true);
    const responseData = await ProductRepository.getProductCategories();
    if (responseData) {
      setCategories(responseData.data.cat_subcat);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }
  useEffect(() => {
    getCategories();
  }, []);

  const handleCategory = (category_id) => {
    let filterpart = window.location.search;
    let pattern = "";
    if (category) {
      pattern = `&category=${category}`;
    }
    if (subcategory_id) {
      pattern = `&subcategory_id=${subcategory_id}`;
    }
    if (category_id == "") {
      let newdd = filterpart
        .replace(pattern, "")
        .replace(`category=${category}`, "")
        .replace(`subcategory_id=${subcategory_id}`, "")
        .replace("category=", "")
        .replace("subcategory_id=", "")
        .replace("&category=", "")
        .replace("&subcategory_id=", "");
      routeWithoutRefresh(`${pathDetail}${newdd}`);
      return;
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
      let newdd = filterpart
        .replace(pattern, "")
        .replace(`category=${category}`, "")
        .replace(`subcategory_id=${subcategory_id}`, "")
        .replace("category=", "")
        .replace("subcategory_id=", "")
        .replace("&category=", "")
        .replace("&subcategory_id=", "");

      let element = document.getElementById("sort_product");
      element.value = "";
      routeWithoutRefresh(`${pathDetail}${newdd}&category=${category_id}`);
    } else {
      routeWithoutRefresh(`${pathDetail}?&category=${category_id}`);
    }
  };

  const handleSubCategory = (subcat) => {
    let filterpart = window.location.search;
    let pattern = "";
    if (category) {
      pattern = `&category=${category}`;
    }
    if (subcategory_id) {
      pattern = `&subcategory_id=${subcategory_id}`;
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
      let newdd = filterpart
        .replace(pattern, "")
        .replace(`category=${category}`, "")
        .replace(`subcategory_id=${subcategory_id}`, "")
        .replace("&category=", "")
        .replace("category=", "")
        .replace("&subcategory_id=", "")
        .replace("subcategory_id=", "");

      let element = document.getElementById("sort_product");
      element.value = "";
      routeWithoutRefresh(`${pathDetail}${newdd}&subcategory_id=${subcat}`);
    } else {
      routeWithoutRefresh(`${pathDetail}?&subcategory_id=${subcat}`);
    }
  };

  const viewAll = () => {
    setCatlimit(categories.length);
  };

  const expanSubcat = (id) => {
    if (expandcat !== id) {
      setExpandcat(id);
    } else {
      setExpandcat("");
    }
  };
  // Views
  let categoriesView;
  if (!loading) {
    const categorylist =
      categories.length > 10 ? categories.slice(0, catlimit) : categories;
    if (categorylist && categorylist.length > 0) {
      const items = categorylist.map((item, index) => (
        <li
          key={index}
          className={
            item.category_id == category ? "cat_item active" : "cat_item"
          }
        >
          <a>
            <span onClick={() => handleCategory(item.category_id)}>
              {item.category_name}
            </span>
            {item.subcategory.length > 0 && (
              <span onClick={() => expanSubcat(item.category_id)}>
                {expandcat !== item.category_id ? (
                  <ExpandMoreIcon />
                ) : (
                  <ExpandLessIcon />
                )}
              </span>
            )}
          </a>
          {item.subcategory.length > 0 &&
            expandcat === item.category_id &&
            item.subcategory.map((subcat, index) => (
              <ul className="ps-list--categories pl-subcategory" key={index}>
                <li
                  className={
                    subcat.id == subcategory_id ? "cat_item active" : "cat_item"
                  }
                  onClick={() => handleSubCategory(subcat.id)}
                >
                  {subcat.subcategory_name}
                </li>
              </ul>
            ))}
        </li>
      ));
      categoriesView = (
        <ul className="ps-list--categories">
          <li
            key={"empty"}
            className={
              category == undefined && subcategory_id == undefined
                ? "cat_item--brand active"
                : "cat_item"
            }
            onClick={() => handleCategory("")}
          >
            {`All Categories`}
          </li>
          {items}
        </ul>
      );
    } else {
    }
  } else {
    categoriesView = <p>Loading...</p>;
  }

  return (
    <aside className="widget widget_shop text-capitalize">
      <h4 className="widget-title">Categories</h4>
      {categoriesView}
      {categories.length > 10 && catlimit === 10 && (
        <span onClick={() => viewAll()} className="view_allbtn">
          View all
        </span>
      )}
    </aside>
  );
};

export default WidgetShopCategories;
