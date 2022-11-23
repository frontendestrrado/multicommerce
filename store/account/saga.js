import { useDispatch } from "react-redux";
import { all, put, takeEvery, call } from "redux-saga/effects";
import AccountRepository from "~/repositories/AccountRepository";
import { notification, message } from "antd";
import router from "next/router";

import {
  actionTypes,
  getCustomerProfileSuccess,
  updateCustomerProfileSuccess,
  getCustomerRecentViewsSuccess,
  getCustomerAddressSuccess,
  getCustomerAddress,
  getCustomerChatListSuccess,
  getCustomerChatMessageSuccess,
  getMyOrdersSuccess,
  getOrderDetailsSuccess,
  getMyOrders,
  getTokenListSuccess,
  getSupportMessagefromSupportIdSuccess,
  getWalletDetailsSuccess,
  getAuctionCartDataSuccess,
  getAuctionOrderListSuccess,
  getCountryDataSuccess,
  getUserNotificationsSuccess,
  getCustomerChatMessage,
  getUserPurchaseYearSuccess,
} from "./action";
import { logOut } from "../auth/action";

const modalSuccess = (type) => {
  notification[type]({
    message: "Wellcome",
    description: "You are logged in successfully!",
  });
};
const modalOpen = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

function* getMyOrdersSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.getMyOrders, payload);
    yield put(response.httpcode == 200 && getMyOrdersSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getCustomerProfile({ payload }) {
  try {
    const response = yield call(
      AccountRepository.getCustomerProfileDetail,
      payload
    );

    if (response.httpcode == 401) {
      message.error("Invalid Access Token! Login Again");
      router.push("/account/login");
      yield put(logOut());
    }
    if (response.httpcode == 200) {
      yield put(getCustomerProfileSuccess(response.data));
    }
  } catch (err) {
    console.log(err);
  }
}

function* updateCustomerProfile({ payload }) {
  try {
    const response = yield call(
      AccountRepository.updateCustomerProfileDetail,
      payload
    );

    if (response.httpcode == 401) {
      message.error("Invalid Access Token! Login Again");
    }

    if (response.httpcode == 200 && response.data.success) {
      message.success("Profile updated successfully!");
    }

    if (response.error) {
      response.error.map((error) => {
        notification["error"]({
          message: error,
        });
      });
    }
    yield put(getCustomerProfile());
    yield put(updateCustomerProfileSuccess(response));
  } catch (err) {
    console.log(err);
  }
}

function* getCustomerRecentViewsSlug({ payload }) {
  try {
    const response = yield call(
      AccountRepository.getCustomerRecentViews,
      payload
    );
    yield put(getCustomerRecentViewsSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getCustomerAddressSlug() {
  try {
    const response = yield call(AccountRepository.getCustomerAddresses);
    yield put(getCustomerAddressSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* makeDefaultAddressSaga({ payload }) {
  try {
    const response = yield call(
      AccountRepository.makeDefaultAddresses,
      payload
    );
    if (response.httpcode == "200") {
      message.success(response.data.message);
    } else {
      message.error("Error Updating Default Address!");
    }
    yield put(getCustomerAddress());
  } catch (err) {
    console.log(err);
  }
}

function* deleteAddressSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.deleteAddress, payload);
    if (response.httpcode == "200") {
      message.success(response.data.message);
    } else {
      message.error("Error Deleting Address!");
    }
    yield put(getCustomerAddress());
  } catch (err) {
    console.log(err);
  }
}

function* addAddressSaga({ payload }) {
  try {
    // const response = yield call(AccountRepository.addAddress, payload);
    // if (response.httpcode == "200") {
    //   message.success(response.data.message);
    // } else {
    //   message.error("Error Updating Address!");
    // }
    yield put(getCustomerAddress());
  } catch (err) {
    console.log(err);
  }
}

function* getChatListSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.getChatList, payload);
    if (response.httpcode == "200") {
    } else {
      message.error("Error While Fetching Chats!");
    }

    yield put(getCustomerChatListSuccess(response.data.list));
  } catch (err) {
    console.log(err);
  }
}

function* getCustomerChatMessageSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.getChatMessage, payload);
    if (response.httpcode == "200") {
    } else {
      message.error("Error While Fetching Chats!");
    }
    yield put(getCustomerChatMessageSuccess(response.data.messages));
  } catch (err) {
    console.log(err);
  }
}

function* sendMessageToSellerSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.sendMessage, payload);
    if (response.httpcode == "200") {
    } else {
      message.error("Error While Sending Message!");
    }
    // yield put(getCustomerChatMessageSuccess(response.data.messages));
  } catch (err) {
    console.log(err);
  }
}

function* getOrderDetailsSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.getOrderDetails, payload);
    console.log(".....uuuuu.....1111......",response)
    if (response.httpcode == "200") {
    } else {
      message.error(response.message);
    }
    yield put(getOrderDetailsSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* cancelOrderRequestSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.cancelOrderRequest, payload);
    let data_payload = {
      access_token: payload.access_token,
      lang_id:localStorage.getItem("langId"),
    };
    yield put(getMyOrders(data_payload));
  } catch (err) {
    console.log(err);
  }
}

function* getTokenListSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.listSupportToken, payload);
    yield put(getTokenListSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getSupportMessageSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.supportMessageByID, payload);
    yield put(getSupportMessagefromSupportIdSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getUserWalletDetails({ payload }) {
  try {
    const response = yield call(AccountRepository.getWalletDetails, payload);

    yield put(getWalletDetailsSuccess(response.data));
  } catch (err) {
    modalOpen("error", "Error", "Error While Fetching Wallet Data");
    console.log(err);
  }
}

function* getAuctionDataSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.getAuctionCartData, payload);
    yield put(getAuctionCartDataSuccess(response.data));
  } catch (err) {
    modalOpen("error", "Error", "Error While Fetching Auction Data");
    console.log(err);
  }
}

function* getAuctionOrderListSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.getAuctionOrderList, payload);
    yield put(getAuctionOrderListSuccess(response.data));
  } catch (err) {
    modalOpen("error", "Error", "Error While Fetching Auction Data");
    console.log(err);
  }
}

function* getCountryDataSaga() {
  try {
    const response = yield call(AccountRepository.getCountry);
    yield put(getCountryDataSuccess(response));
  } catch (err) {
    modalOpen("error", "Error", "Error While Fetching Country Data");
    console.log(err);
  }
}

function* getUserNotificationSaga({ payload }) {
  try {
    const response = yield call(AccountRepository.getUserNotification, payload);
    yield put(getUserNotificationsSuccess(response.data));
  } catch (err) {
    modalOpen("error", "Error", "Error While Fetching Notifications");
  }
}

function* getPurchaseYear({ payload }) {
  try {
    const response = yield call(
      AccountRepository.getUserPurchaseYears,
      payload
    );
    yield put(
      response.httpcode == 200 && getUserPurchaseYearSuccess(response.data)
    );
  } catch (err) {
    modalOpen("error", "Error", "Error While Fetching Years!");
  }
}

export default function* rootSaga() {
  // yield all([
  //   takeEvery(actionTypes.GET_NEW_SELLER_CHATS, getNewSellerChatsSaga),
  // ]);
  yield all([
    takeEvery(
      actionTypes.GET_CUSTOMER_CHAT_MESSAGE,
      getCustomerChatMessageSaga
    ),
  ]);
  yield all([
    takeEvery(actionTypes.SEND_MESSAGE_TO_SELLER, sendMessageToSellerSaga),
  ]);
  yield all([takeEvery(actionTypes.GET_CUSTOMER_CHAT_LIST, getChatListSaga)]);
  yield all([takeEvery(actionTypes.GET_MY_ORDERS, getMyOrdersSaga)]);
  yield all([takeEvery(actionTypes.GET_CUSTOMER_PROFILE, getCustomerProfile)]);
  yield all([
    takeEvery(actionTypes.UPDATE_CUSTOMER_PROFILE, updateCustomerProfile),
  ]);
  yield all([
    takeEvery(
      actionTypes.GET_CUSTOMER_RECENT_VIEWS,
      getCustomerRecentViewsSlug
    ),
  ]);
  yield all([
    takeEvery(actionTypes.GET_CUSTOMER_ADDRESS, getCustomerAddressSlug),
  ]);
  yield all([
    takeEvery(actionTypes.MAKE_DEFAULT_ADDRESS, makeDefaultAddressSaga),
  ]);
  yield all([takeEvery(actionTypes.ADD_ADDRESS, addAddressSaga)]);
  yield all([takeEvery(actionTypes.DELETE_ADDRESS, deleteAddressSaga)]);
  yield all([takeEvery(actionTypes.GET_ORDER_DETAILS, getOrderDetailsSaga)]);
  yield all([
    takeEvery(actionTypes.MAKE_CANCEL_ORDER_REQUEST, cancelOrderRequestSaga),
  ]);
  yield all([takeEvery(actionTypes.GET_TOKEN_LIST, getTokenListSaga)]);
  yield all([
    takeEvery(
      actionTypes.GET_SUPPORT_MESSAGE_BY_SUPPORT_ID,
      getSupportMessageSaga
    ),
  ]);
  yield all([takeEvery(actionTypes.GET_WALLET_DETAILS, getUserWalletDetails)]);
  yield all([takeEvery(actionTypes.GET_AUCTION_CART_DATA, getAuctionDataSaga)]);
  yield all([
    takeEvery(actionTypes.GET_AUCTION_ORDER_LIST, getAuctionOrderListSaga),
  ]);
  yield all([takeEvery(actionTypes.GET_COUNTRY_DATA, getCountryDataSaga)]);
  yield all([
    takeEvery(actionTypes.GET_USER_NOTIFICATION, getUserNotificationSaga),
  ]);
  yield all([takeEvery(actionTypes.GET_USER_PURCHASE_YEARS, getPurchaseYear)]);
}
