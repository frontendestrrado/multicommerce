import React, { useEffect, useState } from "react";
import ShopProductWide from "~/components/elements/products/ShopProductWide";
import { useRouter } from "next/router";
import { generateTempArray } from "~/utilities/common-helpers";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import { getHomedata } from "~/utilities/home-helper";
import BestSellersHome from "~/components/elements/products/BestSellersHome";
import { useSelector } from "react-redux";
import SellerStoreDetails from "./SellerStoreDetails";

const SellerDetails = ({ columns = 4, pageSize = 12 }) => {
  const Router = useRouter();
  const {
    page,
    category,
    subcategory_id,
    brand,
    price_gt,
    price_lt,
    low_to_high,
    high_to_low,
    latest,
  } = Router.query;

  const { query } = Router;
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState(
    "col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
  );

  const [stores, setStores] = useState(null);

  async function loadHomedata() {
    setLoading(true);
    let responseData = await getHomedata(Router.pathName);
    if (responseData) {
      setStores(responseData.data.sellers);
      setTotal(responseData.data.sellers.length);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }
  const { homedata } = useSelector((state) => state.home);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && homedata == null) {
      loadHomedata();
    } else {
      if (isMounted) {
        setStores(homedata.sellers);
        setTotal(homedata.sellers.length);
        setTimeout(
          function () {
            setLoading(false);
          }.bind(this),
          250
        );
      }
    }
    return () => {
      isMounted = false;
    };
  }, [homedata]);

  // Views
  let storesItemsView;
  if (!loading) {
    if (stores) {
      const items = stores
        .sort((a, b) => a.rating > b.rating)
        .map((item) => (
          <div className={classes} key={item.store_id}>
            <SellerStoreDetails source={item} />
          </div>
        ));
      storesItemsView = <div className="ps-shop-items row">{items}</div>;
    } else {
      storesItemsView = <p>No store found.</p>;
    }
  } else {
    const skeletonItems = generateTempArray(12).map((item) => (
      <div className={classes} key={item}>
        <SkeletonProduct />
      </div>
    ));
    storesItemsView = <div className="row">{skeletonItems}</div>;
  }

  return (
    <div className="ps-shopping">
      <div className="ps-shopping__header">
        <p>
          <strong className="mr-2">{total}</strong>
          Seller found
        </p>
      </div>
      <div>{storesItemsView}</div>
    </div>
  );
};

export default SellerDetails;
