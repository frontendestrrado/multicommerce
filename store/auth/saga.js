import { all, put, takeEvery } from "redux-saga/effects";
import { notification } from "antd";

import {
  actionTypes,
  destroySession,
  loginSuccess,
  logOutSuccess,
} from "./action";
import { clearCart, getCart } from "../cart/action";
import { clearWishlist, getWishlistList } from "../wishlist/action";
import { clearCustomer, getCustomerProfile } from "../account/action";

const modalSuccess = (type) => {
  notification[type]({
    message: "Wellcome",
    description: "You are logged in successfully!",
  });
};

const modalWarning = (type) => {
  notification[type]({
    message: "Good bye!",
    description: "Your account has been logged out!",
  });
};

function* loginSaga(data) {
  try {
    yield put(loginSuccess(data));
    yield put(getWishlistList());
    yield put(getCart());
    yield put(getCustomerProfile());
    // modalSuccess("success");
  } catch (err) {
    console.log(err);
  }
}

function* logOutSaga() {
  try {
    yield put(logOutSuccess());
    yield put(destroySession());
    // yield put(clearCart());
    // yield put(clearWishlist());
    // yield put(clearCustomer());
    modalWarning("warning");
  } catch (err) {
    console.log(err);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
  yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
}
