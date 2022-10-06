export const actionTypes = {
  GET_PRODUCTS: "GET_PRODUCTS",
  ADD_PRODUCTS: "ADD_PRODUCTS",
};

export function getProducts() {
  return { type: actionTypes.GET_PRODUCTS };
}

export function addProducts(product) {
  return { type: actionTypes.ADD_PRODUCTS, product };
}
