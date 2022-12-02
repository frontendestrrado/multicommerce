import { Image } from "antd";
import React from "react";
import LazyLoad from "react-lazyload";

const ProductThumbnail = ({ imageLink }) => {
  return (
    <div
      className="ps-product__thumbnail text-center d-flex"
      style={{
        height: "120px",
        width: "100%",
        padding: "5px",
        marginBottom: "inherit",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LazyLoad>
        <Image
          src={imageLink || "/static/img/not-found.jpg"}
          preview={false}
          style={{ maxHeight: "120px" }}
          fallback="/static/img/not-found.jpg"
        />
      </LazyLoad>
    </div>
  );
};

export default ProductThumbnail;
