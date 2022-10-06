import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Pagination } from "antd";
import ShopProduct from "~/components/elements/products/ShopProduct";
import ShopProductWide from "~/components/elements/products/ShopProductWide";
import ProductRepository from "~/repositories/ProductRepository";
import ModuleShopSortBy from "~/components/partials/shop/modules/ModuleShopSortBy";
import { useRouter } from "next/router";
import { generateTempArray } from "~/utilities/common-helpers";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";

const ShopItems = ({ columns = 4, pageSize = 12 }) => {
  const Router = useRouter();
  const pathDetail = Router.pathname;

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
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState(
    "col-xxl-4 col-xl-4 col-lg-4 col-md-3 col-sm-6 col-6"
  );

  function handleChangeViewMode(e) {
    e.preventDefault();
    setListView(!listView);
  }

  async function getProducts(params) {
    setLoading(true);
    let payload = {
      page: page === undefined ? 1 : page,
    };

    const responseData = await ProductRepository.getProducts(payload);

    if (responseData) {
      setProductItems(responseData.items);
      setTotal(responseData.totalItems);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  async function getProductsbyfilters() {
    setLoading(true);
    let payload = {
      page: page === undefined ? 1 : page,
      lang_id: 1,
      category_id: category ? category : "",
      subcategory_id: subcategory_id ? subcategory_id : "",
      brand_id: brand ? brand : "",
      max_price: price_lt ? price_lt : "",
      min_price: price_gt ? price_gt : "",
      low_to_high: low_to_high ? low_to_high : "",
      high_to_low: high_to_low ? high_to_low : "",
      latest: latest ? latest : "",
    };
    const responseData = await ProductRepository.getProductsbyFilter(payload);
    if (responseData) {
      setProductItems(responseData.items);
      setTotal(responseData.totalItems);
      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  function handlePagination(page, pageSize) {
    let filterpart = window.location.search;
    if (
      category !== undefined ||
      subcategory_id !== undefined ||
      brand !== undefined ||
      price_gt !== undefined ||
      price_lt !== undefined ||
      low_to_high !== undefined ||
      high_to_low !== undefined ||
      latest !== undefined
    ) {
      let newdd = filterpart.replace(/\&page.*/, "");
      Router.push("/shop" + newdd + "&page=" + page);
    } else {
      Router.push(`/shop?page=${page}`);
    }
  }

  async function getTotalRecords(params) {
    const responseData = await ProductRepository.getTotalRecords();
    if (responseData) {
      // setTotal(responseData);
    }
  }

  function handleSetColumns() {
    switch (columns) {
      case 2:
        setClasses("col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6");
        return 3;
        break;
      case 4:
        setClasses("col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6");
        return 4;
        break;
      // case 6:
      //   setClasses("col-xxl-2 col-xl-2 col-lg-4 col-md-6 col-sm-6 col-6");
      //   return 6;
      //   break;

      default:
        setClasses("col-xl-3 col-lg-3 col-md-3 ");
    }
  }

  useEffect(() => {
    let params;
    if (query) {
      if (query.page) {
        params = {
          _start: page * pageSize,
          _limit: pageSize,
        };
      } else {
        params = query;
        params._limit = pageSize;
      }
    } else {
      params = {
        _limit: pageSize,
      };
    }
    getTotalRecords();

    if (
      category !== undefined ||
      subcategory_id !== undefined ||
      brand !== undefined ||
      price_gt !== undefined ||
      price_lt !== undefined ||
      low_to_high !== undefined ||
      high_to_low !== undefined ||
      latest !== undefined
    ) {
      getProductsbyfilters();
    } else {
      getProducts(params);
    }
    handleSetColumns();
  }, [query]);

  // Views
  let productItemsView;
  if (!loading) {
    if (productItems && productItems.length > 0) {
      if (listView) {
        const items = productItems.slice(0, 8).map((item, index) => (
          <div className={classes} key={index}>
            <ShopProduct product={item} />
          </div>
        ));
        productItemsView = (
          <div className="ps-shop-items">
            <div className="row">{items}</div>
          </div>
        );
      } else {
        productItemsView = productItems.map((item, index) => (
          <ShopProductWide product={item} key={index} />
        ));
      }
    } else {
      productItemsView = <p>No product found.</p>;
    }
  } else {
    const skeletonItems = generateTempArray(12).map((item, index) => (
      <div className={classes} key={index}>
        <SkeletonProduct />
      </div>
    ));
    productItemsView = <div className="row">{skeletonItems}</div>;
  }

  return (
    <div className="ps-shopping">
      <div className="ps-container">
      <div class="ps-section__header justify-content-center d-flex">
        <div class="ps-block--countdown-deal">
          <div class="ps-block__left">
            <h3 className="text-center">Trending Now</h3>
            <p className="text-center p-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-end vual">
          <Link href="/newdeals">
            <a>View All</a>
          </Link>
      </div>
      {/* <div className="ps-shopping__header"> */}
        {/* <p>
          <strong className="mr-2">{total}</strong>
          Products found
        </p> */}
        <div className="ps-shopping__actions">
          {/* <ModuleShopSortBy /> */}
          <div className="ps-shopping__view">
            {/* <p>View</p> */}
            {/* <ul className="ps-tab-list">
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
            </ul> */}
          </div>
        </div>
      {/* </div> */}
      <div className="ps-shopping__content pt-5">{productItemsView}</div>
      <div className="ps-shopping__footer text-center">
        {/* <div className="ps-pagination">
          <Pagination
            total={total - 1}
            pageSize={pageSize}
            responsive={true}
            showSizeChanger={false}
            current={page !== undefined ? parseInt(page) : 1}
            onChange={(e) => handlePagination(e)}
          />
        </div> */}
      </div>
      </div>
    </div>
  );
};

export default ShopItems;
