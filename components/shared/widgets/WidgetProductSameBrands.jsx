import React, { useEffect, useState } from "react";
import { getProductsByCollectionHelper } from "~/utilities/strapi-fetch-data-helpers";
import ProductWidget from "~/components/elements/products/ProductWidget";
import { generateTempArray } from "~/utilities/common-helpers";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import { carouselSingle } from "~/utilities/carousel-helpers";
import Slider from "react-slick";

const WidgetProductSameBrands = ({ collectionSlug, product }) => {
  const [productItems, setProductItems] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    setLoading(true);
    const responseData = await getProductsByCollectionHelper(collectionSlug);
    if (responseData) {
      setProductItems(responseData.items);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  useEffect(() => {
    // getProducts();
    const intervalLoading = setTimeout(
      function () {
        setLoading(false);
      }.bind(this),
      2000
    );
    return () => {
      clearTimeout(intervalLoading);
    };
  }, []);

  // Views
  let productItemsView;
  if (!loading) {
    // const samebrand =
    //   product !== null && product.brand_products.length > 3
    //     ? product.brand_products.slice(0, 3)
    //     : product.brand_products;
    console.log("..ffff...brand..",product)
    if (product && product?.brand_products?.length > 0) {
      productItemsView = (
        <Slider {...carouselSingle} className="ps-carousel outside">
          {product.brand_products.map((item, index) => (
            <ProductWidget product={item} key={index} />
          ))}
        </Slider>
      );
    } else {
      productItemsView = <p>No product found.</p>;
    }
  } else {
    productItemsView = generateTempArray(3).map((item, index) => (
      <SkeletonProduct key={index} />
    ));
  }

  return (
    <aside className="widget widget_same-brand">
      <h3>Same Brand</h3>
      <div className="widget__content">{productItemsView}</div>
    </aside>
  );
};

export default WidgetProductSameBrands;
