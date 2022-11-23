import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { notification } from "antd";
import Menu from "../../elements/menu/Menu";

import menuData from "../../../public/static/data/menu";
import CurrencyDropdown from "../headers/modules/CurrencyDropdown";
import LanguageSwicher from "../headers/modules/LanguageSwicher";
import MenuCategoriesDropdown from "~/components/shared/menus/MenuCategoriesDropdown";

class NavigationDefault extends Component {
  constructor(props) {
    super(props);
  }

  handleFeatureWillUpdate(e) {
    e.preventDefault();
    notification.open({
      message: "Opp! Something went wrong.",
      description: "This feature has been updated later!",
      duration: 500,
    });
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <nav className="navigation">
        <div className="ps-container">
          <div className="navigation__left">
            <MenuCategoriesDropdown />
          </div>
          <div className="navigation__right">
            <Menu source="" className="menu" />
            <ul className="navigation__extra">
              <li>
                <Link href="/vendor/become-a-vendor">
                  <a></a>
                </Link>
              </li>
              {isLoggedIn == true ? (
                <li>
                  <Link href="/account/my-orders">
                    <a>Track your order</a>
                  </Link>
                </li>
              ) : null}
              {/* <li>
                <CurrencyDropdown />
              </li>
              <li>
                <LanguageSwicher />
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return state.auth;
};

export default connect(mapStateToProps)(NavigationDefault);
