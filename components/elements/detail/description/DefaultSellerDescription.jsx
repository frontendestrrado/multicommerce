import React, { useState } from "react";
import Link from "next/link";
import Rating from "~/components/elements/Rating";

import { Tabs, Comment, Card, Select } from "antd";

const { TabPane } = Tabs;

const DefaultSellerDescription = ({ products_detail, seller, review }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const renderProduct = (products) => {
    const render_product =
      products &&
      products
        ?.sort((a, b) => a.rating > b.rating)
        .map((product) => {
          return (
            <div
              className="ps-product ps-product--simple col-xl-3 col-lg-3 col-md-3 mt-4"
              key={product.product_id}
            >
              <Card style={{ width: "auto" }}>
                <div className="ps-product__thumbnail">
                  <img
                    src={product?.image[0]?.image}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "/static/img/vendor/store/vendor-150x150.jpg";
                    }}
                    alt={product.product_name}
                    height="150"
                  />
                </div>
                <div className="ps-product__container">
                  <Link href="/shop">
                    <a className="ps-product__vendor">{product.shop_name}</a>
                  </Link>
                  <div className="ps-product__content">
                    <Link
                      href="/product/[pid]"
                      as={`/product/${product.product_id}`}
                    >
                      <a className="ps-product__title">
                        {product.product_name.length > 10
                          ? product.product_name.slice(0, 10) + "..."
                          : product.product_name}
                      </a>
                    </Link>
                    <div className="ps-product__rating">
                      <Rating rating={product.rating} />
                      <span>02</span>
                    </div>
                    {/* {featureproductprice(product)} */}
                    {product.sale_price >
                    (product.price || product.actual_price) ? (
                      <p className="ps-product__price">
                        SAR {product.sale_price}{" "}
                        <span className="lin-prdt">
                        SAR {product.price || product.actual_price}
                        </span>
                      </p>
                    ) : (
                      <p className="ps-product__price">
                        SAR {product.price || product.actual_price}{" "}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          );
        });

    return render_product;
  };
  return (
    <div className="ps-product__content ps-tab-root">
      <Tabs defaultActiveKey="1">
        <TabPane tab={"Products " + "(" + seller.no_of_products + ")"} key="1">
          <div>
            <section className="ps-section--account-setting">
              <div className="ps-section__content row">
                {renderProduct(products_detail)}
              </div>
            </section>
          </div>
        </TabPane>
        <TabPane tab={"Reviews & Ratings " + "(" + review.length + ")"} key="2">
          <section className="ps-section--account-setting">
            <div className="ps-section__content">
              {review.map((comment, index) => {
                return (
                  <Comment
                    author={
                      <span className="font-weight-bold">
                        {" "}
                        {comment.customer_name}
                      </span>
                    }
                    content={
                      <div>
                        <Rating rating={comment.rating} />
                        <p>{comment.comment}</p>
                      </div>
                    }
                    key={index}
                  />
                );
              })}
            </div>
          </section>
        </TabPane>
        <TabPane tab="About" key="3">
          <section className="ps-section--account-setting">
            <div class="container">
              <blockquote class="blockquote">
                <p class="mb-0">
                  {seller.about || "Seller Long Description Demo Text"}
                </p>
              </blockquote>
            </div>
          </section>
        </TabPane>
        <TabPane tab="Search Products" key="4">
          <section className="ps-section--account-setting">
            <input
              className="form-control w-50 mx-auto border-success"
              type="text"
              placeholder="Search Here"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            <div className="ps-section__content row">
              {renderProduct(
                products_detail.filter((value) => {
                  if (searchTerm === "") {
                    return value;
                  } else if (
                    value.product_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  }
                  return null;
                })
              )}
            </div>
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DefaultSellerDescription;
