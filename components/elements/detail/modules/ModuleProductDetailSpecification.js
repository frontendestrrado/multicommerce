import React from "react";
import Link from "next/link";

const ModuleProductDetailSpecification = ({ product }) => (
  <>
    {product ? (
      <div className="ps-product__specification">
        {/* <Link href="/page/blank">
      <a className="report">Report Abuse</a>
    </Link> */}
        <p>
          <strong>SKU:</strong>{" "}
          {product?.product?.sku == null
            ? "Not Inserted"
            : product?.product?.sku}
        </p>
        <p className="categories">
          <strong> Categories:</strong>
          {product?.product?.category_name !== "" ? (
            <Link href={`/shop?&category=${product?.product?.category_id}`}>
              <a>{product?.product?.category_name}</a>
            </Link>
          ) : (
            "Not Inserted"
          )}
          {product?.product?.subcategory_name !== "" ? (
            <Link
              href={`/shop?&subcategory_id=${product?.product?.subcategory_id}`}
            >
              <a>{product?.product?.subcategory_name}</a>
            </Link>
          ) : (
            "Not Inserted"
          )}
        </p>
        <p className="tags">
          <strong> Tags:</strong>
          {product?.product?.tag?.length > 0
            ? product?.product?.tag?.map((data, index) => (
                <Link href="/shop" key={index}>
                  <a>{data}</a>
                </Link>
              ))
            : "Not Inserted"}
        </p>
      </div>
    ) : null}
  </>
);

export default ModuleProductDetailSpecification;
