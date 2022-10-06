import React from "react";
import { StrapiProductPrice_New } from "~/utilities/product-helper";
import { useDispatch } from "react-redux";
import { addItemToCompare } from "~/store/compare/action";
import { addItemToWishlist } from "~/store/wishlist/action";
import { addItem } from "~/store/cart/action";

const ModuleProductShopWideActions = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddItemToCompare = (e) => {
    e.preventDefault();
    dispatch(addItemToCompare(product));
  };

  const handleAddItemToWishlist = (e) => {
    e.preventDefault();
    dispatch(addItemToWishlist(product));
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    dispatch(addItem(product));
  };

  return (
    <div className="ps-product__shopping">
      {StrapiProductPrice_New(product)}
      {/* <a className="ps-btn" href="#" onClick={(e) => handleAddItemToCart(e)}>
        Add to cart
      </a>
      <ul className="ps-product__actions">
        <li>
          <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
            <i className="icon-heart"></i> Wishlist
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
            <i className="icon-chart-bars"></i> Compare
          </a>
        </li>
      </ul> */}
    </div>
  );
};

export default ModuleProductShopWideActions;
