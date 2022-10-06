import React, { Component, useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { Menu } from "antd";
import { menuPrimary } from "../../../public/static/data/menu";
import Link from "next/link";

let menu_item = [
  {
    text: "Home",
    url: "/",
    extraClass: "menu-item-has-children",
    subClass: "sub-menu",
  },
  {
    text: "Sell on Kangtao",
    url: "/vendor/become-a-vendor",
    extraClass: "menu-item-has-children",
    subClass: "sub-menu",
  },
  {
    text: "Track your order",
    url: "/account/order-tracking",
    extraClass: "menu-item-has-children",
    subClass: "sub-menu",
  },
  {
    text: "Shop",
    url: "/shop",
    extraClass: "menu-item-has-children has-mega-menu",
    subClass: "sub-menu",
    subMenu: [
      {
        text: "New Deals",
        url: "/newdeals",
      },
      {
        text: "Shocking Sale",
        url: "/shockingsale",
      },
      {
        text: "Feature Products",
        url: "/featuredproducts",
      },
      {
        text: "Auction",
        url: "/auction",
      },
      {
        text: "Best Seller",
        url: "/seller",
      },
    ],
  },
  {
    text: "Account",
    url: "/account/user-information",
    extraClass: "menu-item-has-children has-mega-menu",
    subClass: "sub-menu",
    accountLinks: [
      {
        text: "Account Information",
        url: "/account/user-information",
        icon: "icon-user",
      },
      {
        text: "My Address",
        url: "/account/address",
        icon: "icon-map-marker",
      },
      {
        text: "My Orders",
        url: "/account/my-orders",
        icon: "icon-bag",
      },
      {
        text: "My Wishlist",
        url: "/account/user-wishlist",
        icon: "icon-heart",
      },
      {
        text: "Chats",
        url: "/account/my-chats",
        icon: "icon-bubble",
      },
      {
        text: "Support",
        url: "/account/support",
        icon: "icon-phone",
      },
      {
        text: "My Wallet",
        url: "/account/my-wallet",
        icon: "icon-database",
      },
      {
        text: "My Auction",
        url: "/account/my-auction",
        icon: "icon-bullhorn",
      },
      {
        text: "Invite & Earn",
        url: "#",
        icon: "icon-thumbs-up",
      },
      {
        text: "Notifications",
        url: "/account/notifications",
        icon: "icon-alarm-ringing",
      },
      // {
      //   text: "Invoices",
      //   url: "/account/invoices",
      //   icon: "icon-papers",
      //   active: activeModule === "Invoices",
      // },
      // {
      //   text: "Recent Viewed Product",
      //   url: "/account/recent-viewed-product",
      //   icon: "icon-store",
      //   active: activeModule === "RecentViewedProducts",
      // },
    ],
  },
];

const { SubMenu } = Menu;

const PanelMenu = () => {
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

  const [state, setState] = useState({ openKeys: [] });
  const [loginState, setLoginState] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    setLoginState(isLoggedIn);
  }, [isLoggedIn]);

  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(
      (key) => state.openKeys.indexOf(key) === -1
    );
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setState({ openKeys });
    } else {
      setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={state.openKeys}
      onOpenChange={onOpenChange}
      className="menu--mobile-2"
    >
      {menu_item.map((item) => {
        if (item.subMenu) {
          return (
            <SubMenu
              key={item.text}
              title={
                <Link href={item.url}>
                  <a className="text-capitalize">{item.text}</a>
                </Link>
              }
            >
              {item.subMenu.map((subItem) => (
                <Menu.Item key={subItem.text}>
                  <Link href={subItem.url}>
                    <a className="text-capitalize" style={{ fontSize: "16px" }}>
                      {subItem.text}
                    </a>
                  </Link>
                </Menu.Item>
              ))}
            </SubMenu>
          );
        } else if (item.accountLinks) {
          return (
            loginState && (
              <SubMenu
                key={item.text}
                title={
                  <Link href={item.url}>
                    <a className="text-capitalize">{item.text}</a>
                  </Link>
                }
              >
                {item.accountLinks.map((subItem) => (
                  <Menu.Item key={subItem.text}>
                    <Link href={subItem.url}>
                      <a style={{ fontSize: "16px" }}>
                        <i className={subItem.icon}></i>
                        <span className="m-4 text-capitalize">
                          {subItem.text}
                        </span>
                      </a>
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            )
          );
        } else {
          return (
            <Menu.Item key={item.text}>
              <Link href={item.url}>
                <a className="text-capitalize" style={{ fontSize: "16px" }}>
                  {item.text}
                </a>
              </Link>
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
};

const mapStateToProps = (state) => {
  return state.setting;
};

export default connect(mapStateToProps)(PanelMenu);
