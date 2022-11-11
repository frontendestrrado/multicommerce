import { responsiveFontSizes } from "@material-ui/core";
import { getDeviceId } from "~/utilities/common-helpers";
import Repository, { baseUrl, serializeQuery, apibaseurl } from "./Repository";

class CartRepository {
  async addProductToCart({ access_token, product, quantity, cart_type }) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/add-cart`,
      { access_token, product_id: product.product_id, quantity, cart_type }
    )
      .then((response) => {
        if (response.data.httpcode == "200") {
          return response.data;
        }
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getCartItem(payload) {
   // alert("d")
     console.log("....bbbbb...bbb.ccccc..",getDeviceId)
    console.log("....bbbbb...bbb...",payload)
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;
    const user_token = access_token;

    const response = await Repository.post(`${apibaseurl}/api/customer/cart`, {
      access_token: user_token,
      lang_id:localStorage.getItem("langId"),
      device_id: getDeviceId,
      page_url: "http://localhost:3000/product/2",
      os_type: "WEB",
    })
   // alert("3333")
    console.log("....bbbbb...bbb..444444444444.",response)
    .then((response) => {
   //   alert("44444444")
      if (response.data.httpcode == "200") {
       
        return response.data;
      } else {
        return response.data;
      }
    })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async fetchPlatformVoucher() {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/coupon/platform`,
      {
        lang_id: "",
      }
    )
      .then((response) => {
        if (response.data.httpcode == "200") {
          return response.data;
        } else {
          return response.data;
        }
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async checkPlatformVoucher(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/coupon/platform`,
      payload
    )
      .then((response) => {
        if (response.data.httpcode == "200") {
          return response.data;
        } else {
          return response.data;
        }
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async checkSellerVoucher(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/coupon/seller`,
      payload
    )
      .then((response) => {
        if (response.data.httpcode == "200") {
          return response.data;
        } else {
          return response.data;
        }
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }
}

export default new CartRepository();
