export const actionTypes = {
  GET_PRODUCTS: "GET_PRODUCTS",
  GET_PRODUCTS_SUCCESS: "GET_PRODUCTS_SUCCESS",
  GET_PRODUCTS_ERROR: "GET_PRODUCTS_ERROR",

  GET_PRODUCTS_BY_CATEGORY: "GET_PRODUCTS_BY_CATEGORY",

  GET_PRODUCTS_BY_PRICE_RANGE: "GET_PRODUCTS_BY_PRICE_RANGE",
  GET_PRODUCTS_BY_BRAND: "GET_PRODUCTS_BY_BRAND",

  GET_PRODUCTS_BY_KEYWORD: "GET_PRODUCTS_BY_KEYWORD",
  GET_PRODUCTS_BY_KEYWORD_SUCCESS: "GET_PRODUCTS_BY_KEYWORD_SUCCESS",

  GET_AUCTION_PRODUCT_BY_AUCTION_ID: "GET_AUCTION_PRODUCT_BY_AUCTION_ID",
  GET_AUCTION_PRODUCT_BY_AUCTION_ID_SUCCESS:
    "GET_AUCTION_PRODUCT_BY_AUCTION_ID_SUCCESS",

  GET_PRODUCT_BY_ID: "GET_PRODUCT_BY_ID",
  GET_PRODUCT_BY_ID_SUCCESS: "GET_PRODUCT_BY_ID_SUCCESS",

  GET_TOTAL_OF_PRODUCTS: "GET_TOTAL_OF_PRODUCTS",
  GET_TOTAL_OF_PRODUCTS_SUCCESS: "GET_TOTAL_OF_PRODUCTS_SUCCESS",

  GET_BRANDS: "GET_BRANDS",
  GET_BRANDS_SUCCESS: "GET_BRANDS_SUCCESS",

  GET_PRODUCT_CATEGORIES: "GET_PRODUCT_CATEGORIES",
  GET_PRODUCT_CATEGORIES_SUCCESS: "GET_PRODUCT_CATEGORIES_SUCCESS",

  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
  ADD_PRODUCT_TO_CART_SUCCESS: "ADD_PRODUCT_TO_CART_SUCCESS",
  ADD_PRODUCT_TO_CART_ERROR: "ADD_PRODUCT_TO_CART_ERROR",

  UPDATE_SELLER_DATA: "UPDATE_SELLER_DATA",

  PRODUCT_QUANTITY_ACTION: "PRODUCT_QUANTITY_ACTION",
  PRODUCT_ID_OF_CONFIG: "PRODUCT_ID_OF_CONFIG",

  PRODUCT_STOCK_OF_CONFIG: "PRODUCT_STOCK_OF_CONFIG",
  PRODUCT_OUT_OF_STOCK_SELLING_OF_CONFIG: "PRODUCT_OUT_OF_STOCK_SELLING",

  PRODUCT_BID_AMOUNT: "PRODUCT_BID_AMOUNT",

  SUB_ATTR_CHECK: "SUB_ATTR_CHECK",
  OUTER_ATTR_PRODUCT_ID: "OUTER_ATTR_PRODUCT_ID",

  OUTER_CONFIG_ATTR_STOCK: "OUTER_CONFIG_ATTR_STOCK",
  OUTER_CONFIG_ATTR_OUT_OF_STOCK_SELL: "OUTER_CONFIG_ATTR_OUT_OF_STOCK_SELL",

  UPDATE_SHOCKINGSALE_WISHLIST: "UPDATE_SHOCKINGSALE_WISHLIST",
};

export function updateShockingsaleWishlist(payload) {
  return { type: actionTypes.UPDATE_SHOCKINGSALE_WISHLIST, payload };
}
export function setOuterConfigAttrStock(payload) {
  return { type: actionTypes.OUTER_CONFIG_ATTR_STOCK, payload };
}

export function setOuterConfigAttrOutOfStockSell(payload) {
  return { type: actionTypes.OUTER_CONFIG_ATTR_OUT_OF_STOCK_SELL, payload };
}

export function setOuterAttrProductId(payload) {
  return { type: actionTypes.OUTER_ATTR_PRODUCT_ID, payload };
}

export function setSubAttrCheckConfigProduct(payload) {
  return { type: actionTypes.SUB_ATTR_CHECK, payload };
}

export function setConfigProductStock(payload) {
  return { type: actionTypes.PRODUCT_STOCK_OF_CONFIG, payload };
}

export function setConfigProductOutOfStockSelling(payload) {
  return { type: actionTypes.PRODUCT_OUT_OF_STOCK_SELLING_OF_CONFIG, payload };
}

export function setConfigProductID(payload) {
  return { type: actionTypes.PRODUCT_ID_OF_CONFIG, payload };
}

export function setProductBidAmount(payload) {
  return { type: actionTypes.PRODUCT_BID_AMOUNT, payload };
}

export function setProductQuantityAction(payload) {
  return { type: actionTypes.PRODUCT_QUANTITY_ACTION, payload };
}

export function getAuctionProductByAuctionId(payload) {
  return { type: actionTypes.GET_AUCTION_PRODUCT_BY_AUCTION_ID, payload };
}

export function updateSellerReviewData(payload) {
  return { type: actionTypes.UPDATE_SELLER_DATA, payload };
}

export function getAuctionProductByAuctionIdSuccess(payload) {
  return {
    type: actionTypes.GET_AUCTION_PRODUCT_BY_AUCTION_ID_SUCCESS,
    payload,
  };
}

export function addProductToCart(payload) {
  return { type: actionTypes.ADD_PRODUCT_TO_CART, payload };
}

export function addProductToCartSuccess(payload) {
  return { type: actionTypes.ADD_PRODUCT_TO_CART_SUCCESS, payload };
}

export function addProductToCartError(payload) {
  return { type: actionTypes.ADD_PRODUCT_TO_CART_ERROR, payload };
}

export function getProducts(payload) {
  return { type: actionTypes.GET_PRODUCTS, payload };
}

export function getTotalProducts() {
  return { type: actionTypes.GET_TOTAL_OF_PRODUCTS };
}

export function getBrands() {
  return { type: actionTypes.GET_BRANDS };
}

export function getBrandsSuccess(payload) {
  return { type: actionTypes.GET_BRANDS_SUCCESS, payload };
}

export function getProductCategories() {
  return { type: actionTypes.GET_PRODUCT_CATEGORIES };
}

export function getProductCategoriesSuccess(payload) {
  return { type: actionTypes.GET_PRODUCT_CATEGORIES_SUCCESS, payload };
}

export function getTotalProductsSuccess(payload) {
  return {
    type: actionTypes.GET_TOTAL_OF_PRODUCTS_SUCCESS,
    payload,
  };
}

export function getProductsSuccess(data) {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    data,
  };
}
export function getProductByKeywordsSuccess(payload) {
  return {
    type: actionTypes.GET_PRODUCTS_BY_KEYWORD_SUCCESS,
    payload,
  };
}

export function getSingleProductsSuccess(data) {
  return {
    type: actionTypes.GET_PRODUCT_BY_ID_SUCCESS,
    data,
  };
}

export function getProductsError(error) {
  return {
    type: actionTypes.GET_PRODUCTS_ERROR,
    error,
  };
}

export function getProductsByCategory(category) {
  return {
    type: actionTypes.GET_PRODUCTS_BY_CATEGORY,
    category,
  };
}

export function getProductsByBrand(payload) {
  return {
    type: actionTypes.GET_PRODUCTS_BY_BRAND,
    payload,
  };
}

export function getProductsByKeyword(keyword) {
  return {
    type: actionTypes.GET_PRODUCTS_BY_KEYWORD,
    keyword,
  };
}

export function getProductsById(id) {
  console.log("..action id...", id)
  return {
    type: actionTypes.GET_PRODUCT_BY_ID,
    id,
  };
}

export function getProductsByPrice(payload) {
  return {
    type: actionTypes.GET_PRODUCTS_BY_PRICE_RANGE,
    payload,
  };
}
