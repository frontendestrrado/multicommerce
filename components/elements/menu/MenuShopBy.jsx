import React from "react";
import Link from "next/link";
import MenuDropdown from "~/components/elements/menu/MenuDropdown";
import MegaMenuShopBy from "~/components/elements/menu/MegaMenuShopBy";
import { Avatar, Image } from "antd";

const MenuShopBy = ({ source, className }) => {
  // Views
  let menuView;
  if (source) {
    menuView = source.map((item) => {
      if (item.subcategory?.length > 0) {
        return <MegaMenuShopBy source={item} key={item.category_id} />;
      }
      return (
        <li key={item.category_id}>
          <Link href={`/shop?category=${item.category_id}`}>
            <a className="text-capitalize">
              {/* {item.icon && <i className={item.icon}></i>} */}
              <Avatar
                src={<Image src={item.category_image} preview={false} />}
                style={{ marginRight: "10px" }}
              />
              {item.category_name}
            </a>
          </Link>
        </li>
      );
    });
  } else {
    menuView = (
      <li>
        <a href="#" onClick={(e) => e.preventDefault()}></a>
      </li>
    );
  }
  return <ul className={className}>{menuView}</ul>;
};

export default MenuShopBy;
