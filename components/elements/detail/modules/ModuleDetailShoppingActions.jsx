import React, { useState, useEffect } from "react";
import {
  Favorite,
  FavoriteBorder,
  AssessmentOutlined,
} from "@material-ui/icons";
import {
  getProductsById,
  setConfigProductID,
  setConfigProductOutOfStockSelling,
  setConfigProductStock,
  setProductQuantityAction,
  updateShockingsaleWishlist,
} from "~/store/product/action";
import { addItem } from "~/store/cart/action";
import { addItemToCompare } from "~/store/compare/action";
import {
  addItemToWishlist,
  addShockingSaleItemToWishlist,
  getWishlistList,
  removeShockingSaleItemFromWishlist,
  removeWishlistItem,
} from "~/store/wishlist/action";

import { getCart } from "~/store/cart/action";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import { Avatar, Image, notification, Radio } from "antd";
import { CircularProgress } from "@material-ui/core";
import { ContactsOutlined } from "@material-ui/icons";
import ModuleDetailProductGroup from "./ModuleDetailProductGroup";
import { currencyHelperConvertToRinggit } from "~/utilities/product-helper";

const ModuleDetailShoppingActions = React.memo(
  ({ product, extended = false, shockingsale = false }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [wishlistFromServer, setWishlistFromServer] = useState([]);
    const Router = useRouter();
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const auth = useSelector((state) => state.auth);

    const handleAddItemToCart = async (e) => {
      console.log("...111.....")
      let userdata = localStorage.getItem("user");
      let parsedata = JSON.parse(userdata);
      let token = parsedata?.access_token;
      console.log("...111..userdata...",userdata)
      console.log("...111...parsedata..",parsedata)
      console.log("...111..token...",token)
      if (userdata === undefined || userdata === null) {
        console.log("...111...222..")
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        return false;
      } else if (
        product?.product?.product_type == "config" &&
        (filterAssocProd.assocValSel == "" ||
          filterAssocProd.assocValSizeSel == "")
      ) {
        console.log("...111...555..")
        notification["error"]({
          message: "Error",
          description: "Please Select Varient",
          duration: 1,
        });
        return false;
      } else {
        console.log("...111..666...")
        setLoading1(true);
        let payload = {
          // user_id: 1,
          prd_assign_id:"",
          quantity: quantity,
          cart_type: "web",
          access_token: token,
        };
        console.log("...111..777...")
        if (product?.product?.product_type == "config") {
          

          payload = {
            ...payload,
            product_id: getProductId(filterAssocProd.assocValSizeSel),
          };
          const { out_of_stock_selling, stock } = getOutOfstockValueConfigProd(
            filterAssocProd.assocValSizeSel
          );

          if (out_of_stock_selling === false && stock <= 0) {
            console.log("...111..8888...")
            notification["error"]({
              message: "Error",
              description: "Product Out of Stock!",
              duration: 2,
            });
            setLoading1(false);
            return false;
          }
          //condition for config end
        } else {
          console.log("...111...999..")
          payload = {
            ...payload,
            product_id: product.product.product_id,
          };
          if (
            product.product.out_of_stock_selling === false &&
            product.product.stock <= 0
          ) {
            console.log("...111..1111222...")
            notification["error"]({
              message: "Error",
              description: "Product Out of Stock!",
              duration: 2,
            });
            setLoading1(false);

            return false;
          }
        }

        const responseData =
          payload?.access_token &&
        
          (await ProductRepository.addProductToCart(payload));

        if (responseData && responseData.httpcode == "200") {
          let tmp = product;
          tmp.quantity = quantity;
          // dispatch(addItem(tmp));
          dispatch(getCart());

          setLoading1(false);
          notification[responseData.status]({
            message: responseData.message,
            description: responseData.response,
            duration: 1,
          });
          setTimeout(function () {
            Router.push("/account/shopping-cart");
          }, 200);
        } else {
          notification["error"]({
            message: "Error",
            description: responseData.message,
            duration: 1,
          });
          setLoading1(false);
        }
      }
    };

    const handleBuynow = async (e) => {
      if (auth.isLoggedIn !== true) {
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        return false;
      } else if (
        product.product.product_type == "config" &&
        (filterAssocProd.assocValSel == "" ||
          filterAssocProd.assocValSizeSel == "")
      ) {
        notification["error"]({
          message: "Error",
          description: "Please Select Varient",
          duration: 1,
        });
        return false;
      } else {
        setLoading2(true);
        let payload = {
          // user_id: 1,
          prd_assign_id:"",
          quantity: quantity,
          access_token: auth.access_token,
          cart_type: "web",
        };

        if (product.product.product_type == "config") {
          payload = {
            ...payload,
            product_id: getProductId(filterAssocProd.assocValSizeSel),
          };

          const { out_of_stock_selling, stock } = getOutOfstockValueConfigProd(
            filterAssocProd.assocValSizeSel
          );

          if (out_of_stock_selling === false && stock <= 0) {
            notification["error"]({
              message: "Error",
              description: "Product Out of Stock!",
              duration: 2,
            });
            setLoading2(false);

            return false;
          }
        } else {
          payload = {
            ...payload,
            product_id: product.product.product_id,
          };
          if (
            product.product.out_of_stock_selling === false &&
            product.product.stock <= 0
          ) {
            notification["error"]({
              message: "Error",
              description: "Product Out of Stock!",
              duration: 2,
            });
            setLoading2(false);

            return false;
          }
        }
        const responseData = await ProductRepository.addProductToCart(payload);

        if (responseData.httpcode == 200) {
          let tmp = product;
          tmp.quantity = quantity;
          notification[responseData.status]({
            description: responseData.response,
            duration: 1,
          });
          // dispatch(addItem(tmp));
          setTimeout(function () {
            Router.push("/account/checkout");
          }, 1000);
          setLoading2(false);
        } else {
          notification["error"]({
            message: "Error",
            description: responseData.message,
            duration: 1,
          });
          setLoading2(false);
        }
      }
    };

    const handleAddItemToCompare = (e) => {
      dispatch(addItemToCompare(product));
    };

    const handleAddItemToWishlist = async (e) => {
   
      let userdata = localStorage.getItem("user");
      let parsedata = JSON.parse(userdata);
      let token = parsedata?.access_token;
      if (userdata === undefined || userdata === null) {
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        return false;
      } else {
        if (shockingsale == true) {
          dispatch(addShockingSaleItemToWishlist(product.product.product_id));
        } else {
          console.log("lllll..........ll....",product.product.product_id)
          dispatch(addItemToWishlist(product.product.product_id));
        }
      }
    };

    const handleRemoveWishListItem = () => {
      let userdata = localStorage.getItem("user");
      let parsedata = JSON.parse(userdata);
      let token = parsedata?.access_token;
      if (userdata === undefined || userdata === null) {
        notification["error"]({
          message: "Error",
          description: "Please login first",
          duration: 1,
        });
        return false;
      } else {
        if (shockingsale == true) {
          dispatch(
            removeShockingSaleItemFromWishlist(product.product.product_id)
          );
        } else {
          dispatch(removeWishlistItem(product.product.product_id));
        }
      }
    };

    const handleIncreaseItemQty = (e) => {
      setQuantity(quantity + 1);
      dispatch(setProductQuantityAction(quantity + 1));
    };

    const handleDecreaseItemQty = (e) => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        dispatch(setProductQuantityAction(quantity - 1));
      }
    };

    const [associativeProd, setAssociativeProd] = useState([]);
    const [uniqueAssociativeProd, setUniqueAssociativeProd] = useState([]);

    const [filterAssocProd, setFilterAssocProd] = useState({
      assocVal: "",
      assocValSel: "",
      assocValSize: "",
      assocValSizeSel: "",
      assocProdId: "",
    });

    useEffect(() => {
      setAssociativeProd(product?.associative_products);
      let arrayVals = [
        ...new Map(
          product?.associative_products?.map((item) => [
            item["attr_value"],
            item,
          ])
        ).values(),
      ];
      setUniqueAssociativeProd(arrayVals);
    }, [product]);

    const handleChangeAttr = (e) => {
      setFilterAssocProd({ ...filterAssocProd, assocValSel: e.target.value });
      setTimeout(() => {
        getProductId(filterAssocProd.assocValSizeSel);
      }, 1000);
    };

    const handleChangeAttrSize = (e) => {
      setFilterAssocProd({
        ...filterAssocProd,
        assocValSizeSel: e.target.value,
      });
      setTimeout(() => {
        getProductId(e.target.value);
      }, 1000);
    };

    const renderAssociativeProduct = () => {
      return (
        <div className="ps-product__groupped">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td
                  style={{
                    fontWeight: 500,
                    fontSize: "large",
                    width: "20%",
                  }}
                >
                  {associativeProd[0]?.attr_name}
                </td>
                <td>
                  <Radio.Group
                    size="large"
                    className="ml-4"
                    onChange={handleChangeAttr}
                    defaultValue={filterAssocProd?.assocVal}
                  >
                    {uniqueAssociativeProd?.map((attr, index) => {
                      return (
                        <Radio.Button
                          value={attr.attr_value}
                          key={index}
                          className="mr-2"
                        >
                          <Avatar src={attr.image} />
                        </Radio.Button>
                      );
                    })}
                  </Radio.Group>
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
              {filterAssocProd.assocValSel ? (
                <tr>
                  <td
                    style={{
                      fontWeight: 500,
                      fontSize: "large",
                      width: "20%",
                    }}
                  >
                    {associativeProd[0]?.sub_attributes[0]?.attr_name}
                  </td>
                  <td>
                    <Radio.Group
                      size="large"
                      className="ml-4"
                      onChange={handleChangeAttrSize}
                    >
                      {associativeProd
                        ?.filter(
                          (prod) =>
                            prod.attr_value.toLowerCase() ===
                            filterAssocProd.assocValSel.toLowerCase()
                        )
                        ?.map((attr) => attr.sub_attributes[0])
                        ?.map((values, index) => {
                          return (
                            <Radio.Button value={values.attr_value} key={index}>
                              {values.attr_value}
                            </Radio.Button>
                          );
                        })}
                    </Radio.Group>
                  </td>
                </tr>
              ) : null}

              {filterAssocProd.assocValSizeSel ? (
                <tr className={renderPrice() !== undefined ? `` : `d-none`}>
                  <td
                    style={{
                      fontWeight: 500,
                      fontSize: "large",
                      width: "20%",
                    }}
                  >
                    Price:
                  </td>
                  <td
                    style={{
                      fontWeight: 400,
                      fontSize: "large",
                    }}
                  >
                    <span className="ml-4">
                      {currencyHelperConvertToRinggit(renderPrice())}
                    </span>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      );
    };

    const renderPrice = () => {
      // const price = associativeProd
      //   ?.filter((prod) => prod.attr_value == filterAssocProd.assocValSel)[0]
      //   ?.sub_attributes?.filter(
      //     (attr) => attr.attr_value == filterAssocProd.assocValSizeSel
      //   )[0]?.actual_price;

      const price = associativeProd
        ?.filter((prod) => prod.attr_value == filterAssocProd.assocValSel)
        ?.map((attr) => attr.sub_attributes[0])
        ?.filter(
          (attr) => attr.attr_value == filterAssocProd.assocValSizeSel
        )[0]?.actual_price;

      const prod_sale_price = associativeProd
        ?.filter((prod) => prod.attr_value == filterAssocProd.assocValSel)
        ?.map((attr) => attr.sub_attributes[0])
        ?.filter(
          (attr) => attr.attr_value == filterAssocProd.assocValSizeSel
        )[0]?.sale_price;

      if (prod_sale_price !== false) {
        return prod_sale_price;
      } else {
        return price;
      }
    };

    const getOutOfstockValueConfigProd = (sizeValue) => {
      const out_of_stock_selling = associativeProd
        ?.filter((prod) => prod.attr_value == filterAssocProd.assocValSel)
        ?.map((attr) => attr.sub_attributes[0])
        ?.filter(
          (attr) => attr.attr_value == sizeValue
        )[0]?.out_of_stock_selling;

      const stock = associativeProd
        ?.filter((prod) => prod.attr_value == filterAssocProd.assocValSel)
        ?.map((attr) => attr.sub_attributes[0])
        ?.filter((attr) => attr.attr_value == sizeValue)[0]?.stock;

      return { stock, out_of_stock_selling };
    };

    const getProductId = (sizeValue) => {
      const selectedProductID = associativeProd
        ?.filter((prod) => prod.attr_value == filterAssocProd.assocValSel)
        ?.map((attr) => attr.sub_attributes[0])
        ?.filter((attr) => attr.attr_value == sizeValue)[0]?.product_id;
      const { stock, out_of_stock_selling } =
        getOutOfstockValueConfigProd(sizeValue);

      dispatch(setConfigProductID(selectedProductID));
      dispatch(setConfigProductStock(stock));
      dispatch(setConfigProductOutOfStockSelling(out_of_stock_selling));

      return selectedProductID;
    };

    if (!extended && product.product) {
      return (
        <>
          {product?.product?.product_type == "config"
            ? renderAssociativeProduct()
            : null}

          <div className="ps-product__shopping">
            <figure>
              <figcaption>Quantity</figcaption>
              <div className="form-group--number">
                <button
                  className="up"
                  onClick={(e) => handleIncreaseItemQty(e)}
                >
                  <i className="fa fa-plus"></i>
                </button>
                <button
                  className="down"
                  onClick={(e) => handleDecreaseItemQty(e)}
                >
                  <i className="fa fa-minus"></i>
                </button>
                <input
                  className="form-control"
                  type="text"
                  placeholder={quantity}
                  disabled
                />
              </div>
            </figure>
            <a
              className="ps-btn ps-btn--yellow"
              onClick={(e) => handleAddItemToCart(e)}
            >
              {loading1 ? <CircularProgress size={20} /> : "Add to cart1"}
            </a>
            <a className="ps-btn ps-btn--blu" onClick={(e) => handleBuynow(e)}>
              {loading2 ? <CircularProgress size={20} /> : "Buy Now"}
            </a>
            <div className="ps-product__actions">
              <a>
                {loading3 ? (
                  <CircularProgress size={20} />
                ) : (
                  product.product.in_wishlist == 0 && (
                    <FavoriteBorder
                      color={"inherit"}
                      fontSize="large"
                      onClick={(e) => handleAddItemToWishlist(e)}
                      style={{ cursor: "pointer" }}
                    />
                  )
                )}
                {loading3 ? (
                  <CircularProgress size={20} />
                ) : (
                  product.product.in_wishlist == 1 && (
                    <Favorite
                      color={"secondary"}
                      fontSize="large"
                      onClick={(e) => handleRemoveWishListItem(e)}
                      style={{ cursor: "pointer" }}
                    />
                  )
                )}
              </a>
              {/* <a onClick={(e) => handleAddItemToCompare(e)}>
            <AssessmentOutlined
              fontSize="large"
              style={{ cursor: "pointer" }}
            />
          </a> */}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div className="ps-product__shopping extend">
          <div className="ps-product__btn-group">
            <figure>
              <figcaption>Quantity</figcaption>
              <div className="form-group--number">
                <button
                  className="up"
                  onClick={(e) => handleIncreaseItemQty(e)}
                >
                  <i className="fa fa-plus"></i>
                </button>
                <button
                  className="down"
                  onClick={(e) => handleDecreaseItemQty(e)}
                >
                  <i className="fa fa-minus"></i>
                </button>
                <input
                  className="form-control"
                  type="text"
                  placeholder={quantity}
                  disabled
                />
              </div>
            </figure>
            <a
              className="ps-btn ps-btn--black"
              href="#"
              onClick={(e) => handleAddItemToCart(e)}
            >
              Add to cart2
            </a>
            <div className="ps-product__actions">
              <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                <i className="icon-heart"></i>
              </a>
              {/* <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
              <i className="icon-chart-bars"></i>
            </a> */}
            </div>
          </div>
          <a
            className="ps-btn text-white"
            href="#"
            onClick={(e) => handleBuynow(e)}
          >
            Buy Now
          </a>
        </div>
      );
    }
  }
);

// export default connect((state) => state)(ModuleDetailShoppingActions);
export default ModuleDetailShoppingActions;
