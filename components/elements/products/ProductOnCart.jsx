import React from "react";
import Link from "next/link";
import { removeProductFromCartNew } from "~/store/cart/action";
import { useDispatch } from "react-redux";
import { notification, Modal } from "antd";

const ProductOnCart = ({ product }) => {
  const dispatch = useDispatch();
  const handleRemoveCartItem = async (product) => {
    // e.preventDefault();
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      return false;
    } else {
      let parsedata = JSON.parse(userdata);
      let token = parsedata.access_token;
      let payload = {
        cart_id: [product.cart_id],
        access_token: token,
      };
      Modal.confirm({
        title: "Delete this product?",
        onOk: function (e) {
          dispatch(removeProductFromCartNew(payload));
          Modal.destroyAll();
        },
        onCancel: function (e) {
          Modal.destroyAll();
        },
        okButtonProps: {
          danger: true,
        },
      });
    }
  };

  return (
    <div className="ps-product--cart-mobile">
      <div className="ps-product__thumbnail">
        {/* {StrapiProductThumbnail(product)} */}
        <img
          src={product?.image[0]?.image || "/static/img/not-found.jpg"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/static/img/not-found.jpg";
          }}
          alt="product"
          title="product"
        />
      </div>
      <div className="ps-product__content">
        <a
          className="ps-product__remove"
          onClick={(e) => handleRemoveCartItem(product)}
        >
          <i className="icon-cross"></i>
        </a>
        <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
          <a className="ps-product__title">
            {product.product_name}
            {product.attr_name1
              ? ` (${product.attr_name1}${
                  product.attr_name2 ? ` ${product.attr_name2}` : ""
                })`
              : ""}
          </a>
        </Link>
        <p>
          <small>
            RM{" "}
            {product.unit_discount_price !== false ? (
              <>
                {" "}
                <del>{product.unit_actual_price}</del>{" "}
                {product.unit_discount_price}
              </>
            ) : (
              product.unit_actual_price
            )}{" "}
            x {product.quantity}
          </small>
        </p>
      </div>
    </div>
  );
};

export default ProductOnCart;
