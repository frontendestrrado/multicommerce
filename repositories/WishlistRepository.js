import { responsiveFontSizes } from "@material-ui/core";
import Repository, { baseUrl, serializeQuery, apibaseurl } from "./Repository";

class WishlistRepository {
  async getProductToWishlist({ access_token, lang_id }) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/wishlist`,
      { access_token, lang_id }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async removeProductFromWishList({ access_token, product_id }) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/remove/wishlist`,
      { access_token, product_id }
    )
      .then((response) => {
        if (response.data.httpcode == "200") {
          response.data;
        }
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async addProductToWishList({ access_token, product_id, type }) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/add/wishlist`,
      { access_token, product_id, type }
    )
      .then((response) => {
        if (response.data.httpcode == "200") {
          response.data;
        }
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }
}

export default new WishlistRepository();
