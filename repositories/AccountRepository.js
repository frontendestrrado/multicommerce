import { responsiveFontSizes } from "@material-ui/core";
import Repository, { baseUrl, serializeQuery, apibaseurl } from "./Repository";
import Axios from "axios";
import { notification } from "antd";

const modalOpen = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

class AccountRepository {
  async getUserPurchaseYears(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/order/year`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        modalOpen("error", "Error", "Error Fetching Years from Server");
      });
    return response;
  }


  async changePassword(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/password/change`,
      payload
    )
      .then((response) => {
        if (response.data.httpcode == 200) {
          return response.data;
        }
        return response.data;
      })
      .catch((err) => console.log(err));
    return response;
  }

  async registerNewUser(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/register`,
      payload
    )
      .then((response) => {
        if (response.data.httpcode == 200) {
          return response.data;
        }
        return response.data;
      })
      .catch((err) => console.log(err));
    return response;
  }

  async editCustomerProfile(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/edit/profile`,
      payload
    )
      .then(function (response) {
        return response.data;
      })
      .catch(function (response) {
        console.log(response);
        return response.data;
      });
    return response;
  }

  async getCountry() {
    const response = await Repository.post(`${apibaseurl}/api/customer/country`)
      .then((response) => {
        if (response.data.httpcode == 200) {
          return response.data.data;
        }
        return response.data;
      })
      .catch((err) => console.log(err));
    return response;
  }

  async getChatList(payload) {
    const response = await Axios({
      method: "post",
      url: `${apibaseurl}/api/customer/chat/list`,
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));

    return response;
  }

  async getChatMessage(payload) {
    const response = await Axios({
      method: "post",
      url: `${apibaseurl}/api/customer/chat/message`,
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));

    return response;
  }

  async sendMessage(payload) {
    const response = await Axios({
      method: "post",
      url: `${apibaseurl}/api/customer/chat/send`,
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));

    return response;
  }

  async getState(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/state`,
      payload
    )
      .then((response) => {
        if (response.data.httpcode == "200") {
          return response.data.data;
        }
        return response.data;
      })
      .catch((err) => console.log(err));
    return response;
  }

  async getCity(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/city`,
      payload
    )
      .then((response) => {
        if (response.data.httpcode == "200") {
          return response.data.data;
        }
        return response.data;
      })
      .catch((err) => console.log(err));
    return response;
  }

  async getMyOrders(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/mypurchase`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async cancelOrderRequest(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/response/cancel/request`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getOrderDetails(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/order/detail`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  // async getCustomerProfileDetail({ access_token }) {
  async getCustomerProfileDetail() {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;

    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/profile`,
      { access_token, lang_id: 1 }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async updateCustomerProfileDetail(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/edit/profile`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getCustomerRecentViews(payload) {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;

    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/recent/views`,
      { access_token, lang_id: 1 }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async getCustomerAddresses() {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;

    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/address`,
      { access_token }
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }
  async makeDefaultAddresses(payload) {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;

    var userUpdateFormData = new FormData();

    userUpdateFormData.append("access_token", access_token);
    userUpdateFormData.append("address_id", payload.address_id);
    userUpdateFormData.append("is_default", payload.default);

    const reponse = await Axios({
      method: "post",
      url: `${apibaseurl}/api/customer/default/address`,
      data: userUpdateFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async deleteAddress(payload) {
    let userdata = localStorage.getItem("user");
    let parsedata = JSON.parse(userdata);
    let access_token = parsedata?.access_token;

    var userUpdateFormData = new FormData();

    userUpdateFormData.append("access_token", access_token);
    userUpdateFormData.append("address_id", payload.address_id);

    const reponse = await Axios({
      method: "post",
      url: `${apibaseurl}/api/customer/remove/address`,
      data: userUpdateFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async addAddress(payload) {
    const reponse = await Axios({
      method: "post",
      url: `${apibaseurl}/api/customer/add/address`,
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async updateAddress(payload) {
    const reponse = await Axios({
      method: "post",
      url: `${apibaseurl}/api/customer/edit/address`,
      data: payload,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async returnOrderRequest(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/return/request`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async returnShipmentDetail(payload) {
    const reponse = await Repository.post(
      `${apibaseurl}/api/customer/order/return/shipment`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return reponse;
  }

  async createSupportToken(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/create-ticket`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => response.error);
    return response;
  }

  async listSupportToken(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/list-ticket`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async supportMessageByID(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/support-message`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async addTicketMessage(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/add-ticket-message`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async getWalletDetails(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/wallet/amount`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async getAuctionCartData(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/auction/detail`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async getUserNotification(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/view/notifications`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async getAuctionOrderList(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/auction/order/list`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async sendRegisterMobileOTP(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/register/send/otp`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async verifyRegisterMobileOTP(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/register/verify/otp`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }

  async verifyForgotOTP(payload) {
    const response = await Repository.post(
      `${apibaseurl}/api/customer/login/forgot/verify-otp`,
      payload
    )
      .then((response) => {
        return response.data;
      })
      .catch((error) => ({ error: JSON.stringify(error) }));
    return response;
  }
}



export default new AccountRepository();
