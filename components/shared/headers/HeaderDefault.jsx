import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Logo from "~/components/elements/common/Logo";
import SearchHeader from "~/components/shared/headers/modules/SearchHeader";
import NavigationDefault from "~/components/shared/navigation/NavigationDefault";
import HeaderActions from "~/components/shared/headers/modules/HeaderActions";
import { stickyHeader } from "~/utilities/common-helpers";
import MenuCategoriesDropdown from "~/components/shared/menus/MenuCategoriesDropdown";

const HeaderDefault = () => {
  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", stickyHeader);
    }
  }, []);

  return (
    <header className="header header--1" data-sticky="true" id="headerSticky">
      <div className="head-top">
        <div class="ps-container">
          <div class="d-flex justify-content-end">
            <div className="top-content">
              <ul className="top-url">
                <li className="top-li">
                  <a href=""> Eng </a>
                  <a href=""> Sign In </a>
                  <a href=""> Register </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header__top">
        <div className="ps-container">
          <div className="header__left">
            <Logo />
            {/* <MenuCategoriesDropdown /> */}
          </div>
          <div className="header__categ">
            <MenuCategoriesDropdown />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <a href="">Offer Zone</a>
          </div>
          <div className="header__center">
            <SearchHeader />
          </div>
          <div className="header__right">
            <HeaderActions />
          </div>
        </div>
      </div>
      {/* <NavigationDefault /> */}
    </header>
  );
};

export default HeaderDefault;
