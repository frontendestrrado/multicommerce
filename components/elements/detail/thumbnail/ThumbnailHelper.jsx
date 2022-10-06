import React from "react";
import LazyLoad from "react-lazyload";
import { Image } from "antd";

const ThumbnailHelper = ({ imageData, height }) => {
  return (
    <LazyLoad>
      <Image
        width={"100%"}
        height={height || 150}
        src={imageData || "/static/img/not-found.jpg"}
        preview={false}
      />
    </LazyLoad>
    // <img
    //   src={imageData || "/static/img/not-found.jpg"}
    //   onError={(e) => {
    //     e.target.onerror = null;
    //     e.target.src = "/static/img/not-found.jpg";
    //   }}
    //   height={height}
    // />
  );
};

export default ThumbnailHelper;
