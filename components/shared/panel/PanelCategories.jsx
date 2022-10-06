import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";

const { SubMenu } = Menu;

const PanelCategories = () => {
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
  const [state, setState] = useState({ openKeys: ["sub1"] });
  const [categories, setCategories] = useState([]);

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

  const { cat_subcat } = useSelector((state) => state.home?.homedata);

  useEffect(() => {
    if (cat_subcat.length > 0) {
      setCategories([...cat_subcat]);
    }
  }, [cat_subcat]);

  return (
    <>
      {categories.length > 0 ? (
        <Menu
          mode="inline"
          // openKeys={state.openKeys}
          // onOpenChange={onOpenChange}
          className="menu--mobile-2"
        >
          {categories.map((category, index) => {
            if (category.subcategory.length > 0) {
              return (
                <SubMenu
                  key={category.category_id}
                  title={
                    <a
                      href={`/shop?category=${category.category_id}`}
                      className="text-capitalize"
                    >
                      {category.category_name}
                    </a>
                  }
                >
                  {category.subcategory.map((subItem, index) => (
                    <Menu.Item key={`sub-${subItem.id}`}>
                      <a
                        href={`/shop?subcategory_id=${subItem.id}`}
                        className="text-capitalize"
                        style={{ fontSize: "16px" }}
                      >
                        {subItem.subcategory_name}
                      </a>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            }
            return (
              <Menu.Item key={category.category_id}>
                <a
                  href={`/shop?category=${category.category_id}`}
                  style={{ fontSize: "16px" }}
                  className="text-capitalize"
                >
                  {category.category_name}
                </a>
              </Menu.Item>
            );
          })}
        </Menu>
      ) : null}
    </>
  );
};

export default PanelCategories;
