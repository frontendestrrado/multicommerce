import { getDeviceId, osType } from "~/utilities/common-helpers";
import Repository, {
  baseUrl,
  serializeQuery,
  apibaseurl,
  basePathUrl,
} from "./Repository";

class ProductRepository {
  async getRecords(params) {
    const reponse = await Repository.get(
      `${baseUrl}/products?${serializeQuery(params)}`
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getSearchedProducts(params) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/product-search`,
      {
        lang_id: "",
        category_id: params.category_id,
        keyword: params.title_contains,
      }
    )
      .then((response) => {
        return {
          items: response.data.data.products,
          totalItems: response.data.data.no_of_products,
        };
      })

      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProducts(params) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/product-list?page=` + params.page,
      {
        lang_id: 1,
        access_token: "",
        device_id: getDeviceId,
        page_url: "https://abc.com/products/us/img",
        os_type: "WEB",
      }
    )
      .then((response) => {
        return {
          items: response.data.data.products,
          totalItems: response.data.data.total_products,
        };
      })

      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getNewDealsProducts(payload, params) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/product-deals?page=` + params.page,
      payload
    )
      .then((response) => {
        return {
          items: response.data.data.products,
          totalItems: response.data.data.total_products,
        };
      })

      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getShockingSaleProducts(payload, params) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/shock-sale-products?page=` + params.page,
      payload
    )
      .then((response) => {
        return {
          items: response.data.data.shock_sale,
          totalItems: response.data.data.total_products,
        };
      })

      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getFeaturedProducts(payload, params) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/product-featured?page=` + params.page,
      payload
    )
      .then((response) => {
        return {
          items: response.data.data.products,
          totalItems: response.data.data.total_products,
        };
      })

      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductsbyFilter(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/product-list-filter?page=` + payload.page,
      payload
    )
      .then((response) => {
        return {
          items: response.data.data.products,
          totalItems: response.data.data.total_products,
        };
      })

      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getNewDealsProductsbyFilter(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/product-deals?page=` + payload.page,
      payload
    )
      .then((response) => {
        return {
          items: response.data.data.products,
          totalItems: response.data.data.total_products,
        };
      })

      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getShockingSaleProductsbyFilter(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/shock-sale-products?page=` + payload.page,
      payload
    )
      .then((response) => {
        return {
          items: response.data.data.shock_sale,
          totalItems: response.data.data.total_products,
        };
      })

      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getFeaturedProductsbyFilter(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/product-featured?page=` + payload.page,
      payload
    )
      .then((response) => {
        return {
          items: response.data.data.products,
          totalItems: response.data.data.total_products,
        };
      })

      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getShockingProducts(params) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/shock-sale-products?page=` + params.page
    )
      .then((response) => {
        return {
          items: response.data.data.shock_sale,
          totalItems: response.data.data.total_products,
        };
      })

      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getBrands() {
    const reponse = await Repository.post(`${apibaseurl}/api/customer/brand`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductCategories() {
    // const reponse = await Repository.get(`${baseUrl}/product-categories`)
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/cat-subcat`
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getTotalRecords() {
    const reponse = await Repository.get(`${baseUrl}/products/count`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductsById(id) {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;

    const response = await Repository.post(
      `${apibaseurl}/api/customer/product-detail`,
      {
        access_token,
        id,
        lang_id: 1,
        device_id: getDeviceId,
        page_url: `${basePathUrl}/product/${id}`,
        os_type: osType(),
      }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async getShockSaleByid(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/shock-sale`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async getProductsByCategory(payload) {
    const reponse = await Repository.get(
      `${baseUrl}/product-categories?slug=${payload}`
    )
      .then((response) => {
        if (response.data) {
          if (response.data.length > 0) {
            return response.data[0];
          }
        } else {
          return null;
        }
      })
      .catch(() => {
        return null;
      });
    return reponse;
  }
  async getProductsByBrand(payload) {
    const reponse = await Repository.get(`${baseUrl}/brands?slug=${payload}`)
      .then((response) => {
        if (response.data) {
          if (response.data.length > 0) {
            return response.data[0];
          }
        } else {
          return null;
        }
      })
      .catch(() => {
        return null;
      });
    return reponse;
  }

  async getProductsByBrands(payload) {
    let query = "";
    payload.forEach((item) => {
      if (query === "") {
        query = `id_in=${item}`;
      } else {
        query = query + `&id_in=${item}`;
      }
    });
    const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductsByBrands(payload) {
    let query = "";
    payload.forEach((item) => {
      if (query === "") {
        query = `id_in=${item}`;
      } else {
        query = query + `&id_in=${item}`;
      }
    });
    const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getProductsByPriceRange(payload) {
    const reponse = await Repository.get(
      `${baseUrl}/products?${serializeQuery(payload)}`
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async addProductToCart(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/add-cart`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }
  async changeQty(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/cart/change-qty`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async placeOrder(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/order/placeorder`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getCart(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/cart`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async deleteCart(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/delete-cart`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getAuctionProductByAuctionId(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/auction`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async createBid(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/create-bid`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getShopDetailById(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/shop-detail`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getCheckoutInfo(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/order/checkout-info`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async placeAuctionOrder(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/auction/checkout`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }
}

export default new ProductRepository();
