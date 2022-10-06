export const actionTypes = {
  GET_MY_ORDERS: "GET_MY_ORDERS",
  GET_MY_ORDERS_SUCCESS: "GET_MY_ORDERS_SUCCESS",

  GET_ORDER_DETAILS: "GET_ORDER_DETAILS",
  GET_ORDER_DETAILS_SUCCESS: "GET_ORDER_DETAILS_SUCCESS",

  GET_CUSTOMER_PROFILE: "GET_CUSTOMER_PROFILE",
  GET_CUSTOMER_PROFILE_SUCCESS: "GET_CUSTOMER_PROFILE_SUCCESS",

  UPDATE_CUSTOMER_PROFILE: "UPDATE_CUSTOMER_PROFILE",
  UPDATE_CUSTOMER_PROFILE_SUCCESS: "UPDATE_CUSTOMER_PROFILE_SUCCESS",
  UPDATE_CUSTOMER_PROFILE_ERROR: "UPDATE_CUSTOMER_PROFILE_ERROR",

  GET_CUSTOMER_RECENT_VIEWS: "GET_CUSTOMER_RECENT_VIEWS",
  GET_CUSTOMER_RECENT_VIEWS_SUCCESS: "GET_CUSTOMER_RECENT_VIEWS_SUCCESS",

  UPDATE_CUSTOMER_SHIPPING_INFO: "UPDATE_CUSTOMER_SHIPPING_INFO",

  GET_CUSTOMER_ADDRESS: "GET_CUSTOMER_ADDRESS",
  GET_CUSTOMER_ADDRESS_SUCCESS: "GET_CUSTOMER_ADDRESS_SUCCESS",

  ADD_ADDRESS: "ADD_ADDRESS",
  MAKE_DEFAULT_ADDRESS: "MAKE_DEFAULT_ADDRESS",
  DELETE_ADDRESS: "DELETE_ADDRESS",

  CLEAR_CUSTOMER_ACCOUNT_DATA: "CLEAR_CUSTOMER_ACCOUNT_DATA",

  GET_CUSTOMER_CHAT_LIST: "GET_CUSTOMER_CHAT_LIST",
  GET_CUSTOMER_CHAT_LIST_SUCCESS: "GET_CUSTOMER_CHAT_LIST_SUCCESS",

  GET_CUSTOMER_CHAT_MESSAGE: "GET_CUSTOMER_CHAT_MESSAGE",
  GET_CUSTOMER_CHAT_MESSAGE_SUCCESS: "GET_CUSTOMER_CHAT_MESSAGE_SUCCESS",

  SET_CUSTOMER_CHAT_ID: "SET_CUSTOMER_CHAT_ID",
  SET_CHAT_SELLER_ID: "SET_CHAT_SELLER_ID",

  SEND_MESSAGE_TO_SELLER: "SEND_MESSAGE_TO_SELLER",

  GET_NEW_SELLER_CHATS: "GET_NEW_SELLER_CHAT",

  MAKE_CANCEL_ORDER_REQUEST: "MAKE_CANCEL_ORDER_REQUEST",

  GET_TOKEN_LIST: "GET_TOKEN_LIST",
  GET_TOKEN_LIST_SUCCESS: "GET_TOKEN_LIST_SUCCESS",

  GET_SUPPORT_MESSAGE_BY_SUPPORT_ID: "GET_SUPPORT_MESSAGE_BY_SUPPORT_ID",
  GET_SUPPORT_MESSAGE_BY_SUPPORT_ID_SUCCESS:
    "GET_SUPPORT_MESSAGE_BY_SUPPORT_ID_SUCCESS",

  GET_WALLET_DETAILS: "GET_WALLET_DETAILS",
  GET_WALLET_DETAILS_SUCCESS: "GET_WALLET_DETAILS_SUCCESS",
  GET_WALLET_DETAILS_ERROR: "GET_WALLET_DETAILS_ERROR",

  GET_AUCTION_CART_DATA: "GET_AUCTION_CART_DATA",
  GET_AUCTION_CART_DATA_SUCCESS: "GET_AUCTION_CART_DATA_SUCCESS",

  GET_AUCTION_ORDER_LIST: "GET_AUCTION_ORDER_LIST",
  GET_AUCTION_ORDER_LIST_SUCCESS: "GET_AUCTION_ORDER_LIST_SUCCESS",

  GET_COUNTRY_DATA: "GET_COUNTRY_DATA",
  GET_COUNTRY_DATA_SUCCESS: "GET_COUNTRY_DATA_SUCCESS",

  GET_USER_NOTIFICATION: "GET_USER_NOTIFICATION",
  GET_USER_NOTIFICATION_SUCCESS: "GET_USER_NOTIFICATION_SUCCESS",

  GET_USER_PURCHASE_YEARS: "GET_USER_PURCHASE_YEARS",
  GET_USER_PURCHASE_YEARS_SUCCESS: "GET_USER_PURCHASE_YEARS_SUCCESS",
};

export function getUserPurchaseYear(payload) {
  return { type: actionTypes.GET_USER_PURCHASE_YEARS, payload };
}

export function getUserPurchaseYearSuccess(payload) {
  return { type: actionTypes.GET_USER_PURCHASE_YEARS_SUCCESS, payload };
}

export function getUserNotifications(payload) {
  return { type: actionTypes.GET_USER_NOTIFICATION, payload };
}

export function getUserNotificationsSuccess(payload) {
  return { type: actionTypes.GET_USER_NOTIFICATION_SUCCESS, payload };
}

export function getCountryData() {
  return { type: actionTypes.GET_COUNTRY_DATA };
}

export function getCountryDataSuccess(payload) {
  return { type: actionTypes.GET_COUNTRY_DATA_SUCCESS, payload };
}

export function getAuctionOrderList(payload) {
  return { type: actionTypes.GET_AUCTION_ORDER_LIST, payload };
}

export function getAuctionOrderListSuccess(payload) {
  return { type: actionTypes.GET_AUCTION_ORDER_LIST_SUCCESS, payload };
}

export function getAuctionCartData(payload) {
  return { type: actionTypes.GET_AUCTION_CART_DATA, payload };
}

export function getAuctionCartDataSuccess(payload) {
  return { type: actionTypes.GET_AUCTION_CART_DATA_SUCCESS, payload };
}

export function getWalletDetails(payload) {
  return { type: actionTypes.GET_WALLET_DETAILS, payload };
}

export function getWalletDetailsSuccess(payload) {
  return { type: actionTypes.GET_WALLET_DETAILS_SUCCESS, payload };
}

export function getWalletDetailsError(payload) {
  return { type: actionTypes.GET_WALLET_DETAILS_ERROR, payload };
}

export function getSupportMessagefromSupportId(payload) {
  return { type: actionTypes.GET_SUPPORT_MESSAGE_BY_SUPPORT_ID, payload };
}

export function getSupportMessagefromSupportIdSuccess(payload) {
  return {
    type: actionTypes.GET_SUPPORT_MESSAGE_BY_SUPPORT_ID_SUCCESS,
    payload,
  };
}

export function getTokenList(payload) {
  return { type: actionTypes.GET_TOKEN_LIST, payload };
}

export function getTokenListSuccess(payload) {
  return { type: actionTypes.GET_TOKEN_LIST_SUCCESS, payload };
}

export function cancelOrderRequest(payload) {
  return { type: actionTypes.MAKE_CANCEL_ORDER_REQUEST, payload };
}

export function getOrderDetails(payload) {
  return { type: actionTypes.GET_ORDER_DETAILS, payload };
}

export function getOrderDetailsSuccess(payload) {
  return { type: actionTypes.GET_ORDER_DETAILS_SUCCESS, payload };
}

export function getNewSellerChats(payload) {
  return { type: actionTypes.GET_NEW_SELLER_CHATS, payload };
}

export function sendMessageToSeller(payload) {
  return { type: actionTypes.SEND_MESSAGE_TO_SELLER, payload };
}

export function setChatSellerId(payload) {
  return { type: actionTypes.SET_CHAT_SELLER_ID, payload };
}

export function getCustomerChatMessage(payload) {
  return { type: actionTypes.GET_CUSTOMER_CHAT_MESSAGE, payload };
}

export function getCustomerChatMessageSuccess(payload) {
  return { type: actionTypes.GET_CUSTOMER_CHAT_MESSAGE_SUCCESS, payload };
}

export function setCustomerChatId(payload) {
  return { type: actionTypes.SET_CUSTOMER_CHAT_ID, payload };
}

export function getCustomerChatList(payload) {
  return { type: actionTypes.GET_CUSTOMER_CHAT_LIST, payload };
}

export function getCustomerChatListSuccess(payload) {
  return { type: actionTypes.GET_CUSTOMER_CHAT_LIST_SUCCESS, payload };
}

export function addAddress(payload) {
  return { type: actionTypes.ADD_ADDRESS, payload };
}

export function deleteAddress(payload) {
  return { type: actionTypes.DELETE_ADDRESS, payload };
}

export function makeDefaultAddress(payload) {
  return { type: actionTypes.MAKE_DEFAULT_ADDRESS, payload };
}

export function getCustomerAddress() {
  return { type: actionTypes.GET_CUSTOMER_ADDRESS };
}

export function getCustomerAddressSuccess(payload) {
  return { type: actionTypes.GET_CUSTOMER_ADDRESS_SUCCESS, payload };
}

export function updateCustomerShippingInfo(payload) {
  return { type: actionTypes.UPDATE_CUSTOMER_SHIPPING_INFO, payload };
}

export function getCustomerRecentViews(payload) {
  return { type: actionTypes.GET_CUSTOMER_RECENT_VIEWS, payload };
}

export function getCustomerRecentViewsSuccess(payload) {
  return { type: actionTypes.GET_CUSTOMER_RECENT_VIEWS_SUCCESS, payload };
}

export function getMyOrders(payload) {
  return { type: actionTypes.GET_MY_ORDERS, payload };
}

export function getMyOrdersSuccess(payload) {
  return { type: actionTypes.GET_MY_ORDERS_SUCCESS, payload };
}

export function getCustomerProfile(payload) {
  return { type: actionTypes.GET_CUSTOMER_PROFILE, payload };
}

export function getCustomerProfileSuccess(payload) {
  return { type: actionTypes.GET_CUSTOMER_PROFILE_SUCCESS, payload };
}

export function updateCustomerProfile(payload) {
  return { type: actionTypes.UPDATE_CUSTOMER_PROFILE, payload };
}

export function updateCustomerProfileSuccess(payload) {
  return { type: actionTypes.UPDATE_CUSTOMER_PROFILE, payload };
}

export function updateCustomerProfileError(payload) {
  return { type: actionTypes.UPDATE_CUSTOMER_PROFILE_ERROR, payload };
}

export function clearCustomer() {
  return { type: actionTypes.CLEAR_CUSTOMER_ACCOUNT_DATA };
}
