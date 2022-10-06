import React, { useEffect, useState } from "react";
import ProductRepository from "~/repositories/ProductRepository";
import Link from "next/link";
import { useRouter } from "next/router";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
const WidgetShockingSaleCategories = () => {
  const Router = useRouter();
  const { category, subcategory_id } = Router.query;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [catlimit, setCatlimit] = useState(10);
  const [expandcat, setExpandcat] = useState("");

  const { slug } = Router.query;

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

  const handleCategory = (category) => {
    let element = document.getElementById("sort_product");
    element.value = "";
    Router.push(`/shockingproducts?category=${category}`);
  };
  const handleSubCategory = (subcat) => {
    let element = document.getElementById("sort_product");
    element.value = "";
    Router.push(`/shockingproducts?subcategory_id=${subcat}`);
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
      const items = categorylist.map((item) => (
        <li
          key={item.slug}
          className={
            item.category_id == category ? "cat_item active" : "cat_item"
          }
        >
          <a href="javascript:void(0);">
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
      categoriesView = <ul className="ps-list--categories">{items}</ul>;
    } else {
    }
  } else {
    categoriesView = <p>Loading...</p>;
  }

  return (
    <aside className="widget widget_shop">
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

export default WidgetShockingSaleCategories;
