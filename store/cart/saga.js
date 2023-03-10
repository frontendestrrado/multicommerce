import { all, put, takeEvery, call } from "redux-saga/effects";
import { notification } from "antd";

import {
  actionTypes,
  getCartError,
  getCartSuccess,
  updateCartSuccess,
  updateCartError,
  getCart,
  clearCartSuccess,
  fetchPlatformVoucherActionSuccess,
} from "./action";
import CartRepository from "~/repositories/CartRepository";
import ProductRepository from "~/repositories/ProductRepository";
import { displayNotification } from "~/utilities/common-helpers";

const modalSuccess = (type, message) => {
  notification[type]({
    message,
    description: "This product has been added to your cart!",
    duration: 1,
  });
};
const modalWarning = (type) => {
  notification[type]({
    message: "Remove A Item",
    description: "This product has been removed from your cart!",
    duration: 1,
  });
};

export const calculateAmount = (obj) =>
  Object.values(obj)
    .reduce((acc, { quantity, price }) => acc + quantity * price, 0)
    .toFixed(2);

function* getCartSaga() {
 // alert("bbbbb")
  try {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;
    let lang_id = (localStorage.getItem("langId"));
    let payload = {
      access_token,
      lang_id,
    };
console.log("...getCartSaga..payload...",payload)
    const response = yield call(CartRepository.getCartItem, payload);
    console.log("...getCartSaga..payload...",payload)
    console.log("......abcd.....",response)
    yield put(getCartSuccess(response.data));
  } catch (err) {
    yield put(getCartError(err));
  }
}

function* addItemSaga({ payload }) {

  try {
    const response = yield call(CartRepository.addProductToCart, payload);

    modalSuccess(response.status, response.message);
    yield put(getCart(payload.access_token));
  } catch (err) {
    yield put(getCartError(err));
  }
}

function* removeItemSaga(payload) {
  try {
    const { product } = payload;
    let localCart = JSON.parse(
      JSON.parse(localStorage.getItem("persist:Kangtao")).cart
    );

    let index = localCart.cartItems.findIndex((item) => item.id === product.id);
    localCart.cartTotal = localCart.cartTotal - product.quantity;
    localCart.cartItems.splice(index, 1);
    localCart.amount = calculateAmount(localCart.cartItems);
    if (localCart.cartItems.length === 0) {
      localCart.cartItems = [];
      localCart.amount = 0;
      localCart.cartTotal = 0;
    }
    yield put(updateCartSuccess(localCart));
    modalWarning("warning");
  } catch (err) {
    yield put(getCartError(err));
  }
}

function* increaseQtySaga(payload) {
  try {
    const { product } = payload;
    let localCart = JSON.parse(
      JSON.parse(localStorage.getItem("persist:Kangtao")).cart
    );
    let selectedItem = localCart.cartItems.find(
      (item) => item.id === product.id
    );
    if (selectedItem) {
      selectedItem.quantity++;
      localCart.cartTotal++;
      localCart.amount = calculateAmount(localCart.cartItems);
    }
    yield put(updateCartSuccess(localCart));
  } catch (err) {
    yield put(getCartError(err));
  }
}

function* decreaseItemQtySaga(payload) {
  try {
    const { product } = payload;
    const localCart = JSON.parse(
      JSON.parse(localStorage.getItem("persist:Kangtao")).cart
    );
    let selectedItem = localCart.cartItems.find(
      (item) => item.id === product.id
    );

    if (selectedItem) {
      selectedItem.quantity--;
      localCart.cartTotal--;
      localCart.amount = calculateAmount(localCart.cartItems);
    }
    yield put(updateCartSuccess(localCart));
  } catch (err) {
    yield put(getCartError(err));
  }
}

function* clearCartSaga() {
  try {
    const emptyCart = {
      cartItems: [],
      amount: 0,
      cartTotal: 0,
      cart: [],
    };
    yield put(clearCartSuccess(emptyCart));
  } catch (err) {
    yield put(updateCartError(err));
  }
}

function* fetchPlatformVoucherSaga() {
  try {
    const response = yield call(CartRepository.fetchPlatformVoucher);
    yield put(fetchPlatformVoucherActionSuccess(response.data.coupon));
  } catch (err) {}
}

function* removeFromCartNewSaga({ payload }) {
  try {
    const response = yield call(ProductRepository.deleteCart, payload);
    if (response && response.httpcode == 200) {
      displayNotification("success", "Success", "Product Removed");
    }
    yield put(getCart());
  } catch (err) {
    displayNotification("error", "Error", "Error in removing Item");
  }
}

export default function* rootSaga() {
 // alert("cccc")
  yield all([takeEvery(actionTypes.GET_CART, getCartSaga)]);
  yield all([takeEvery(actionTypes.ADD_ITEM, addItemSaga)]);
  yield all([takeEvery(actionTypes.REMOVE_ITEM, removeItemSaga)]);
  yield all([takeEvery(actionTypes.INCREASE_QTY, increaseQtySaga)]);
  yield all([takeEvery(actionTypes.DECREASE_QTY, decreaseItemQtySaga)]);
  yield all([takeEvery(actionTypes.CLEAR_CART, clearCartSaga)]);
  yield all([
    takeEvery(actionTypes.FETCH_PLATFORM_VOUCHER, fetchPlatformVoucherSaga),
  ]);
  yield all([
    takeEvery(actionTypes.REMOVE_PRODUCT_FROM_CART_NEW, removeFromCartNewSaga),
  ]);
}
