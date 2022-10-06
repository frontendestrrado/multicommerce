import React, { useEffect, useState } from "react";
import menuData from "~/public/static/data/menu.json";
import MenuShopBy from "~/components/elements/menu/MenuShopBy";
import Axios from "axios";
import { apibaseurl } from "../../../repositories/Repository";
import { useSelector } from "react-redux";

const MenuCategoriesDropdown = () => {
  const [menuDataFromServer, setMenuDataFromServer] = useState([]);

  const fetchMenuDataFromServer = async () => {
    try {
      const response = await Axios.post(
        `${apibaseurl}/api/customer/cat-subcat`
      );
      setMenuDataFromServer(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const { homedata } = useSelector((state) => state.home);

  useEffect(() => {
    let handler;
    handler = setTimeout(async () => {
      await fetchMenuDataFromServer();
    }, 100);
    return () => {
      clearTimeout(handler);
    };
  }, [homedata]);

  return (
    <div className="menu--product-categories">
      <div className="menu__toggle">
        <i className="icon-menu"></i>
        <span>Shop by Category</span>
      </div>
      <div className="menu__content">
        <MenuShopBy
          source={menuDataFromServer?.data?.cat_subcat}
          className="menu--dropdown"
        />
      </div>
    </div>
  );
};

export default MenuCategoriesDropdown;
