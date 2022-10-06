import React from "react";
import Link from "next/link";
import { Avatar, Image } from "antd";

const MegaMenuShopBy = ({ source }) => {
  let megaContentView;

  if (source) {
    megaContentView = source.subcategory.map((item) => (
      <ul className="mega-menu__list" key={item.id}>
        <li key={item.subcategory_name}>
          <Link
            href={`/shop?subcategory_id=${item.id}`}
            as={`/shop?subcategory_id=${item.id}`}
          >
            <a className="text-capitalize">{item.subcategory_name}</a>
          </Link>
        </li>
      </ul>
    ));
  }
  return (
    <li className="menu-item-has-children has-mega-menu">
      <Link href={`/shop?category=${source.category_id}`}>
        <a className="text-capitalize">
          {/* {source.icon && <i className={source.icon}></i>} */}
          <Avatar
            src={<Image src={source.category_image} preview={false} />}
            style={{ marginRight: "10px" }}
          />
          {source.category_name}
        </a>
      </Link>
      <div className="mega-menu">
        <div className="mega-menu__column">
          <h4 className="text-capitalize">{source.category_name}</h4>
          {megaContentView}
        </div>
      </div>
    </li>
  );
};

export default MegaMenuShopBy;
