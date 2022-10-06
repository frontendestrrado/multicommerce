import React, { useState, useEffect } from "react";
import background from "~/public/static/img/custom_images/auction_home.jpg";
import Link from "next/link";
import Slider from "react-slick";
import ProductAuction from "~/components/elements/products/ProductAuction";
import { generateTempArray } from "~/utilities/common-helpers";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import {
  getProductsByCategoriesHelper,
  getProductsByCollectionHelper,
} from "~/utilities/strapi-fetch-data-helpers";
// import { carouselStandard } from "~/utilities/carousel-helpers";
import { useRouter } from "next/router";
import { getHomedata } from "~/utilities/home-helper";
import CountDownSimple from "~/components/elements/CountDownSimple";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";
import ProductAuctionSlide from "~/components/elements/products/ProductAuctionSlide";

const Auction = ({
  collectionSlug,
  categorySlug,
  boxed = false,
  homeitems,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const checkSalesobject = (homeitems) => {
    if ("auction" in homeitems) {
      return true;
    } else {
      return false;
    }
  };

  const carouselStandard = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 750,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let productItemsView;
  if (!loading) {
    if (
      checkSalesobject(homeitems) &&
      homeitems &&
      homeitems.auction.length > 0
    ) {
      const productItems = homeitems.auction;

      const slideItems =
        productItems > 4
          ? productItems.map((item) => {
              return (
                <ProductAuctionSlide product={item} key={item.auction_id} />
              );
            })
          : productItems.map((item) => {
              return <ProductAuction product={item} key={item.auction_id} />;
            });

      productItemsView = (
        <>
          {productItems > 4 ? (
            <Slider {...carouselStandard} className="ps-carousel outside">
              {slideItems}
            </Slider>
          ) : (
            <div className="align-content-lg-stretch row">{slideItems}</div>
          )}
        </>
      );
    } else {
      productItemsView = <p>No product found.</p>;
    }
  } else {
    const skeletons = generateTempArray(6).map((item) => (
      <div className="col-xl-2 col-lg-3 col-sm-3 col-6" key={item}>
        <SkeletonProduct />
      </div>
    ));
    productItemsView = <div className="row">{skeletons}</div>;
  }

  return (
    <div
      className="ps-deal-of-day home-auction"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "bottom",
      }}
    >
      <div className={boxed ? "ps-container" : "ps-container"}>
        <div className="ps-section__header">
          <div className="ps-block--countdown-deal">
            <div className="ps-block__left">
              <h3
                style={{
                  fontWeight: 600,
                  fontStyle: "italic",
                }}
              >
                Auction
              </h3>
            </div>
            <div className="ps-block__right"></div>
          </div>
          <Link href="/auction">
            <a style={{ color: "white" }}>View All</a>
          </Link>
        </div>
        <div
          className={
            homeitems.auction.length > 4 ? "" : `row align-content-lg-stretch`
          }
          style={{ marginLeft: homeitems.auction.length > 4 ? "" : "2rem" }}
        >
          {/* <div className=""> */}

          {productItemsView}
        </div>
      </div>
    </div>
  );
};

export default Auction;
