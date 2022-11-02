import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  setOuterAttrProductId,
  setOuterConfigAttrOutOfStockSell,
  setOuterConfigAttrStock,
  setProductQuantityAction,
  setSubAttrCheckConfigProduct,
} from "~/store/product/action";
import { addItem } from "~/store/cart/action";
import { addItemToCompare } from "~/store/compare/action";
import {
  addItemToWishlist,
  getWishlistList,
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

const ModuleVarientShoppingActions = React.memo(
  ({ product, extended = false }) => {
    const dispatch = useDispatch();
    const Router = useRouter();

    //States
    const [quantity, setQuantity] = useState(1);
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);

    const [associativeProd, setAssociativeProd] = useState([]);
    const [uniqueAssociativeProd, setUniqueAssociativeProd] = useState([]);

    const [subAttrCheck, setSubAttrCheck] = useState(null);
    const [filterAssocProd, setFilterAssocProd] = useState({
      assocVal: "",
      assocValSel: "",
      assocValSize: "",
      assocValSizeSel: "",
      assocProdId: "",
    });

    const [nonSubAttrPrices, setNonSubAttrPrices] = useState({
      sale_price: false,
      actual_price: 0,
    });

    //Selector
    const auth = useSelector((state) => state.auth);
    const { outerConfigStock, outerConfigOutOfstockSell, outerAttrProductId } =
      useSelector((state) => state.product);

    //Effects
    useEffect(() => {
      console.log("vvvvvvvvvvvvvvvv...........",product)
      setAssociativeProd(product?.varaiants_list);
      let arrayVals = [
        ...new Map(
          product?.varaiants_list?.map((item) => [
            item["combination"],
            item,
          ])
        ).values(),
      ];
      console.log("vvvvvvvvvvvvvvvv.......arrayVals....",arrayVals)
      setUniqueAssociativeProd(arrayVals);
    }, [product]);

    useEffect(() => {
      let isMounted = true;

      if (isMounted) {
        if (filterAssocProd.assocValSel) {
          const attributes = associativeProd?.filter(
            (prod) => prod.attr_value == filterAssocProd.assocValSel
          )[0];

          setSubAttrCheck(attributes?.sub_attributes?.length);

          if (attributes?.sub_attributes?.length == 0) {
            dispatch(
              setSubAttrCheckConfigProduct(attributes?.sub_attributes?.length)
            );
            dispatch(setOuterAttrProductId(attributes?.product_id));
            dispatch(setOuterConfigAttrStock(attributes?.stock));
            dispatch(
              setOuterConfigAttrOutOfStockSell(attributes?.out_of_stock_selling)
            );
            dispatch(setConfigProductID(attributes?.product_id));
            setFilterAssocProd({
              ...filterAssocProd,
              assocValSizeSel: filterAssocProd.assocValSel,
            });
          } else if (attributes?.sub_attributes?.length > 0) {
            dispatch(
              setSubAttrCheckConfigProduct(attributes?.sub_attributes?.length)
            );
          }
        }
      }

      return () => {
        isMounted = false;
      };
    }, [filterAssocProd.assocValSel]);

    // Memos

    useMemo(() => {
      if (subAttrCheck == 0) {
        const { sale_price, actual_price } = associativeProd?.filter(
          (prod) => prod.attr_value == filterAssocProd.assocValSel
        )[0];
        setNonSubAttrPrices({ sale_price, actual_price });
      }
    }, [subAttrCheck]);

    //Methods

    const makePayload = (token) => {
      let payload = {
        user_id: 1,
        quantity: quantity,
        cart_type: "web",
        access_token: token,
      };

      if (product?.product?.product_type == "config") {
        if (subAttrCheck == 0) {
          payload = {
            ...payload,
            product_id: outerAttrProductId,
          };

          if (outerConfigOutOfstockSell === false && outerConfigStock <= 0) {
            notification["error"]({
              message: "Error",
              description: "Product Out of Stock!",
              duration: 2,
            });
            setLoading1(false);
            return false;
          }
        } else if (subAttrCheck > 0) {
          payload = {
            ...payload,
            product_id: getProductId(filterAssocProd.assocValSizeSel),
          };
          const { out_of_stock_selling, stock } = getOutOfstockValueConfigProd(
            filterAssocProd.assocValSizeSel
          );

          if (out_of_stock_selling == false && stock <= 0) {
            notification["error"]({
              message: "Error",
              description: "Product Out of Stock!",
              duration: 2,
            });
            setLoading1(false);
            return false;
          }
        } else {
          notification["error"]({
            message: "Error",
            description: "Valid Varient Not Selected!",
            duration: 2,
          });
        }

        //condition for config end
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
          setLoading1(false);

          return false;
        }
      }
      setLoading1(false);

      return payload;
    };

    const handleAddItemToCart = async (e) => {
      console.log("....a............",product)
      console.log("....b............",filterAssocProd)
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
      } else if (
        product?.product?.product_type == "config" &&
        (filterAssocProd.assocValSel == "" ||
          filterAssocProd.assocValSizeSel == "")
      ) {
        notification["error"]({
          message: "Error",
          description: "Please Select Varient 1",
          duration: 1,
        });
        return false;
      } else {
        setLoading1(true);
        let payload = makePayload(token);

        if (payload) {
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
            return false;
          } else {
            notification["error"]({
              message: "Error",
              description: responseData.message,
              duration: 1,
            });
            setLoading1(false);
          }
        } else {
          return false;
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
          description: "Please Select Varient 2",
          duration: 1,
        });
        return false;
      } else {
        setLoading2(true);
        let payload = makePayload(auth.access_token);

        if (payload) {
          const responseData = await ProductRepository.addProductToCart(
            payload
          );

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
          }
        } else {
          setLoading2(false);
        }
      }
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
        dispatch(addItemToWishlist(product.product.product_id));
        dispatch(getProductsById(product.product.product_id));
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
        dispatch(removeWishlistItem(product.product.product_id));
        dispatch(getProductsById(product.product.product_id));
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

    const handleChangeAttr = (e) => {
      setFilterAssocProd({ ...filterAssocProd, assocValSel: e.target.value });
      setTimeout(() => {
        if (subAttrCheck > 0) {
          getProductId(filterAssocProd.assocValSizeSel);
        } else if (subAttrCheck == 0) {
          // console.log("hello");
        }
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

    const renderPrice = () => {
      const { sale_price, actual_price } = associativeProd
        ?.filter((prod) => prod.attr_value == filterAssocProd.assocValSel)
        ?.map((attr) => attr.sub_attributes[0])
        ?.filter(
          (attr) => attr.attr_value == filterAssocProd.assocValSizeSel
        )[0];

      if (sale_price !== false) {
        return sale_price;
      } else {
        return actual_price;
      }
    };

    const getOutOfstockValueConfigProd = (sizeValue) => {
      if (subAttrCheck == 0) {
        const { out_of_stock_selling, stock } = associativeProd?.filter(
          (prod) => prod.attr_value == filterAssocProd.assocValSel
        )[0];
        return { stock, out_of_stock_selling };
      } else if (subAttrCheck > 0) {
        const { out_of_stock_selling, stock } = associativeProd
          ?.filter((prod) => prod.attr_value == filterAssocProd.assocValSel)
          ?.map((attr) => attr.sub_attributes[0])
          ?.filter((attr) => attr.attr_value == sizeValue)[0];
        return { stock, out_of_stock_selling };
      } else {
        return null;
      }
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
                  {associativeProd[0]?.combination}
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
                          value={attr.combination}
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
              {filterAssocProd.assocValSel && subAttrCheck > 0 ? (
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
                            <Radio.Button value={values.combination} key={index}>
                              {values.combination}
                            </Radio.Button>
                          );
                        })}
                    </Radio.Group>
                  </td>
                </tr>
              ) : null}

              {subAttrCheck > 0 && filterAssocProd.assocValSizeSel ? (
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

              {filterAssocProd.assocValSel && subAttrCheck == 0 ? (
                <tr
                  className={
                    nonSubAttrPrices.actual_price !== undefined ? `` : `d-none`
                  }
                >
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
                      {nonSubAttrPrices.sale_price == false ? (
                        currencyHelperConvertToRinggit(
                          nonSubAttrPrices.actual_price
                        )
                      ) : (
                        <>
                          {currencyHelperConvertToRinggit(
                            nonSubAttrPrices.sale_price
                          )}
                          <del className="ml-2">
                            {currencyHelperConvertToRinggit(
                              nonSubAttrPrices.actual_price
                            )}
                          </del>
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      );
    };

    if (!extended) {
      return (
        <>
          {product?.product?.product_type?.toLowerCase() == "config"
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
              className="ps-btn ps-btn--black"
              onClick={(e) => handleAddItemToCart(e)}
            >
              {loading1 ? <CircularProgress size={20} /> : "Add to cart7"}
            </a>
            <a className="ps-btn text-white" onClick={(e) => handleBuynow(e)}>
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
              Add to cart8
            </a>
            <div className="ps-product__actions">
              <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                <i className="icon-heart"></i>
              </a>
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

export default ModuleVarientShoppingActions;
