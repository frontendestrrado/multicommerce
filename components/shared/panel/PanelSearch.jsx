import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Router from "next/router";
import { Spin } from "antd";
import ProductRepository from "~/repositories/ProductRepository";
import ProductSearchResult from "~/components/elements/products/ProductSearchResult";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // Update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const PanelSearch = (props) => {
  const inputEl = useRef(null);
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [resultItems, setResultItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(keyword, 3000);

  function handleClearKeyword() {
    setKeyword("");
    setIsSearch(false);
    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    Router.push(`/search?keyword=${keyword}`);
  }
  const [menuDataFromServer, setMenuDataFromServer] = useState([
    {
      category_id: "",
      category_name: "All",
    },
  ]);

  useEffect(() => {
    const fetchMenuDataFromServer = async () => {
      try {
        const response = await ProductRepository.getProductCategories();
        setMenuDataFromServer([
          {
            category_id: "",
            category_name: "All",
          },
          ...response.data.cat_subcat,
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenuDataFromServer();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      if (keyword) {
        const queries = {
          _limit: 5,
          title_contains: keyword,
          category_id: category,
        };
        // const products = ProductRepository.getRecords(queries);
        const products = ProductRepository.getSearchedProducts(queries);

        products.then((result) => {
          setLoading(false);
          setResultItems(result.items);
          setIsSearch(true);
        });
      } else {
        setIsSearch(false);
        setKeyword("");
      }
      if (loading) {
        setIsSearch(false);
      }
    } else {
      setLoading(false);
      setIsSearch(false);
    }
  }, [debouncedSearchTerm]);

  // Views
  let productItemsView,
    clearTextView,
    selectOptionView,
    loadingView,
    loadMoreView;
  if (!loading) {
    if (resultItems && resultItems.length > 0) {
      if (resultItems.length > 5) {
        loadMoreView = (
          <div className="ps-panel__footer text-center">
            <Link href="/search">
              <a>See all results</a>
            </Link>
          </div>
        );
      }
      productItemsView = resultItems.map((product) => (
        <ProductSearchResult product={product} key={product.id} />
      ));
    } else {
      productItemsView = <p>No product found.</p>;
    }
    if (keyword !== "") {
      clearTextView = (
        <span className="ps-form__action" onClick={handleClearKeyword}>
          <i className="icon icon-cross2"></i>
        </span>
      );
    }
  } else {
    loadingView = (
      <span className="ps-form__action">
        <Spin size="small" />
      </span>
    );
  }

  if (menuDataFromServer?.length > 0) {
    selectOptionView = menuDataFromServer?.map((option, index) => {
      return (
        <option value={option.category_id} key={index}>
          {option.category_name}
        </option>
      );
    });
  }
  return (
    <form
      className="ps-form--quick-search"
      method="get"
      action="/"
      onSubmit={handleSubmit}
    >
      <div className="ps-form__categories">
        <select
          className="form-control"
          onChange={(e) => setCategory(e.target.value)}
        >
          {selectOptionView}
        </select>
      </div>
      <div className="ps-form__input">
        <input
          ref={inputEl}
          className="form-control"
          type="text"
          value={keyword}
          placeholder="I'm shopping for..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        {clearTextView}
        {loadingView}
      </div>
      <button onClick={handleSubmit}>Search</button>
      <div className={`ps-panel--search-result${isSearch ? " active " : ""}`}>
        <div className="ps-panel__content">{productItemsView}</div>
        {loadMoreView}
      </div>
    </form>
  );
};

export default connect((state) => state.product)(PanelSearch);
