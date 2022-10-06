import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Drawer } from "antd";
import PanelMenu from "../panel/PanelMenu";
import PanelCartMobile from "../panel/PanelCartMobile";
import PanelSearch from "../panel/PanelSearch";
import PanelCategories from "../panel/PanelCategories";

import { getHomedata } from "~/utilities/home-helper";
import { getHomeSuccess } from "~/store/home/action";

const NavigationList = () => {
  const dispatch = useDispatch();

  async function loadHomedata() {
    let responseData = await getHomedata();
    if (responseData) {
      dispatch(getHomeSuccess(responseData.data));
    }
  }
  const { homedata } = useSelector((state) => state.home);

  useEffect(() => {
    let isMounted = true;
    if (homedata == null) {
      isMounted && loadHomedata();
    }
    return () => (isMounted = false);
  }, [homedata]);

  const [drawerState, setDrawerState] = useState({
    menuDrawer: false,
    cartDrawer: false,
    searchDrawer: false,
    categoriesDrawer: false,
  });

  const handleDrawerClose = () => {
    setDrawerState({
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
    });
  };

  const handleShowMenuDrawer = () => {
    setDrawerState({
      menuDrawer: !drawerState.menuDrawer,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: false,
    });
  };

  const handleShowCartDrawer = () => {
    setDrawerState({
      menuDrawer: false,
      cartDrawer: !drawerState.cartDrawer,
      searchDrawer: false,
      categoriesDrawer: false,
    });
  };
  const handleShowSearchDrawer = () => {
    setDrawerState({
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: !drawerState.searchDrawer,
      categoriesDrawer: false,
    });
  };
  const handleShowCategoriesDrawer = () => {
    setDrawerState({
      menuDrawer: false,
      cartDrawer: false,
      searchDrawer: false,
      categoriesDrawer: !drawerState.categoriesDrawer,
    });
  };

  const { menuDrawer, searchDrawer, cartDrawer, categoriesDrawer } =
    drawerState;

  return (
    <div className="navigation--list">
      <Drawer
        className="ps-panel--mobile"
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        visible={drawerState.menuDrawer}
      >
        <div className="ps-panel--wrapper">
          <div className="ps-panel__header">
            <h3>Menu</h3>
            <span className="ps-panel__close" onClick={handleDrawerClose}>
              <i className="icon-cross"></i>
            </span>
          </div>
          <div className="ps-panel__content">
            <PanelMenu />
          </div>
        </div>
      </Drawer>
      <Drawer
        className="ps-panel--mobile"
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        visible={drawerState.cartDrawer}
      >
        <div className="ps-panel--wrapper">
          <div className="ps-panel__header">
            <h3>Shopping Cart</h3>
            <span className="ps-panel__close" onClick={handleDrawerClose}>
              <i className="icon-cross"></i>
            </span>
          </div>
          <div className="ps-panel__content">
            <PanelCartMobile />
          </div>
        </div>
      </Drawer>
      <Drawer
        className="ps-panel--mobile"
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        visible={drawerState.searchDrawer}
      >
        <div className="ps-panel--wrapper">
          <div className="ps-panel__header">
            <h3>Search</h3>
            <span className="ps-panel__close" onClick={handleDrawerClose}>
              <i className="icon-cross"></i>
            </span>
          </div>
          <div className="ps-panel__content">
            <PanelSearch />
          </div>
        </div>
      </Drawer>
      <Drawer
        className="ps-panel--mobile"
        placement="right"
        closable={false}
        onClose={handleDrawerClose}
        visible={drawerState.categoriesDrawer}
      >
        <div className="ps-panel--wrapper">
          <div className="ps-panel__header">
            <h3>Categories</h3>
            <span className="ps-panel__close" onClick={handleDrawerClose}>
              <i className="icon-cross"></i>
            </span>
          </div>
          <div className="ps-panel__content">
            <PanelCategories />
          </div>
        </div>
      </Drawer>
      <div className="navigation__content">
        <a
          className={`navigation__item ${menuDrawer === true ? "active" : ""}`}
          onClick={handleShowMenuDrawer}
        >
          <i className="icon-menu"></i>
          <span> Menu</span>
        </a>
        <a
          className={`navigation__item ${
            categoriesDrawer === true ? "active" : ""
          }`}
          onClick={handleShowCategoriesDrawer}
        >
          <i className="icon-list4"></i>
          <span> Categories</span>
        </a>
        <a
          className={`navigation__item ${
            searchDrawer === true ? "active" : ""
          }`}
          onClick={handleShowSearchDrawer}
        >
          <i className="icon-magnifier"></i>
          <span> Search</span>
        </a>
        <a
          className={`navigation__item ${cartDrawer === true ? "active" : ""}`}
          onClick={handleShowCartDrawer}
        >
          <i className="icon-bag2"></i>
          <span> Cart</span>
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.setting;
};
export default connect(mapStateToProps)(NavigationList);
