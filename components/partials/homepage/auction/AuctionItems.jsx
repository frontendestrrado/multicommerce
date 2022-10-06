import React, { useEffect, useState } from "react";
import ShopProductWide from "~/components/elements/products/ShopProductWide";
import { useRouter } from "next/router";
import { generateTempArray } from "~/utilities/common-helpers";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import { getHomedata } from "~/utilities/home-helper";
import ProductAuction from "~/components/elements/products/ProductAuction";
import { useSelector } from "react-redux";

const AuctionItems = ({ columns = 4, pageSize = 12 }) => {
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
  const [listView, setListView] = useState(true);
  const [productItems, setProductItems] = useState(null);
  const [autionItemsLoad, setAuctionItems] = useState(null);

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState("col-xl-3 col-lg-3 col-md-3 col-sm-6");

  async function loadHomedata() {
    setLoading(true);
    let responseData = await getHomedata(Router.pathName);
    if (responseData) {
      setProductItems(responseData.data.auction);
      setTotal(responseData.data.auction.length);
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
    if (homedata == null) {
      loadHomedata();
    } else {
      setProductItems(homedata.auction);
      setTotal(homedata.auction.length);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }, [homedata]);

  // Views
  let productItemsView;
  if (!loading) {
    if (productItems && productItems.length > 0) {
      if (listView) {
        const items = productItems.map((item, index) => (
          <div className={classes} key={index}>
            <ProductAuction
              product={item}
              widthGiven="250"
              //   marginGiven="10px"
              cdSimple={true}
              styleAdd={`shocking-sale--detail-page--counter`}
            />
          </div>
        ));
        productItemsView = (
          <div className="ps-shop-items">
            <div className="row">{items}</div>
          </div>
        );
      } else {
        productItemsView = productItems.map((item) => (
          <ShopProductWide product={item} />
        ));
      }
    } else {
      productItemsView = <p>No product found.</p>;
    }
  } else {
    const skeletonItems = generateTempArray(12).map((item) => (
      <div className={classes} key={item}>
        <SkeletonProduct />
      </div>
    ));
    productItemsView = <div className="row">{skeletonItems}</div>;
  }

  return (
    <div className="ps-shopping">
      <div className="ps-shopping__header">
        <p>
          <strong className="mr-2">{total}</strong>
          Products found
        </p>
        {/* <div className="ps-shopping__actions">
          <ModuleShopSortBy />
          <div className="ps-shopping__view">
            <p>View</p>
            <ul className="ps-tab-list">
              <li className={listView === true ? "active" : ""}>
                <a href="#" onClick={(e) => handleChangeViewMode(e)}>
                  <i className="icon-grid"></i>
                </a>
              </li>
              <li className={listView !== true ? "active" : ""}>
                <a href="#" onClick={(e) => handleChangeViewMode(e)}>
                  <i className="icon-list4"></i>
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
      <div>{productItemsView}</div>
      {/* <div className="ps-shopping__footer text-center">
        <div className="ps-pagination">
          <Pagination
            total={total - 1}
            pageSize={pageSize}
            responsive={true}
            showSizeChanger={false}
            current={page !== undefined ? parseInt(page) : 1}
            onChange={(e) => handlePagination(e)}
          />
        </div>
      </div> */}
    </div>
  );
};

export default AuctionItems;
