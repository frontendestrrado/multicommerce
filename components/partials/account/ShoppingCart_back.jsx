import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCart,
  increaseItemQty,
  decreaseItemQty,
  removeItem,
} from "../../../store/cart/action";
import { notification } from "antd";
import Link from "next/link";
import ProductCart from "../../elements/products/ProductCart";
import ProductRepository from "~/repositories/ProductRepository";
import Router from "next/router";
class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = { cartdata: null, loading: true, cart_id: [] };
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
              <div className="table-responsive">
                <table className="table ps-table--shopping-cart">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.cartdata != null &&
                      this.state.cartdata.products.length > 0 &&
                      this.state.cartdata.products.map((product) => {
                        return (
                          <tr key={product.id}>
                            <td>
                              <div className="ps-product--cart">
                                <div className="select-product">
                                  {" "}
                                  <input
                                    type="checkbox"
                                    name="ps-product__checkbox"
                                    value={product.cart_id}
                                  />
                                </div>
                                <div className="ps-product__thumbnail">
                                  <span
                                    className="frgt_link"
                                    style={{ fontWeight: "600" }}
                                  >
                                    {product.brand_name}
                                  </span>
                                  <Link
                                    href={`/product/${product.product_id}`}
                                    as={`/product/${product.product_id}`}
                                  >
                                    <a>
                                      <img
                                        src={product.image[0]?.image}
                                        alt="Kangtao"
                                      />
                                    </a>
                                  </Link>
                                </div>
                                <div className="ps-product__content">
                                  <Link
                                    href={`/product/${product.product_id}`}
                                    as={`/product/${product.product_id}`}
                                  >
                                    <a className="ps-product__title">
                                      {product.product_name}
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td className="price">
                              <span className="strike_text">
                                RM{product.unit_actual_price}{" "}
                              </span>
                              RM
                              {product.unit_discount_price}
                            </td>
                            <td>
                              <div className="form-group--number">
                                <button
                                  className="up"
                                  onClick={this.handleIncreaseItemQty.bind(
                                    this,
                                    product
                                  )}
                                >
                                  +
                                </button>
                                <button
                                  className="down"
                                  onClick={this.handleDecreaseItemQty.bind(
                                    this,
                                    product
                                  )}
                                >
                                  -
                                </button>
                                <input
                                  className="form-control"
                                  type="text"
                                  placeholder="1"
                                  value={product.quantity}
                                  // readOnly={true}
                                />
                              </div>
                            </td>
                            <td>
                              RM{product.quantity * product.unit_discount_price}
                            </td>
                            <td>
                              <a
                                href="#"
                                onClick={this.handleRemoveCartItem.bind(
                                  this,
                                  product
                                )}
                              >
                                Delete
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {/* <div className="ps-section__cart-actions">
                <Link href="/shop">
                  <a>
                    <i className="icon-arrow-left mr-2"></i>
                    Back to Shop
                  </a>
                </Link>
              </div> */}

              <div className="ps-section__content gross_total">
                <div
                  className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 "
                  style={{ marginBottom: "2rem" }}
                >
                  <div className="cart_left "></div>
                  <div className="cart_right">
                    <div>
                      <p className="ftr_link">Select Or Enter Code</p>
                    </div>
                  </div>
                </div>
                <hr />
                <br />

                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                  <div className="cart_left ">
                    <input
                      type="checkbox"
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
                    ></input>{" "}
                    Select All({" "}
                    {this.state.cartdata != null &&
                      this.state.cartdata.products.length}
                    ){" "}
                    <a
                      href="javascript:void(0);"
                      onClick={(e) => this.deleteItems(e)}
                    >
                      Delete
                    </a>
                  </div>
                  <div className="cart_right ">
                    <div className="cart_right1">
                      Total (
                      {this.state.cartdata != null &&
                        this.state.cartdata.products.length + " "}
                      Items) RM{" "}
                      {this.state.cartdata != null &&
                        this.state.cartdata.grand_total}
                    </div>
                    <div className="cart_right2">
                      <Link href="/account/checkout">
                        <a className="ps-btn ps-btn--fullwidth">Checkout</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="ps-section__footer">
              <div className="row justify-content-end">
                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                  <div className="ps-block--shopping-total">
                    <div className="ps-block__header">
                      <p>
                        Subtotal{" "}
                        <span>
                          {" "}
                          {this.state.cartdata != null &&
                            this.state.cartdata.total_cost}
                        </span>
                      </p>
                    </div>
                    <div className="ps-block__content">
                      <ul className="ps-block__product">
                        {this.state.cartdata != null &&
                        this.state.cartdata.products.length > 0
                          ? this.state.cartdata.products.map(
                              (product, index) => {
                                if (index < 3) {
                                  return (
                                    <li key={product.id}>
                                      <span className="ps-block__estimate">
                                        <Link
                                          href="/product/[pid]"
                                          as={`/product/${product.product_id}`}
                                        >
                                          <a className="ps-product__title">
                                            {product.product_name}
                                            <br /> x {product.quantity}
                                          </a>
                                        </Link>
                                      </span>
                                    </li>
                                  );
                                }
                              }
                            )
                          : ""}
                      </ul>
                      <h3>
                        Total{" "}
                        <span>
                          {" "}
                          {this.state.cartdata != null &&
                            this.state.cartdata.grand_total}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <Link href="/account/checkout">
                    <a className="ps-btn ps-btn--fullwidth">
                      Proceed to checkout
                    </a>
                  </Link>
                </div>
              </div>
            </div> */}
          </div>
        ) : (
          <div className="container">
            <div className="ps-section__content">
              {" "}
              {this.state.loading ? "Loading..please wait" : "Cart is empty"}
            </div>{" "}
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
