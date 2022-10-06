import Repository, { apibaseurl } from "./Repository";
import axios from "axios";
import { getDeviceId, makePageUrl, osType } from "~/utilities/common-helpers";

class Homeapi {
  async getHomedata(pathName) {
    let payload = {
      access_token: "",
      lang_id: 1,
      device_id: getDeviceId,
      page_url: makePageUrl("/"),
      os_type: osType(),
    };

    const CancelToken = axios.CancelToken;
    let source = CancelToken.source();

    source && source.cancel("Operation canceled due to new request.");
    // save the new request for cancellation
    source = axios.CancelToken.source();

    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/home`,
      payload,
      {
        cancelToken: source.token,
      }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    // cancel the request (the message parameter is optional)
    source.cancel("Operation canceled by the user.");
    return reponse;
  }

  async submitReview(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/post-product-review`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async submitSellerReview(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/post-seller-review`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }
  // async getHomedata() {
  //   const response = await axios
  //     .get(`https://estrradoweb.com/kangtao/api/customer/home`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => response.data)
  //     .catch((error) => error);
  //   return response;
  // }
}

export default new Homeapi();
