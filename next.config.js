/*
* Kangtao - Multipurpose Marketplace React Ecommerce Template
* Author: nouthemes
* Homepage: https://themeforest.net/user/nouthemes/portfolio
* Created at: 2019-11-15T08:00:00+07:00
* Updated at: 2021-02-03T08:18:23+07:00

* */
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const { v4: uuidv4 } = require("uuid");
API_BASE_URL: "https://kt.estrradoweb.com";
BASE_PATH: "https://dev-kangtao.vercel.app";
const nextSettings = {
  env: {
    title: "Kangtao",
    titleDescription: "Multipurpose Marketplace React Ecommerce Template",
    deviceId: uuidv4(),
  },
};

module.exports = withPlugins([withImages(), nextSettings]);
