import React, { useEffect } from "react";
import Link from "next/link";
import { useLocation } from "react-router-dom";
import Logo from "~/components/elements/common/Logo";
import SearchHeader from "~/components/shared/headers/modules/SearchHeader";
import NavigationDefault from "~/components/shared/navigation/NavigationDefault";
import HeaderActions from "~/components/shared/headers/modules/HeaderActions";
import { stickyHeader } from "~/utilities/common-helpers";
import MenuCategoriesDropdown from "~/components/shared/menus/MenuCategoriesDropdown";
import Dropdown from 'react-bootstrap/Dropdown';

const HeaderDefault = () => {
  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", stickyHeader);
    }
  }, []);
  const aaa = (e) => {

 // alert("d")
console.log("ghfhfh",e.target.value)
localStorage.setItem("langId",e.target.value);
window.location.reload();
};
  return (
    <header className="header header--1" data-sticky="true" id="headerSticky">
      <div className="head-top">
        <div class="ps-container">
          <div class="d-flex justify-content-end">
            <div className="top-content">
              <ul className="top-url">
              <div>
                  <select onChange={(e) => aaa(e)} nme="cars" id="cars" >
                  <option   value="1" >Lang</option>
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
