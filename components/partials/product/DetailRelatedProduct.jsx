import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";

import { connect } from "react-redux";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";
import ProductRelated from "~/components/elements/products/ProductRelated";
import ProductRealtedSlider from "~/components/elements/products/ProductRealtedSlider";
import { carouselStandard } from "~/utilities/carousel-helpers";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";

const DetailRelatedProduct = ({ collectionSlug, boxed, layout, product }) => {
  const [productItems, setProductItems] = useState(product);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    setLoading(true);
    const responseData = await getProductsByCollectionHelper(collectionSlug);
    if (responseData) {
      //  setProductItems(responseData.items);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        2000
      );
    }
  }

  useEffect(() => {
    getProducts();
  }, [collectionSlug]);

  const carouselFullwidth = {
    dots: false,
    infinite: productItems && productItems.length > 7 ? true : false,
    speed: 750,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    lazyload: true,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          dots: true,
          arrows: false,
        },
      },

      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  // Views
  let carouselView;
  if (!loading) {
    if (product && product.relative_products.length > 0) {
      if (product.relative_products.length <= 6) {
        if ((layout = "fullwidth")) {
          const slideItems = product.relative_products.map((item) => (
            <ProductRelated product={item} key={item.id} />
          ));
          carouselView = (
            <div className="align-content-lg-stretch row">{slideItems}</div>
          );
        } else {
          const slideItems = product.relative_products.map((item) => (
            <ProductRelated product={item} key={item.id} />
          ));
          carouselView = (
            <div className="align-content-lg-stretch row">{slideItems}</div>
          );
        }
      } else {
        if ((layout = "fullwidth")) {
          carouselView = (
            <Slider {...carouselFullwidth} className="ps-carousel outside">
              {product.relative_products.map((item, index) => {
                if (index < 8) {
                  return <ProductRealtedSlider product={item} key={item.id} />;
                }
              })}
            </Slider>
          );
        } else {
          carouselView = (
            <Slider {...carouselStandard} className="ps-carousel outside">
              {product.relative_products.map((item, index) => {
                if (index < 8) {
                  return <ProductRealtedSlider product={item} key={item.id} />;
                }
              })}
            </Slider>
          );
        }
      }
    } else {
      carouselView = <p>No product found.</p>;
    }
  } else {
    carouselView = <p>Loading...</p>;
  }

  return (
    <div
      className={`ps-section--default ps-related-products ${
        boxed === true ? "boxed" : ""
      }`}
    >
      <div className="ps-section__header">
        <h3>Related products</h3>
      </div>
      <div className="ps-section__content">{carouselView}</div>
    </div>
  );
};

export default connect((state) => state.collection)(DetailRelatedProduct);
