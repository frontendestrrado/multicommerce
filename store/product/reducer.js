import { actionTypes } from "./action";

export const initialState = {
  allProducts: null,
  singleProduct: null,
  error: false,
  totalProducts: 0,
  categories: null,
  brands: [],
  auctionProduct: {},
  productsLoading: true,
  productLoading: true,
  searchResults: null,
  sellerReviewLength: null,
  productQuantity: 1,
  productBidAmount: 0,
  productIdOfConfig: 0,
  out_of_stock_selling: false,
  stock: 0,
  outerAttrProductId: null,
  outerConfigStock: null,
  outerConfigOutOfstockSell: null,
  subAttrCheck: null,
  shockingsale_wishlist: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_SHOCKINGSALE_WISHLIST:
      return {
        ...state,
        ...{ shockingsale_wishlist: action.payload },
      };
    case actionTypes.OUTER_CONFIG_ATTR_STOCK:
      return {
        ...state,
        ...{ outerConfigStock: action.payload },
      };
    case actionTypes.OUTER_CONFIG_ATTR_OUT_OF_STOCK_SELL:
      return {
        ...state,
        ...{ outerConfigOutOfstockSell: action.payload },
      };
    case actionTypes.SUB_ATTR_CHECK:
      return {
        ...state,
        ...{ subAttrCheck: action.payload },
      };
    case actionTypes.OUTER_ATTR_PRODUCT_ID:
      return {
        ...state,
        ...{ outerAttrProductId: action.payload },
      };
    case actionTypes.PRODUCT_STOCK_OF_CONFIG:
      return {
        ...state,
        ...{ stock: action.payload },
      };
    case actionTypes.PRODUCT_OUT_OF_STOCK_SELLING_OF_CONFIG:
      return {
        ...state,
        ...{ out_of_stock_selling: action.payload },
      };
    case actionTypes.PRODUCT_ID_OF_CONFIG:
      return {
        ...state,
        ...{ productIdOfConfig: action.payload },
      };
    case actionTypes.PRODUCT_BID_AMOUNT:
      return {
        ...state,
        ...{ productBidAmount: action.payload },
      };
    case actionTypes.PRODUCT_QUANTITY_ACTION:
      return {
        ...state,
        ...{ productQuantity: action.payload },
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        ...{ allProducts: action.data, productsLoading: false },
      };
    case actionTypes.GET_TOTAL_OF_PRODUCTS_SUCCESS:
      return {
        ...state,
        ...{ totalProducts: action.payload },
      };
    case actionTypes.GET_BRANDS_SUCCESS:
      return {
        ...state,
        ...{ brands: action.payload },
      };
    case actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS:
      return {
        ...state,
        ...{ categories: action.payload },
      };
    case actionTypes.GET_PRODUCT_BY_ID_SUCCESS:
      return action.data;

    case actionTypes.GET_PRODUCTS_BY_KEYWORD_SUCCESS:
      return {
        ...state,
        ...{ searchResults: action.payload },
      };

    case actionTypes.GET_AUCTION_PRODUCT_BY_AUCTION_ID_SUCCESS:
      return {
        ...state,
        ...{ auctionProduct: action.payload },
      };

    case actionTypes.UPDATE_SELLER_DATA:
      return {
        ...state,
        ...{ sellerReviewLength: action.payload },
      };
    case actionTypes.GET_PRODUCTS_ERROR:
      return {
        ...state,
        ...{ error: action.error },
      };

    default:
      return state;
  }
}

export default reducer;
