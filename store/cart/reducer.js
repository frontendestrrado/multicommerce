import { actionTypes } from "./action";

export const initCart = {
  cartItems: [],
  amount: 0,
  cart: [],
  selectedAddress: {},
  platformVouchers: [],
  total_discount: 0,
  applied_voucher: [],
  applied_platform_voucher: {},
  grandTotalWithDiscount: 0,
  seller_wise_discount: [],
  seller_wise_messages: [],
  used_wallet_amount_detail: { wallet_used: false },
  selected_payment_option_by_user: {},
};

function reducer(state = initCart, action) {
  switch (action.type) {
    case actionTypes.SELECTED_PAYMENT_OPTION_BY_USER: {
      return {
        ...state,
        ...{
          selected_payment_option_by_user: action.payload,
        },
      };
    }
    case actionTypes.SELLER_WISE_DISCOUNT: {
      return {
        ...state,
        ...{ seller_wise_discount: action.payload },
      };
    }
    case actionTypes.USED_WALLET_AMOUNT: {
      return {
        ...state,
        ...{ used_wallet_amount_detail: action.payload },
      };
    }
    case actionTypes.SELLER_WISE_MESSAGES: {
      return {
        ...state,
        ...{ seller_wise_messages: action.payload },
      };
    }
    case actionTypes.APPLIED_SELLER_VOUCHER:
      return {
        ...state,
        // ...{ applied_voucher: [...state.applied_voucher, action.payload] },
        ...{ applied_voucher: action.payload },
      };
    case actionTypes.GRAND_TOTAL_WITH_DISCOUNT_VALUE:
      return {
        ...state,
        ...{ grandTotalWithDiscount: action.payload },
      };
    case actionTypes.APPLIED_PLATFORM_VOUCHER:
      return {
        ...state,
        ...{ applied_platform_voucher: { ...action.payload } },
      };
    case actionTypes.TOTAL_DISCOUNT:
      return {
        ...state,
        ...{ total_discount: action.payload },
      };
    case actionTypes.GET_CART_SUCCESS:
      return {
        ...state,
        ...{ cart: action.payload },
      };
    case actionTypes.UPDATE_CART_SUCCESS:
      return {
        ...state,
        ...{ cartItems: action.payload.cartItems },
        ...{ amount: action.payload.amount },
        ...{ cartTotal: action.payload.cartTotal },
      };
    case actionTypes.CLEAR_CART_SUCCESS:
      return {
        ...initCart,
      };
    case actionTypes.GET_CART_ERROR:
      return { ...initCart };
    case actionTypes.UPDATE_CART_ERROR:
      return {
        ...state,
        ...{ error: action.error },
      };
    case actionTypes.UPDATE_SELECTED_ADDRESS:
      return {
        ...state,
        ...{ selectedAddress: action.payload },
      };
    case actionTypes.FETCH_PLATFORM_VOUCHER_SUCCESS:
      return {
        ...state,
        ...{ platformVouchers: [...action.payload] },
      };
    default:
      return state;
  }
}

export default reducer;
