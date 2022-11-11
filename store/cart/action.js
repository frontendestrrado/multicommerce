export const actionTypes = {
  GET_CART: "GET_CART",
  GET_CART_SUCCESS: "GET_CART_SUCCESS",
  GET_CART_ERROR: "GET_CART_ERROR",

  GET_CART_TOTAL_QUANTITY: "GET_CART_TOTAL_QUANTITY",
  GET_CART_TOTAL_QUANTITY_SUCCESS: "GET_CART_TOTAL_QUANTITY_SUCCESS",

  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  REMOVE_PRODUCT_FROM_CART_NEW: "REMOVE_PRODUCT_FROM_CART_NEW",

  CLEAR_CART: "CLEAR_CART",
  CLEAR_CART_SUCCESS: "CLEAR_CART_SUCCESS",
  CLEAR_CART_ERROR: "CLEAR_CART_ERROR",

  INCREASE_QTY: "INCREASE_QTY",
  INCREASE_QTY_SUCCESS: "INCREASE_QTY_SUCCESS",
  INCREASE_QTY_ERROR: "INCREASE_QTY_ERROR",

  DECREASE_QTY: "DECREASE_QTY",
  UPDATE_CART: "UPDATE_CART",

  UPDATE_CART_SUCCESS: "UPDATE_CART_SUCCESS",
  UPDATE_CART_ERROR: "UPDATE_CART_ERROR",

  UPDATE_SELECTED_ADDRESS: "UPDATE_SELECTED_ADDRESS",

  FETCH_PLATFORM_VOUCHER: "FETCH_PLATFORM_VOUCHER",
  FETCH_PLATFORM_VOUCHER_SUCCESS: "FETCH_PLATFORM_VOUCHER_SUCCESS",

  TOTAL_DISCOUNT: "TOTAL_DISCOUNT",

  APPLIED_SELLER_VOUCHER: "APPLIED_SELLER_VOUCHER",

  APPLIED_PLATFORM_VOUCHER: "APPLIED_PLATFORM_VOUCHER",

  GRAND_TOTAL_WITH_DISCOUNT_VALUE: "GRAND_TOTAL_WITH_DISCOUNT_VALUE",

  SELLER_WISE_DISCOUNT: "SELLER_WISE_DISCOUNT",

  SELLER_WISE_MESSAGES: "SELLER_WISEMESSAGES",

  USED_WALLET_AMOUNT: "USED_WALLET_AMOUNT",

  SELECTED_PAYMENT_OPTION_BY_USER: "SELECTED_PAYMENT_OPTION_BY_USER",
};

export function removeProductFromCartNew(payload) {
  return { type: actionTypes.REMOVE_PRODUCT_FROM_CART_NEW, payload };
}

export function selectedPaymentOption(payload) {
  return { type: actionTypes.SELECTED_PAYMENT_OPTION_BY_USER, payload };
}

export function sellerWiseMessage(payload) {
  return { type: actionTypes.SELLER_WISE_MESSAGES, payload };
}

export function usedWalletAmount(payload) {
  return { type: actionTypes.USED_WALLET_AMOUNT, payload };
}

export function sellerWiseDiscount(payload) {
  return { type: actionTypes.SELLER_WISE_DISCOUNT, payload };
}

export function grandTotalWithDiscountValue(payload) {
  return { type: actionTypes.GRAND_TOTAL_WITH_DISCOUNT_VALUE, payload };
}

export function appliedSellerVoucher(payload) {
  return { type: actionTypes.APPLIED_SELLER_VOUCHER, payload };
}

export function appliedPlatformVoucher(payload) {
  return { type: actionTypes.APPLIED_PLATFORM_VOUCHER, payload };
}

export function totalDiscount(payload) {
  return { type: actionTypes.TOTAL_DISCOUNT, payload };
}

export function fetchPlatformVoucherAction() {
  return {
    type: actionTypes.FETCH_PLATFORM_VOUCHER,
  };
}

export function fetchPlatformVoucherActionSuccess(payload) {
  return {
    type: actionTypes.FETCH_PLATFORM_VOUCHER_SUCCESS,
    payload,
  };
}

export function getCart() {
 // alert("getCart")
  return { type: actionTypes.GET_CART };
}

export function getCartSuccess(payload) {
  return {
    type: actionTypes.GET_CART_SUCCESS,
    payload,
  };
}

export function getCartError(error) {
  return {
    type: actionTypes.GET_CART_ERROR,
    error,
  };
}

export function updateSelectedAddress(payload) {
 // alert("call")
  console.log("..555555....",payload)

  return {
    type: actionTypes.UPDATE_SELECTED_ADDRESS,
    payload,
  };
}

export function addItem(payload) {
  return { type: actionTypes.ADD_ITEM, payload };
}

export function removeItem(product) {
  return { type: actionTypes.REMOVE_ITEM, product };
}

export function increaseItemQty(product) {
  return { type: actionTypes.INCREASE_QTY, product };
}

export function decreaseItemQty(product) {
  return { type: actionTypes.DECREASE_QTY, product };
}

export function updateCartSuccess(payload) {
  return {
    type: actionTypes.UPDATE_CART_SUCCESS,
    payload,
  };
}

export function updateCartError(payload) {
  return {
    type: actionTypes.UPDATE_CART_ERROR,
    payload,
  };
}

export function clearCart() {
  return { type: actionTypes.CLEAR_CART };
}

export function clearCartSuccess() {
  return { type: actionTypes.CLEAR_CART_SUCCESS };
}
