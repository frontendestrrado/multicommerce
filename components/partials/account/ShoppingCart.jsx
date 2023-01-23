import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { getCart } from "~/store/cart/action";
import { Empty, notification, Popconfirm, Spin } from "antd";
import Link from "next/link";
import Axios from "axios";
import { getDeviceId } from "~/utilities/common-helpers";
import Repository, { baseUrl, serializeQuery, apibaseurl } from "~/repositories/Repository";
import ProductRepository from "~/repositories/ProductRepository";
import Router, { useRouter } from "next/router";
import { getCustomerProfile } from "~/store/account/action";
import DisplayCartVoucher from "./modules/ShoppingCart/DisplayCartVoucher";
import DisplayPlatformVoucher from "./modules/ShoppingCart/DisplayPlatformVoucher";
import {
  subCurrency,
  currencyHelperConvertToRinggit,
} from "~/utilities/product-helper";
import DisplayWalletBalance from "./modules/ShoppingCart/DisplayWalletBalance";

const ShoppingCart = ({ cartItems, cart, total_discount }) => {
  const Router = useRouter();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  if (cartItems && cartItems.length > 0) {
    currentCartItems = cartItems;
  }

  const [totalItems, setTotalItems] = useState(0);
  const [cartdata, setCartdata] = useState(null);
  const [popConfirmDelete, setPopConfirmDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showPopconfirm = () => {
    setPopConfirmDelete(true);
  };

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
  const getCartItem = (payload) => {
  let userdata = localStorage.getItem("user");
  let parsedata = JSON.parse(userdata);
  let access_token = parsedata?.access_token;
  const user_token = access_token;
  console.log("....email...login.... ${apibaseurl}...",{apibaseurl})
  console.log("....aaaaaaaaaaaaaaaa...",user_token)
  console.log("....bbbbbbbbbbbbbbbb...",getDeviceId)
  const data = Axios.post(
    `${apibaseurl}/api/customer/cart`,
    {
      access_token: user_token,
      lang_id: localStorage.getItem("langId"),
      device_id: getDeviceId,
      page_url: "http://localhost:3000/product/2",
      os_type: "WEB",
    })
    .then((response) => response.data)
    .then((data) => {
      if (data.httpcode == 400 && data.status == "error") {
      }
      if (data.httpcode == 200 && data.status == "success") {
        setCartdata(data.data)
        return;
      }
    })
    .catch((error) => {
    });
}
  useEffect(() => {
    getCartItem()
    const checkLogin = () => {
      let userdata = localStorage.getItem("user");
      if (userdata === undefined || userdata === null) {
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        Router.push("/");
        return false;
      }
    };

    checkLogin();
    const handler = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [auth.isLoggedIn]);

  //METHODS

  async function handleIncreaseItemQty(product) {
   // alert("hh")
    console.log("....yyyy...product...",product)
    if (auth.isLoggedIn !== true) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      return false;
    } else {
      setLoading(true);

      let payload = {
        access_token:auth.access_token,
        product_id: product.product_id,
        quantity:1,
        cart_type:"web",
        prd_assign_id:"",

        // product_id: product.product_id,
        // user_id: 1,
        // quantity: parseInt(1),
        // cart_type: "web",
        // access_token: auth.access_token,
      };
      console.log("....yyyy...product...payload..",payload)
      const responseData = await ProductRepository.addProductToCart(payload);
      console.log("....yyyy...product...responseData..",responseData)
      if (responseData && responseData.httpcode === 200) {
        dispatch(getCart());
        setLoading(false);
        getCartItem()
        notification["success"]({
          message: "Success",
          description: "Quantity Updated",
          duration: 1,
        });
      } else {
        setLoading(false);

        notification["error"]({
          message: "Error",
          description: responseData.message || responseData.response,
          duration: 1,
        });
      }
    }
  }

  async function handleDecreaseItemQty(product) {
    console.log("5555555.....product...",product)
    if (!auth.isLoggedIn) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      return false;
    } else {
      let setqty = parseInt(product.quantity) - parseInt(1);
      if (setqty > 0) {
        setLoading(true);

        let payload = {
          // access_token:auth.access_token,
          // product_id: product.product_id,
          // quantity:setqty,
          // cart_type:"web",
          // prd_assign_id:"",

          access_token:auth.access_token,
cart_id:product.cart_id,
quantity:setqty,
cart_type:"web",

          // product_id: product.product_id,
          // user_id: 1,
          // quantity: setqty,
          // cart_type: "web",
          // access_token: auth.access_token,
        };
console.log("5555555.....55555...",payload)
        const responseData = await ProductRepository.changeQty(payload);
        console.log("...2222222......",responseData)
        if (responseData && responseData.httpcode === 200) {
          dispatch(getCart());
          getCartItem()
          setLoading(false);
          notification["success"]({
            message: "Success",
            description: "Quantity Updated",
            duration: 1,
          });
        } else {
          setLoading(false);

          notification["error"]({
            message: "Error",
            description: responseData.message || responseData.response,
            duration: 1,
          });
        }
      } else {
        notification["error"]({
          message: "Error",
          description: "Qty can't be below 1",
          duration: 1,
        });
      }
    }
  }

  async function handleRemoveCartItem(product) {
    console.log("...8888...",product)
    if (!auth.isLoggedIn) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      return false;
    } else {
      let payload = {
        cart_id: product.cart_id,
        access_token: auth.access_token,
      };
      console.log("...666...",payload)
      const responseData = await ProductRepository.deleteCart(payload);
console.log("....999....",responseData)
      if (responseData && responseData.httpcode == "200") {
        dispatch(getCart());
        getCartItem()
        notification["success"]({
          message: "Success",
          description: "Product Deleted",
          duration: 1,
        });
      } else {
        dispatch(getCart());

        notification["error"]({
          message: "Error",
          description: responseData.message,
          duration: 1,
        });
      }
    }
  }
  const handleProductDeleteCancel = () => {
    setPopConfirmDelete(false);
  };

  const handleProductDeleteOk = async () => {
    let cart_id = [];

    var checkboxes = document.querySelectorAll(
      "input.ps-product__checkbox[type=checkbox]:checked"
    );

    for (var i = 0; i < checkboxes.length; i++) {
      cart_id.push(checkboxes[i].value);
    }

    if (cart_id.length <= 0) {
      notification["error"]({
        message: "Error",
        description: "Please select items",
        duration: 1,
      });
      return false;
    } else {
      if (!auth.isLoggedIn) {
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        return false;
      } else {
        let payload = {
          cart_id: cart_id,
          access_token: auth.access_token,
        };
        const responseData = await ProductRepository.deleteCart(payload);
        if (responseData && responseData.httpcode === 200) {
          dispatch(getCart());
          notification["success"]({
            message: "Success",
            description: "Product Deleted",
            duration: 1,
          });
          setPopConfirmDelete(false);
          setTimeout(() => {
            setPopConfirmDelete(false);
            setConfirmLoading(false);
          }, 2000);
        } else {
          notification["error"]({
            message: "Error",
            description: responseData.message,
            duration: 1,
          });
          setPopConfirmDelete(false);
        }
      }
    }
  };

  async function deleteItems() {
    let cart_id = [];

    var checkboxes = document.querySelectorAll(
      "input.ps-product__checkbox[type=checkbox]:checked"
    );

    for (var i = 0; i < checkboxes.length; i++) {
      cart_id.push(checkboxes[i].value);
    }

    if (cart_id.length <= 0) {
      notification["error"]({
        message: "Error",
        description: "Please select items",
        duration: 1,
      });
      return false;
    } else {
      if (!auth.isLoggedIn) {
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        return false;
      } else {
        var r = confirm("Are you sure to delete  products!");
        if (r == true) {
          let payload = {
            cart_id: cart_id,
            access_token: auth.access_token,
          };
          const responseData = await ProductRepository.deleteCart(payload);
          if (responseData && responseData.httpcode === 200) {
            dispatch(getCart());

            notification["success"]({
              message: "Success",
              description: "Product Deleted",
              duration: 1,
            });
          } else {
            notification["error"]({
              message: "Error",
              description: responseData.message,
              duration: 1,
            });
          }
        }
      }
    }
  }
  console.log("---------------",cartdata);
  //METHODS END
  return (
    <div
      className="ps-section--shopping ps-shopping-cart"
      style={{ paddingBottom: "14rem" }}
    >
      {cartdata != null &&
      cartdata !== undefined &&
      cartdata.errors !== "Cart is empty" &&
      cartdata?.product?.length &&
      cartdata?.product?.length !== 0 ? (
        <Spin size="large" tip="Loading Cart" spinning={loading}>
          <div className="container">
            <div className="ps-section__content">
              <div className="cart-header">
                <div className="prdct-tit ml-5">Product</div>
                {/* <div className="unt-tit d-none d-xl-block">Variation</div> */}
                <div className="unt-tit d-none d-xl-block">unit price</div>
                <div className="Qty-tit d-none d-xl-block">Quantity</div>
                <div className="tot-tit d-none d-xl-block">total price</div>
                <div className="act-tit d-none d-xl-block">Actions</div>
              </div>
              {cartdata != null &&
                cartdata?.product !== undefined &&
                cartdata?.product?.length > 0 &&
                cartdata?.product?.map((product, index) => {
                  return (
                    <div className="prdt-box" key={index}>
                      {/* <div className="stor-slct">
                        <a className="stor-tit ml-5" href="">
                          {productItem.seller.seller}
                        </a>
                      </div> */}
                      {/* {productItem.seller.products.map((product, index) => ( */}
                        <div className="prdt-det" key={index}>
                          <div className="prdt-det-inner">
                            <div className="prdct-innr">
                              {/* <div className="chckbx-prdt-top">
                                <input
                                  type="checkbox"
                                  className={`check-${product.brand_name} ps-product__checkbox`}
                                  name="ps-product__checkbox"
                                  value={product.cart_id}
                                />
                              </div> */}
                              <div className="prdt-img">
                                <div className="prdt-img-innr">
                                  <div className="prodct-imge">
                                    <Link
                                      href={`/product/${product.product_id}`}
                                      as={`/product/${product.product_id}`}
                                    >
                                      <a>
                                        <img
                                          src={
                                            product?.image[0]?.image ||
                                            "/static/img/not-found.jpg"
                                          }
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                              "/static/img/vendor/store/vendor-150x150.jpg";
                                          }}
                                          alt={product.brand_name}
                                          height="80"
                                        />
                                      </a>
                                    </Link>
                                  </div>
                                  <div className="prod-title">
                                    <div className="prod-title-inner text-capitalize">
                                      {product.product_name}
                                      {product.attr_name1
                                        ? ` (${product.attr_name1}${
                                            product.attr_name2
                                              ? ` ${product.attr_name2}`
                                              : ""
                                          })`
                                        : ""}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* <div
                                className="prdct-vari text-capitalize"
                                style={{ fontSize: "initial" }}
                              >

                              </div> */}
                              <div className="prdct-vari"></div>
                              <div className="prdct-unt-pric">
                                <div>
                                  {product.unit_discount_price == false ? (
                                    <span
                                      className="prdt"
                                      style={{ fontSize: "1.5rem" }}
                                    >
                                      {currencyHelperConvertToRinggit(
                                        product.unit_actual_price
                                      )}
                                    </span>
                                  ) : (
                                    <>
                                      <div className="">
                                        <span
                                          className="prdt"
                                          style={{ fontSize: "1.5rem" }}
                                        >
                                          {currencyHelperConvertToRinggit(
                                            product.unit_discount_price
                                          )}
                                        </span>
                                      </div>
                                      <div className="">
                                        <span
                                          className="lin-prdt"
                                          style={{ fontSize: "1.5rem" }}
                                        >
                                          {currencyHelperConvertToRinggit(
                                            product.unit_actual_price
                                          )}
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="prdt-add">
                                <div className="prdt-qty">
                                  <button
                                    className="min"
                                    onClick={() =>
                                      handleDecreaseItemQty(product)
                                    }
                                  >
                                    <span style={{ fontSize: "1.5rem" }}>
                                      -
                                    </span>
                                  </button>
                                  <span className="min numb" type="text">
                                    {product.quantity}
                                  </span>
                                  <button
                                    className="min"
                                    onClick={() =>
                                      handleIncreaseItemQty(product)
                                    }
                                  >
                                    <span style={{ fontSize: "1.5rem" }}>
                                      +
                                    </span>
                                  </button>
                                </div>
                              </div>
                              <div className="prdt-totl">
                                <span style={{ fontSize: "1.5rem" }}>
                                  {currencyHelperConvertToRinggit(
                                    product.total_discount_price == false
                                      ? product.total_actual_price
                                      : product.total_discount_price
                                  )}
                                </span>
                              </div>
                              <div className="prdt-act">
                                <Popconfirm
                                  title="Are you sure to delete  products?"
                                  onConfirm={() =>
                                    handleRemoveCartItem(product)
                                  }
                                  okButtonProps={{
                                    danger: true,
                                  }}
                                  onCancel={handleProductDeleteCancel}
                                >
                                  <span
                                    onClick={showPopconfirm}
                                    style={{
                                      fontSize: "1.5rem",
                                      color: "red",
                                      cursor: "pointer",
                                    }}
                                  >
                                    Delete
                                  </span>
                                </Popconfirm>
                              </div>
                            </div>
                          </div>
                        </div>
                      {/* // ))} */}
                      {/* <DisplayCartVoucher product_seller={productItem.seller} /> */}
                    </div>
                  );
                })}

              <div className="crt-ftr">
                <div className="plt-vou">
                  {/* <div className="plt-txt">Platform Voucher</div>
                  <div className="plt-spc"></div> */}
                  {/* <div className="plt-vchrs">
                    <DisplayPlatformVoucher />
                  </div> */}
                </div>
                {/* <div className="vou-brdr"></div>

                <DisplayWalletBalance />

                <div className="vou-brdr"></div> */}
                <div className="vou-slct">
                  <div className="chckbx-prdt">
                    <input
                      type="checkbox"
                      // name="ps-product__checkbox"
                      onChange={(e) => {
                        if (e.target.checked === true) {
                          var ele = document.getElementsByName(
                            "ps-product__checkbox"
                          );
                          for (var i = 0; i < ele.length; i++) {
                            if (ele[i].type == "checkbox")
                              ele[i].checked = true;
                          }
                        } else if (e.target.checked === false) {
                          var ele = document.getElementsByName(
                            "ps-product__checkbox"
                          );
                          for (var i = 0; i < ele.length; i++) {
                            if (ele[i].type == "checkbox")
                              ele[i].checked = false;
                          }
                        }
                      }}
                    />
                  </div>
                  <span
                    className="slct-all mr-4"
                    style={{ fontSize: "1.5rem" }}
                  >
                    Select all ({totalItems > 0 ? totalItems : "No Items"})
                  </span>

                  <Popconfirm
                    title="Are you sure to delete  products?"
                    onConfirm={handleProductDeleteOk}
                    okButtonProps={{ loading: confirmLoading, danger: true }}
                    onCancel={handleProductDeleteCancel}
                  >
                    <span
                      onClick={showPopconfirm}
                      style={{
                        fontSize: "1.5rem",
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </span>
                  </Popconfirm>
                  {/* <a onClick={(e) => deleteItems(e)} className="slct-dlt">
                    <span style={{ fontSize: "1.5rem" }}>Delete</span>
                  </a> */}
                </div>
                <div className="vou-brdr"></div>
                {cartdata.total_tax && (
                  <>
                    {/* <div className="coin-bal">
                      <div className="totl-price p-2">
                        <div className="insuf">Tax:</div>
                      </div>
                    </div>
                    <div className="coin-coun">
                      {currencyHelperConvertToRinggit(cartdata.total_tax)}
                    </div> */}
                  </>
                )}
                <div className="vou-slct">
                  <div className="slct-spc"></div>

                  <div className="totl-itm">
                    <div className="totl-prc">
                      <div className="totl-price">
                        <div className="ttl-itm">
                          Total ({totalItems > 0 ? totalItems : "No Items"}
                          Item(s)):
                        </div>

                        <div className="ttl-prc">
                          {cartdata != null && total_discount !== 0 ? (
                            <>
                              <span>
                                {currencyHelperConvertToRinggit(
                                  subCurrency(
                                    cartdata.grand_total,
                                    total_discount
                                  )
                                )}
                              </span>
                              <del style={{ fontSize: "small" }}>
                                {currencyHelperConvertToRinggit(
                                  cartdata.grand_total
                                )}
                              </del>
                            </>
                          ) : (
                            <>
                              <span>
                                &nbsp;&nbsp;
                                {currencyHelperConvertToRinggit(
                                  cartdata.grand_total
                                )}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="ttl-itm text-right">
                      Total Savings :{" "}
                      <span style={{ color: "#ff0000" }}>
                        {currencyHelperConvertToRinggit(total_discount)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="vou-brdr"></div>
                <div className="vou-slct">
                  <div className="slct-spc"></div>
                  <div className="totl-itm">
                    <Link href="/account/checkout">
                      <a>
                        <button className="chck-out">
                          <span
                            className="chcko"
                            style={{ fontSize: "1.5rem" }}
                          >
                            Checkout
                          </span>
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      ) : (
        <div className="container">
          <Empty description={<span>Cart is empty!</span>} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return state.cart;
};
export default connect(mapStateToProps)(ShoppingCart);
