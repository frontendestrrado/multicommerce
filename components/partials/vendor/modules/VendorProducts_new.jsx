import React, { Component, useState } from "react";

import ProductWide from "../../../elements/products/ProductWide_new";
import Product from "../../../elements/products/Product";
import { relatedProduct } from "../../../../public/static/data/product";
import ProductOffline from "../../../elements/products/ProductOffline_new";
import { Select } from "antd";
const { Option } = Select;

const VendorProducts = ({ vendor_products }) => {
  const [listView, setlistView] = useState(true);
  const [loadingSort, setLoadingSort] = useState(true);
  const [sortValue, setSortValue] = useState("byrating");
  let products = [];
  if (vendor_products && vendor_products.length > 0) {
    products = vendor_products;
  }
  const viewMode = listView;
  const handleChangeViewMode = (event) => {
    event.preventDefault();
    setlistView(!listView);
  };

  const handleChange = (value) => {
    setSortValue(value);
  };

  let sorted_products = products;
  if (sortValue == "pricelowtohigh") {
    sorted_products = products.sort((a, b) => a.actual_price - b.actual_price);
  }

  if (sortValue == "pricehightolow") {
    sorted_products = products.sort((a, b) => b.actual_price - a.actual_price);
  }

  if (sortValue == "byrating") {
    sorted_products = products.sort((a, b) => b.rating - a.rating);
  }

  return (
    <>
      {products.length > 0 ? (
        <div className="ps-shopping vendor-shop">
          <div className="ps-shopping__header">
            <p>
              <strong> {products ? products.length : 0}</strong> Products found
            </p>
            <div className="ps-shopping__actions">
              <Select
                defaultValue="byrating"
                style={{ width: 200 }}
                onChange={handleChange}
                className="ps-select"
                placeholder="Sort Items"
              >
                <Option value="byrating">Sort by rating</Option>
                <Option value="pricelowtohigh">
                  Sort by price: low to high
                </Option>
                <Option value="pricehightolow">
                  Sort by price: high to low
                </Option>
              </Select>
            </div>
          </div>
          <div className="ps-shopping__content">
            {viewMode === true ? (
              <div className="ps-shopping-product">
                <div className="row">
                  {sorted_products && sorted_products.length > 0
                    ? sorted_products.map((product) => (
                        <div
                          className="col-lg-3 col-md-4 col-sm-6 col-6 "
                          key={product.product_id}
                        >
                          <ProductOffline product={product} />
                        </div>
                      ))
                    : "No products found!"}
                </div>
              </div>
            ) : (
              <div className="ps-shopping-product">
                {sorted_products && sorted_products.length > 0
                  ? sorted_products.map((product) => (
                      <ProductWide product={product} key={product.product_id} />
                    ))
                  : "No products found!"}
              </div>
            )}
          </div>
        </div>
      ) : (
        "No Product Found!"
      )}
    </>
  );
};

export default VendorProducts;
