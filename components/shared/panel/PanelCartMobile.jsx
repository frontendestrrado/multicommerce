import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  getCart,
  removeItem,
  removeProductFromCartNew,
} from "~/store/cart/action";
import Link from "next/link";
import { baseUrl } from "../../../repositories/Repository";
import ProductOnCart from "~/components/elements/products/ProductOnCart";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";

const PanelCartMobile = (props) => {
  // const { amount, cartItems } = props;
  const { grand_total, cart_count, product } = props.cart;

  const dispatch = useDispatch();

  const handleRemoveCartItem = (product) => {
    let payload = {
      cart_id: [product.cart_id],
      access_token: token,
    };

    dispatch(removeProductFromCartNew(payload));
  };

  useEffect(() => {
    dispatch(getCart());
  }, [product]);

  const productItemWithSeller = product?.map((productItem) => (
    <div key={productItem.seller.seller_id}>
      <p className="stor-tit">{productItem.seller.seller}</p>
      {productItem.seller.products.map((cartProduct) => (
        <ProductOnCart product={cartProduct} key={cartProduct.cart_id} />
      ))}
    </div>
  ));

  return (
    <div className="ps-cart--mobile">
      <div className="ps-cart__content">
        {product && cart_count && productItemWithSeller.length > 0 ? (
          <div className="ps-cart__items">{productItemWithSeller}</div>
        ) : (
          <div className="ps-cart__items">
            <span>No products in cart</span>
          </div>
        )}
      </div>
      {product && cart_count && productItemWithSeller.length > 0 ? (
        <div className="ps-cart__footer">
          <h3>
            Sub Total:
            <strong>
              {product && cart_count !== null && cart_count > 0
                ? currencyHelperConvertToRinggit(grand_total)
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
      ) : (
        <div className="ps-cart__footer">
          <Link href="/shop">
            <a className="ps-btn ps-btn--fullwidth">Shop now</a>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.cart;
};
export default connect(mapStateToProps)(PanelCartMobile);
