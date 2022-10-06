import React from "react";
import { Image } from "antd";

const ProductThumbnailWithoutLazyLoad = ({ imageLink }) => {
  return (
    <div
      className="ps-product__thumbnail text-center d-flex"
      style={{
        height: "200px",
        width: "100%",
        padding: "5px",
        marginBottom: "inherit",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src={imageLink || "/static/img/not-found.jpg"}
        preview={false}
        style={{ maxHeight: "170px" }}
        fallback="/static/img/not-found.jpg"
      />
    </div>
  );
};

export default ProductThumbnailWithoutLazyLoad;
