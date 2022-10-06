import moment from "moment";
import { notification, message } from "antd";
import { basePathUrl } from "~/repositories/Repository";

export const stickyHeader = () => {
  let number =
    window.pageXOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;
  const header = document.getElementById("headerSticky");
  if (header !== null) {
    if (number >= 300) {
      header.classList.add("header--sticky");
    } else {
      header.classList.remove("header--sticky");
    }
  }
};

export const generateTempArray = (maxItems) => {
  let result = [];

  for (let i = 0; i < maxItems; i++) {
    result.push(i);
  }
  return result;
};

export const date_diff = (date) => {
  var addDate = new Date(date);
  var numberOfDaysToAdd = 2;
  addDate.setDate(addDate.getDate() + numberOfDaysToAdd);
  var prodDate = new Date(date);

  const diffTime = Math.abs(addDate - new Date());

  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const displayNotification = (type, msg, desc, timeDuration) => {
  notification[type]({
    message: `${msg}` || "",
    description: `${desc}` || "",
    duration: timeDuration || 2,
  });
};

export const makePageUrl = (currPage) => {
  let page_url = `${basePathUrl}${currPage}`;
  return page_url;
};

export const getDeviceId = process.env.deviceId;

export const osType = () => {
  let os_type = "WEB";
  return os_type;
};
