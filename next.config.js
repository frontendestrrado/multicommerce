/*
* bigbasket - cash & carry
* Author: estrrado
* Homepage: 
* */
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const { v4: uuidv4 } = require("uuid");
API_BASE_URL: "https://qa-bigbasket.estrradoweb.com";
BASE_PATH: "https://dev-kangtao.vercel.app";
const nextSettings = {
  env: {
    title: "bigbasket",
    titleDescription: "cash & carry",
    deviceId: uuidv4(),
  },
};

module.exports = withPlugins([withImages(), nextSettings]);
