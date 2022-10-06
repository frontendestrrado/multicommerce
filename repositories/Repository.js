import axios from "axios";
const baseDomain = "https://beta.apinouthemes.com"; // API for products
export const basePostUrl = "https://beta.apinouthemes.com"; // API for post
export const baseStoreURL = "https://beta.apinouthemes.com"; // API for vendor(store)

let apibaseurlCustom = "https://kt.estrradoweb.com";
let basePath = "https://dev-kangtao.vercel.app";
if (typeof window !== "undefined") {
  if (window.location.hostname == "uat-kangtao.vercel.app") {
    apibaseurlCustom = "https://uat-kt.estrradoweb.com";
    basePath = "https://uat-kangtao.vercel.app";
  }
  if (window.location.hostname == "qa-kangtao.vercel.app") {
    apibaseurlCustom = "https://qa-kt.estrradoweb.com";
    basePath = "https://qa-kangtao.vercel.app";
  }
}

export const apibaseurl = apibaseurlCustom;
export const basePathUrl = basePath;

export const customHeaders = {
  Accept: "application/json",
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
  baseUrl,
  headers: customHeaders,
});

export const serializeQuery = (query) => {
  return Object.keys(query)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
    )
    .join("&");
};
