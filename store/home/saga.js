import { all, put, takeEvery, call } from "redux-saga/effects";
import { polyfill } from "es6-promise";
import Homeapi from "../../repositories/Homeapi";

import { actionTypes, getHomeSuccess, getHomeError } from "./action";
polyfill();

function* getHomedata({}) {
  try {
    const data = yield call(Homeapi.getHomedata);
    yield put(getHomeSuccess(data));
  } catch (err) {
    yield put(getHomeError(err));
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.GET_HOME_DATA, getHomedata)]);
}
