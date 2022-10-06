import React, { useEffect, useState } from "react";
import background from "~/public/static/img/custom_images/home_page.jpg";
import Slider from "react-slick";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";
import Link from "next/link";
import MediaRepository from "~/repositories/MediaRepository";
import { baseUrl } from "~/repositories/Repository";
import { getItemBySlug } from "~/utilities/product-helper";
import Promotion from "~/components/elements/media/Promotion";
// import YouTube from "react-youtube";

const HomeDefaultBanner = ({ homeitems, loading }) => {
  const [promotion1, setPromotion1] = useState(null);
  const [promotion2, setPromotion2] = useState(null);

  async function getPromotions() {
    const responseData = await MediaRepository.getPromotionsBySlug(
      "home_fullwidth_promotions"
    );
    if (responseData) {
      setPromotion1(getItemBySlug(responseData, "main_1"));
      setPromotion2(getItemBySlug(responseData, "main_2"));
    }
  }

  useEffect(() => {
    // getBannerItems();
    getPromotions();
  }, []);

  function mainBannerMedia(item) {
    switch (item.media_type) {
      case "video":
        return (
          // <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />

          <iframe
            src={`${item.media}?autoplay=1&mute=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
          />
          // <YouTube videoId={"w3Wluvzoggg"} />
        );

      case "image":
        return (
          <a
            href={item.button_link}
            className="ps-banner-item--default bg--cover"
            style={{
              backgroundImage: `url(${item.media})`,
            }}
          />
        );

      default:
        break;
    }
  }

  const carouselSetting = {
    dots: false,
    infinite: true,
    speed: 750,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const carouselStandard = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 750,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
  // Views
  let mainCarouselView;
  if (!loading && homeitems?.main_banner?.length > 0) {
    const carouseItems = homeitems.main_banner.map((item, index) => (
      <div key={index}>{mainBannerMedia(item)}</div>
    ));
    mainCarouselView = (
      <Slider {...carouselStandard} className="ps-carousel">
        {carouseItems}
      </Slider>
    );
  }
  return (

    <div
      className="ps-home-banner ps-home-banner--1">
   
      <div className="ps-container">
        <div className="ps-section__left">{mainCarouselView}</div>
        {/* <div className="ps-section__right">
          <Promotion
            link="/shop"
            image={promotion1 ? promotion1.image : null}
          />
          <Promotion
            link="/shop"
            image={promotion2 ? promotion2.image : null}
          />
        </div> */}
      </div>
    </div>
  );
};

export default HomeDefaultBanner;
/*connect(state => state.media)();*/
