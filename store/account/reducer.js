import { initialState } from "../home/reducer";
import { actionTypes } from "./action";

export const initState = {
  orders: [],
  order_detail: null,
  customer_profile: [],
  recent_views: [],
  profile_error: [],
  shipping_info: {},
  customer_address: [],
  customer_chat: [],
  selectedChatID: null,
  selectedSellerID: null,
  customer_messages: {},
  support_token_list: [],
  support_message_from_id: [],
  wallet_details: [],
  auction_cart: {},
  auction_order_list: [],
  country_data: [],
  user_notifications: [],
  user_purchase_years: [],
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_USER_PURCHASE_YEARS_SUCCESS:
      return { ...state, user_purchase_years: action.payload.year };
    case actionTypes.GET_USER_NOTIFICATION_SUCCESS:
      return { ...state, user_notifications: action.payload.notifications };

    case actionTypes.GET_COUNTRY_DATA_SUCCESS:
      return { ...state, country_data: action.payload.country };

    case actionTypes.GET_TOKEN_LIST_SUCCESS:
      return { ...state, support_token_list: action.payload.list };

    case actionTypes.GET_AUCTION_ORDER_LIST_SUCCESS:
      return { ...state, auction_order_list: action.payload.order_list };

    case actionTypes.GET_WALLET_DETAILS_SUCCESS:
      return { ...state, wallet_details: action.payload };

    case actionTypes.GET_AUCTION_CART_DATA_SUCCESS:
      return { ...state, auction_cart: action.payload.auction };

    case actionTypes.GET_SUPPORT_MESSAGE_BY_SUPPORT_ID_SUCCESS:
      return {
        ...state,
        support_message_from_id: action.payload.support_messages,
      };
    case actionTypes.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        order_detail: action.payload.order_detail,
      };
    case actionTypes.SET_CHAT_SELLER_ID:
      return {
        ...state,
        selectedSellerID: action.payload,
      };
    case actionTypes.GET_CUSTOMER_CHAT_LIST_SUCCESS:
      return {
        ...state,
        customer_chat: [...action.payload],
      };
    case actionTypes.GET_CUSTOMER_CHAT_MESSAGE_SUCCESS:
      return {
        ...state,
        customer_messages: { ...action.payload },
      };
    case actionTypes.SET_CUSTOMER_CHAT_ID:
      return {
        ...state,
        selectedChatID: action.payload,
      };
    case actionTypes.GET_CUSTOMER_ADDRESS_SUCCESS:
      return {
        ...state,
        customer_address: [...action.payload.address_list],
      };
    case actionTypes.GET_MY_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload.purchase,
      };
    case actionTypes.GET_CUSTOMER_PROFILE_SUCCESS:
      return {
        ...state,
        customer_profile: { ...action.payload?.profile[0] },
      };
    case actionTypes.UPDATE_CUSTOMER_PROFILE_SUCCESS:
      if (action.payload.httpcode === 401) {
        return {
          ...state,
          // customer_profile: { ...action.payload },
          profile_error: { ...action.payload },
        };
      }
      return {
        ...state,
        // customer_profile: { ...action.payload },
        // profile_error: { ...action.payload },
      };
    case actionTypes.UPDATE_CUSTOMER_PROFILE_ERROR:
      return {
        ...state,
        // customer_profile: { ...action.payload },
        profile_error: { ...action.payload },
      };
    case actionTypes.GET_CUSTOMER_RECENT_VIEWS_SUCCESS:
      return {
        ...state,
        recent_views: [...action.payload.recent_views],
      };
    case actionTypes.CLEAR_CUSTOMER_ACCOUNT_DATA:
      return { ...initState };

    case actionTypes.UPDATE_CUSTOMER_SHIPPING_INFO:
      return {
        ...state,
        shipping_info: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
