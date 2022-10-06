import { all, put, takeEvery } from "redux-saga/effects";
import { actionTypes } from "./action";

function* addProductSaga(payload) {
  const { product } = payload;
  const localCart = JSON.parse(
    localStorage.getItem("persist:Kangtao")
  ).shockingsale;
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.ADD_PRODUCTS, addProductSaga)]);
}
