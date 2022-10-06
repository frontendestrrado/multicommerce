import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getCart, removeItem } from "~/store/cart/action";
import ProductOnCart from "~/components/elements/products/ProductOnCart";
import ProductRepository from "~/repositories/ProductRepository";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";

const MiniCart = React.memo(({ cart }) => {
  let cartItemsView;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const productItemWithSeller = cart?.product?.map((productItem) => (
    <div key={productItem?.seller?.seller_id}>
      <p className="stor-tit">{productItem?.seller?.seller}</p>
      {productItem?.seller?.products?.map((cartProduct) => (
        <ProductOnCart product={cartProduct} key={cartProduct?.cart_id} />
      ))}
    </div>
  ));
  const [cartdata, setCartdata] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const cartTotalProductsFromAllSeller = cart?.product?.reduce(
        (productItemPrev, productItemNext) => {
          return (
            Number(productItemPrev) +
            Number(productItemNext.seller.products.length)
          );
        },
        0
      );

      setTotalItems(cartTotalProductsFromAllSeller);
      setCartdata(cart);
    }
    return () => {
      isMounted = false;
    };
  }, [cart?.product]);

  useEffect(() => {
    if (cart == undefined) {
      auth?.access_token && dispatch(getCart());
    }
  }, [auth.access_token, cart?.product]);

  if (
    cartdata !== null &&
    cartdata !== undefined &&
    cartdata?.product?.length &&
    cartdata?.product?.length !== 0
  ) {
    cartItemsView = (
      <div className="ps-cart__content">
        <div className="ps-cart__items">{productItemWithSeller}</div>
        <div className="ps-cart__footer">
          <h3>
            Sub Total:
            <strong>
              {cartdata && cartdata !== null && cartdata?.product?.length > 0
                ? currencyHelperConvertToRinggit(cartdata.grand_total)
                : 0}
            </strong>
          </h3>
          <figure>
            <Link href="/account/shopping-cart">
              <a className="ps-btn">View Cart</a>
            </Link>
            <Link href="/account/checkout">
              <a className="ps-btn">Checkout</a>
            </Link>
          </figure>
        </div>
      </div>
    );
  } else {
    cartItemsView = (
      <div className="ps-cart__content">
        <div className="ps-cart__items">
          <span>No products in cart</span>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-cart--mini">
      <a className="header__extra" href="#">
        <i className="icon-bag2"></i>
        <span>
          <i>
            {cartdata !== null && cartdata !== undefined && totalItems > 0
              ? totalItems
              : 0}
          </i>
        </span>
      </a>
      {cartItemsView}
    </div>
  );
});

export default connect((state) => state.cart)(MiniCart);
