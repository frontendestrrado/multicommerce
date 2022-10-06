import { all, put, takeEvery, call } from "redux-saga/effects";
import { message, notification } from "antd";
import {
  actionTypes,
  getWishlistListSuccess,
  updateWishlistListSuccess,
  getWishlistList,
  clearWishlist,
} from "./action";
import Axios from "axios";
import { apibaseurl } from "~/repositories/Repository";
import ProductRepository from "~/repositories/ProductRepository";
import WishlistRepository from "~/repositories/WishlistRepository";
import { getProductsById, updateShockingsaleWishlist } from "../product/action";

const modalSuccess = (type) => {
  notification[type]({
    message: "Added to wishlisht!",
    description: "This product has been added to wishlist!",
  });
};

const modalWarning = (type, message, description) => {
  notification[type]({
    message: "Removed from wishlist",
    description: "This product has been removed from wishlist!",
  });
};

const modalRemoveWarning = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

const modalShow = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

function* getWishlistListSaga() {
  try {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;
    let lang_id = 1;
    let payload = {
      access_token,
      lang_id,
    };

    const responseData = yield call(
      WishlistRepository.getProductToWishlist,
      payload
    );

    yield put(
      responseData?.httpcode == "200" &&
        getWishlistListSuccess(responseData.data)
    );
  } catch (err) {
    console.log(err);
  }
}

function* addItemToWishlistSaga({ product }) {
  try {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;
    let payload = {
      access_token,
      product_id: product,
      type: "web",
    };

    const responseData = yield call(
      WishlistRepository.addProductToWishList,
      payload
    );
    modalShow(
      responseData.status,
      responseData.message,
      responseData.data.message
    );
    yield put(getWishlistList());
    yield put(getProductsById(product));
  } catch (err) {
    console.log(err);
  }
}

function* removeItemWishlistSaga({ product }) {
  try {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;
    let payload = {
      access_token,
      product_id: product,
    };
    const responseData = yield call(
      WishlistRepository.removeProductFromWishList,
      payload
    );
    modalRemoveWarning(
      "warning",
      responseData.message,
      responseData.data.message
    );
    yield put(getWishlistList());

    yield put(getProductsById(product));
  } catch (err) {
    console.log(err);
  }
}

function* clearWishlistListSaga() {
  try {
    const emptyCart = {
      wishlistItems: [],
      wishlistTotal: 0,
    };
    yield put(updateWishlistListSuccess(emptyCart));
  } catch (err) {
    console.log(err);
  }
}
function* addShockingSaleItemToWishlistSaga({ product }) {
  try {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;
    let payload = {
      access_token,
      product_id: product,
      type: "web",
    };

    const responseData = yield call(
      WishlistRepository.addProductToWishList,
      payload
    );
    modalShow(
      responseData.status,
      responseData.message,
      responseData.data.message
    );
    yield put(getWishlistList());
    yield put(updateShockingsaleWishlist(true));
  } catch (err) {
    console.log(err);
  }
}

function* removeShockingSaleItemFromWishlistSaga({ product }) {
  try {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;
    let payload = {
      access_token,
      product_id: product,
    };
    const responseData = yield call(
      WishlistRepository.removeProductFromWishList,
      payload
    );
    modalRemoveWarning(
      "warning",
      responseData.message,
      responseData.data.message
    );
    yield put(getWishlistList());
    yield put(updateShockingsaleWishlist(false));
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.GET_WISHLIST_LIST, getWishlistListSaga)]);
  yield all([takeEvery(actionTypes.ADD_ITEM_WISHLISH, addItemToWishlistSaga)]);
  yield all([
    takeEvery(actionTypes.REMOVE_ITEM_WISHLISH, removeItemWishlistSaga),
  ]);
  yield all([
    takeEvery(
      actionTypes.ADD_SHOCKING_SALE_ITEM_TO_WISHLIST,
      addShockingSaleItemToWishlistSaga
    ),
  ]);
  yield all([
    takeEvery(
      actionTypes.REMOVE_SHOCKING_SALE_ITEM_FROM_WISHLIST,
      removeShockingSaleItemFromWishlistSaga
    ),
  ]);
}
