import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCart,
  increaseItemQty,
  decreaseItemQty,
  removeItem,
} from "../../../store/cart/action";
import { Empty, notification, Spin } from "antd";
import Link from "next/link";
import ProductCart from "../../elements/products/ProductCart";
import ProductRepository from "~/repositories/ProductRepository";
import Router from "next/router";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = { cartdata: null, loading: true, cart_id: [], setload: true };
  }

  async componentDidMount() {
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      Router.push("/");
      return false;
    } else {
      this.setState({ loading: true });
      let parsedata = JSON.parse(userdata);
      let token = parsedata.access_token;
      let payload = {
        access_token: token,
      };
      const responseData = await ProductRepository.getCart(payload);
      if (responseData.status === "success") {
        this.setState({ loading: false });
        this.setState({ cartdata: responseData.data });
      } else {
        this.setState({ loading: false });
      }
      //this.props.dispatch(getCart());
    }
  }

  async handleIncreaseItemQty(product) {
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      return false;
    } else {
      this.setState({ loading: true });

      let parsedata = JSON.parse(userdata);
      let token = parsedata.access_token;
      let payload = {
        product_id: product.product_id,
        user_id: 1,
        quantity: parseInt(1),
        cart_type: "web",
        access_token: token,
      };
      const responseData = await ProductRepository.addProductToCart(payload);
      if (responseData && responseData.httpcode === 200) {
        this.setState({ loading: false });

        const responseData = await ProductRepository.getCart(payload);
        if (responseData.status === "success") {
          this.setState({ cartdata: responseData.data });
        }
        notification["success"]({
          message: "Success",
          description: "Quantity Updated",
          duration: 1,
        });
      } else {
        this.setState({ loading: false });

        notification["error"]({
          message: "Error",
          description: responseData.message,
          duration: 1,
        });
      }
    }
    //this.props.dispatch(increaseItemQty(product));
  }

  async handleDecreaseItemQty(product) {
    // this.props.dispatch(decreaseItemQty(product));
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      return false;
    } else {
      let setqty = parseInt(product.quantity) - parseInt(1);
      if (setqty > 0) {
        this.setState({ loading: true });

        let parsedata = JSON.parse(userdata);
        let token = parsedata.access_token;
        let payload = {
          product_id: product.product_id,
          user_id: 1,
          quantity: setqty,
          cart_type: "web",
          access_token: token,
        };
        const responseData = await ProductRepository.changeQty(payload);
        if (responseData && responseData.httpcode === 200) {
          this.setState({ loading: false });

          const responseData = await ProductRepository.getCart(payload);
          if (responseData.status === "success") {
            this.setState({ cartdata: responseData.data });
          }
          notification["success"]({
            message: "Success",
            description: "Quantity Updated",
            duration: 1,
          });
        } else {
          this.setState({ loading: false });

          notification["error"]({
            message: "Error",
            description: responseData.message,
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

  async handleRemoveCartItem(product) {
    let userdata = localStorage.getItem("user");
    if (userdata === undefined || userdata === null) {
      notification["error"]({
        message: "Error",
        description: "Please login first",
        duration: 1,
      });
      return false;
    } else {
      var r = confirm("Are you sure to delete this product!");
      if (r == true) {
        let parsedata = JSON.parse(userdata);
        let token = parsedata.access_token;
        let payload = {
          cart_id: [product.cart_id],
          access_token: token,
        };
        const responseData = await ProductRepository.deleteCart(payload);
        if (responseData && responseData.httpcode == "200") {
          const responseData = await ProductRepository.getCart(payload);
          if (responseData.status === "success") {
            this.props.dispatch(getCart());

            this.setState({ cartdata: responseData.data });
          } else {
            this.setState({ cartdata: null });
          }
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
    // this.props.dispatch(removeItem(product));
  }

  async deleteItems() {
    let cart_id = [];
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    for (var i = 0; i < checkboxes.length; i++) {
      cart_id.push(checkboxes[i].value);
    }
    if (cart_id.length <= 0) {
      notification["error"]({
        message: "Error",
        description: "Please select items",
        duration: 1,
      });
    } else {
      let userdata = localStorage.getItem("user");
      if (userdata === undefined || userdata === null) {
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        return false;
      } else {
        var r = confirm("Are you sure to delete  products!");
        if (r == true) {
          let parsedata = JSON.parse(userdata);
          let token = parsedata.access_token;
          let payload = {
            cart_id: cart_id,
            access_token: token,
          };
          const responseData = await ProductRepository.deleteCart(payload);
          if (responseData && responseData.httpcode === 200) {
            const responseData = await ProductRepository.getCart(payload);
            if (responseData.status === "success") {
              this.setState({ cartdata: responseData.data });
            } else {
              this.setState({ cartdata: null });
            }
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

  render() {
    const { amount, cartTotal, cartItems } = this.props;
    let currentCartItems = [];
    if (cartItems && cartItems.length > 0) {
      currentCartItems = cartItems;
    }
    if (this.state.loading) {
      return (
        <div className="ps-section--shopping ps-shopping-cart">
          {" "}
          Loading...please wait
        </div>
      );
    }

    return (
      <div
        className="ps-section--shopping ps-shopping-cart"
        style={{ paddingBottom: "14rem" }}
      >
        {this.state.cartdata != null ? (
          <div className="container">
            <div className="ps-section__content">
              <div class="cart-header">
                <div class="chckbx">
                  <input
                    type="checkbox"
                    name="ps-product__checkbox"
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        var ele = document.getElementsByName(
                          "ps-product__checkbox"
                        );
                        for (var i = 0; i < ele.length; i++) {
                          if (ele[i].type == "checkbox") ele[i].checked = true;
                        }
                      } else if (e.target.checked === false) {
                        var ele = document.getElementsByName(
                          "ps-product__checkbox"
                        );
                        for (var i = 0; i < ele.length; i++) {
                          if (ele[i].type == "checkbox") ele[i].checked = false;
                        }
                      }
                    }}
                  />
                </div>
                <div class="prdct-tit">Product</div>
                <div class="unt-tit">unit price</div>
                <div class="Qty-tit">Quantity</div>
                <div class="tot-tit">total price</div>
                <div class="act-tit">Actions</div>
              </div>
              {this.state.cartdata != null &&
                this.state.cartdata.products.length > 0 &&
                this.state.cartdata.products.map((product) => {
                  return (
                    <div class="prdt-box">
                      <div class="stor-slct">
                        <div class="chckbx">
                          <input
                            type="checkbox"
                            name="ps-product__checkbox"
                            className={`check-${product.brand_name}`}
                            value={product.cart_id}
                            onChange={(e) => {
                              if (e.target.checked === true) {
                                var ele = document.getElementsByClassName(
                                  `check-${product.brand_name}`
                                );
                                for (var i = 0; i < ele.length; i++) {
                                  if (ele[i].type == "checkbox")
                                    ele[i].checked = true;
                                }
                              } else if (e.target.checked === false) {
                                var ele = document.getElementsByClassName(
                                  `check-${product.brand_name}`
                                );
                                for (var i = 0; i < ele.length; i++) {
                                  if (ele[i].type == "checkbox")
                                    ele[i].checked = false;
                                }
                              }
                            }}
                          />
                        </div>
                        <a class="stor-tit" href="">
                          {product.seller}
                        </a>
                      </div>
                      <div class="prdt-det">
                        <div class="prdt-det-inner">
                          <div class="prdct-innr">
                            <div class="chckbx-prdt">
                              <input
                                type="checkbox"
                                className={`check-${product.brand_name}`}
                                name="ps-product__checkbox"
                                value={product.cart_id}
                              />
                            </div>
                            <div class="prdt-img">
                              <div class="prdt-img-innr">
                                <div class="prodct-imge">
                                  <Link
                                    href={`/product/${product.product_id}`}
                                    as={`/product/${product.product_id}`}
                                  >
                                    <a>
                                      <img
                                        src={product?.image[0]?.image}
                                        alt={product.brand_name}
                                      />
                                    </a>
                                  </Link>
                                </div>
                                <div class="prod-title">
                                  <div class="prod-title-inner">
                                    {product.product_name}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div class="prdct-vari">Variations</div> */}
                            <div class="prdct-vari"></div>
                            <div class="prdct-unt-pric">
                              <div>
                                {product.unit_discount_price == 0 ? (
                                  <span
                                    class="prdt"
                                    style={{ fontSize: "1.5rem" }}
                                  >
                                    RM {product.unit_actual_price}
                                  </span>
                                ) : (
                                  <>
                                    <span
                                      class="lin-prdt"
                                      style={{ fontSize: "1.5rem" }}
                                    >
                                      RM {product.unit_actual_price}
                                    </span>
                                    <span
                                      class="prdt"
                                      style={{ fontSize: "1.5rem" }}
                                    >
                                      RM {product.unit_discount_price}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div class="prdt-add">
                              <div class="prdt-qty">
                                <button
                                  className="min"
                                  onClick={this.handleDecreaseItemQty.bind(
                                    this,
                                    product
                                  )}
                                >
                                  <span style={{ fontSize: "1.5rem" }}>-</span>
                                </button>
                                <input
                                  class="min numb"
                                  type="text"
                                  value={product.quantity}
                                />
                                <button
                                  className="min"
                                  onClick={this.handleIncreaseItemQty.bind(
                                    this,
                                    product
                                  )}
                                >
                                  <span style={{ fontSize: "1.5rem" }}>+</span>
                                </button>
                              </div>
                            </div>
                            <div class="prdt-totl">
                              <span style={{ fontSize: "1.5rem" }}>
                                RM{" "}
                                {product.total_discount_price === 0
                                  ? product.total_actual_price
                                  : product.total_discount_price}
                              </span>
                            </div>
                            <div class="prdt-act">
                              <button
                                class="prt-del"
                                onClick={this.handleRemoveCartItem.bind(
                                  this,
                                  product
                                )}
                              >
                                <span style={{ fontSize: "1.5rem" }}>
                                  Delete
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="prdt-vou">
                        <div class="vouch">Up to 95% off voucher available</div>
                        <div class="mor-vou">
                          <div class="more-vouhr">More Vouchers</div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              <div class="crt-ftr">
                <div class="plt-vou">
                  <div class="plt-txt">Platform Voucher</div>
                  <div class="plt-spc"></div>
                  <div class="plt-vchrs">Apply your exclusive vouchers!</div>
                </div>
                <div class="vou-brdr"></div>
                <div class="lft-spc">
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                  />
                </div>
                <div class="coin-bal">
                  <div class="insuf">Insufficient Coins Balance</div>
                </div>
                <div class="coin-coun">RM0.00</div>
                <div class="vou-brdr"></div>
                <div class="vou-slct">
                  <div class="chckbx-prdt">
                    <input
                      type="checkbox"
                      name="ps-product__checkbox"
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
                  <span class="slct-all" style={{ fontSize: "1.5rem" }}>
                    select all (
                    {this.state.cartdata != null &&
                      this.state.cartdata.products.length}
                    )
                  </span>
                  <a
                    href="javascript:void(0);"
                    onClick={(e) => this.deleteItems(e)}
                    className="slct-dlt"
                  >
                    <span style={{ fontSize: "1.5rem" }}>Delete</span>
                  </a>
                  <div class="slct-spc"></div>
                  <div class="totl-itm">
                    <div class="totl-prc">
                      <div class="totl-price">
                        <div class="ttl-itm">
                          Total (
                          {this.state.cartdata != null &&
                            this.state.cartdata.products.length + " "}
                          Items):
                        </div>

                        <div class="ttl-prc">
                          RM{" "}
                          {this.state.cartdata != null &&
                            this.state.cartdata.grand_total}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link href="/account/checkout">
                    <a>
                      <button class="chck-out">
                        <span class="chcko" style={{ fontSize: "1.5rem" }}>
                          Checkout
                        </span>
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            {this.state.loading ? (
              <Spin size="large" style={{ display: "block" }} />
            ) : (
              // "Loading..please wait"
              <Empty description={<span>Cart is empty!</span>} />
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state.cart;
};
export default connect(mapStateToProps)(ShoppingCart);
