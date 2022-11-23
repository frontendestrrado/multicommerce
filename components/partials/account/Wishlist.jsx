import React, { Component } from "react";
import { Icon } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { connect, useDispatch } from "react-redux";
import { addItem } from "../../../store/cart/action";
import { removeWishlistItem } from "../../../store/wishlist/action";
import Link from "next/link";
import { Rate, Empty } from "antd";
import ProductCart from "../../elements/products/ProductCart";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import Rating from "~/components/elements/Rating";
import ThumbnailHelper from "~/components/elements/detail/thumbnail/ThumbnailHelper";
import ProductThumbnail from "~/components/elements/common/ProductThumbnail";

const Wishlist = ({ wishlist, auth }) => {
  console.log("...!!!!!!!!!!!!!!!!!!!!....",wishlist)
  const { wishlistItems } = wishlist;
  const dispatch = useDispatch();

  const handleAddItemToCart = (e, product) => {
    e.preventDefault();
    let payload = {
      product,
      cart_type: "web",
      quantity: 1,
      access_token: auth.access_token,
    };
    dispatch(addItem(payload));
  };

  const handleRemoveWishListItem = (e, product) => {
    e.preventDefault();
    dispatch(removeWishlistItem(product.product_id));
  };

  const wishListItemsRender = wishlistItems.map((wishList) => wishList)
    .map((product, index) => {
      return (
        <div
          className="style-wishlist ps-product ps-product--simple col-xl-3 col-lg-3 col-md-3 col-sm-6 text-truncate"
          key={index}
        >
          <a>
            <Favorite
              color={"secondary"}
              fontSize="large"
              onClick={(e) => handleRemoveWishListItem(e, product)}
              style={{ cursor: "pointer" }}
            />
          </a>

          <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
            <a>
              <ProductThumbnail
                imageLink={product?.image[0]?.thumbnail}
              />
            </a>
          </Link>
          <div className="ps-product__container">
            <Link href={`/seller/${product.seller_id}`}>
              <a className="ps-product__vendor">{product.shop_name}</a>
            </Link>
            <div className="ps-product__content">
              <Link href="/product/[pid]" as={`/product/${product.id}`}>
                <a className="ps-product__title">{product.product_name}</a>
              </Link>
              <div className="ps-product__rating mt-4">
                <Rating rating={product.product_rating} />
                {/* <span>02</span> */}
              </div>
              {/* {featureproductprice(product)} */}
              {product.sale_price !== false ? (
                <p className="ps-product__price">
                  SAR {product.sale_price}{" "}
                  <span className="lin-prdt">
                  SAR {product.price || product.actual_price}
                  </span>
                </p>
              ) : (
                <p className="ps-product__price">
                  SAR {product.price || product.actual_price}
                </p>
              )}

              <div className="add_to_cart">
                <a
                  className="ps-btn"
                  href=""
                  onClick={(e) => handleAddItemToCart(e, product)}
                >
                  Add to cart
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });

  return (
    <div className="ps-section--shopping ps-whishlist text-capitalize">
      <div className="container">
        <div className="ps-section__content pt-2 mt-5">
          {wishlistItems && wishlistItems?.length == 0 ? (
            <div className="home-wishlist p-5 mt-5 mb-5">
              <Empty description={<span>Wishlist is empty!</span>} />
            </div>
          ) : (
            <div className="table-responsive1 row home-wishlist">
              {wishListItemsRender}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(Wishlist);
