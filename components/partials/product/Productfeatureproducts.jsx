import React from "react";
import Slider from "react-slick";
import {
  carouselFullwidth,
  carouselStandard,
} from "~/utilities/carousel-helpers";
import Productfeature from "~/components/elements/products/Productfeature";

export const Productfeatureproducts = ({ product, type = "normal" }) => {
  if (type === "fullwidth") {
    return <Productfeature product={product} />;
  } else {
    return <Productfeature product={product} />;
  }
};
