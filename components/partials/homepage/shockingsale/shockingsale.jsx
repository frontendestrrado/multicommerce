import React from "react";
import background from "~/public/static/img/custom_images/shocking_sale.jpg";
import Link from "next/link";
import Slider from "react-slick";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import ProductShockingSale from "~/components/elements/products/ProductShockingSale";
import { generateTempArray } from "~/utilities/common-helpers";
import NextArrow from "~/components/elements/carousel/NextArrow";
import PrevArrow from "~/components/elements/carousel/PrevArrow";
import ProductShockingSaleSlide from "~/components/elements/products/ProductShockingSaleSlide";

const Shockingsale = ({ collectionSlug, homeitems, loading }) => {
  // const [productItems, setProductItems] = useState(null);
  // const [loading, setLoading] = useState(true);

  // async function getProducts() {
  //   setLoading(true);
  //   const responseData = await getProductsByCollectionHelper(collectionSlug);
  //   if (responseData) {
  //     setProductItems(responseData.items);
  //     setTimeout(
  //       function () {
  //         setLoading(false);
  //       }.bind(this),
  //       250
  //     );
  //   }
  // }

  // useEffect(() => {
  //   getProducts();
  // }, []);
  const checkSalesobject = (homeitems) => {
    if ("shocking_sale" in homeitems) {
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

  // Views
  let productItemsView;

  if (!loading) {
    if (
      checkSalesobject(homeitems) &&
      homeitems &&
      homeitems.shocking_sale.length > 0
    ) {
      const shockingsale_products = homeitems.shocking_sale;

      // const slideItems = shockingsale_products.map((item, index) => {
      //   return <ProductShockingSale product={item} key={index} />;
      // });
      const slideItems =
        shockingsale_products.length > 4
          ? shockingsale_products.map((item, index) => {
              return <ProductShockingSaleSlide product={item} key={index} />;
            })
          : shockingsale_products.map((item, index) => {
              return <ProductShockingSale product={item} key={index} />;
            });
      productItemsView = (
        <>
          {shockingsale_products.length > 4 ? (
            <Slider {...carouselStandard} className="ps-carousel outside">
              {slideItems}
            </Slider>
          ) : (
            <div className="align-content-lg-stretch row">{slideItems}</div>
          )}
        </>
      );
    } else {
      productItemsView = <p>No product(s) found.</p>;
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
      className="ps-deal-of-day shockingsale"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "bottom",
      }}
    >
      <div className="ps-container">
        <div className="ps-section__header">
          <div className="ps-block--countdown-deal">
            <div className="ps-block__left">
              <h3
                style={{
                  fontWeight: "600",
                  fontStyle: "italic",
                  paddingLeft: "13px",
                }}
              >
                Shocking Sale
              </h3>
            </div>
            {/* <div className="ps-block__right">
              {shocking_endtime !== "" && (
                <figure>
                  <figcaption>End in:</figcaption>

                  <CountDownSimple
                    timeTillDate={shocking_endtime}
                    timeFormat="YYYY-MM-DD, HH:mm:ss"
                  />
                </figure>
              )}
            </div> */}
          </div>
          <Link href="/shockingsale">
            <a>View All</a>
          </Link>
        </div>
        <div
          className={
            homeitems.shocking_sale.length > 4
              ? ""
              : `row align-content-lg-stretch`
          }
          style={{
            marginLeft: homeitems.shocking_sale.length > 4 ? "" : "2rem",
          }}
        >
          {productItemsView}
        </div>
      </div>
    </div>
  );
};

export default Shockingsale;
