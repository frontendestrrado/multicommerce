// import React, { useEffect } from "react";
import React, { useEffect, useState } from "react";
import MenuCategories from "~/components/shared/headers/modules/MenuCategories";
import SearchHeader from "~/components/shared/headers/modules/SearchHeader";
import HeaderActions from "~/components/shared/headers/modules/HeaderActions";
import NavigationDefault from "~/components/shared/navigation/NavigationDefault";
import ProductOnHeader from "~/components/elements/products/ProductOnHeader";
import { stickyHeader } from "~/utilities/common-helpers";
import Link from "next/link";
import Logo from "~/components/elements/common/Logo";

const HeaderProduct = ({ product }) => {
  const [getLanguage, setLanguage] = useState('');
  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", stickyHeader);
    }
  }, []);
  const aaa = (e) => {
    localStorage.setItem("langId",e.target.value);
    setLanguage(e.target.value)
    window.location.reload();
    };
  return (
    <header className="header header--1 header--product" data-sticky="true" id="headerSticky">

      <div className="head-top">
        <div class="ps-container">
          <div class="d-flex justify-content-end">
            <div className="top-content">
              <ul className="top-url d-flex align-items-center">
                <div className="langu">
                    <select onChange={(e) => aaa(e)} nme="cars" id="cars" value={getLanguage}>
                      {/* <option   value="1" >Lang</option> */}
                      <option   value="1" >English</option>
                      <option value="2" >العربية</option>
                    </select>
                </div>
                <li className="top-li">
                    {/* <a> Eng </a> */}
                  {/* <span onClick={(e) => aaa(e)}>ffffff</span> */}
                    {/* <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" >
                        Select Language
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item eventKey="1" onSelect={aaa}>English</Dropdown.Item>
                          <Dropdown.Item eventKey="2" onSelect={aaa}>العربية</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown> */}
                  <Link href="/account/login">
                    <a> Sign In</a>
                  </Link>
                        {/* <Link href="/account/login">
                          <a>Register</a>
                        </Link> */}
                        {/* <a href=""> Sign In </a>
                        <a href=""> Register </a> */}
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
            {/* <div className="menu--product-categories">
              <div className="menu__toggle">
                <i className="icon-menu"></i>
                <span> Shop by Department</span>
              </div>
              <div className="menu__content">
                <MenuCategories />
              </div>
            </div> */}
          </div>
          <div className="header__categ">
            
          </div>
          <div className="d-flex justify-content-center align-items-center ofr">
            <a href="">Offer Zone</a>
          </div>
          <div className="header__center d-flex align-items-center">
            <SearchHeader />
          </div>
          <div className="header__right d-flex align-items-center justify-content-end">
            <HeaderActions />
          </div>
        </div>
      </div>
      {/* <NavigationDefault /> */}
      {/* <nav className="navigation navigation--product">
        <div className="container">
          <ProductOnHeader product={product} />
        </div>
      </nav> */}
    </header>
  );
};
export default HeaderProduct;
