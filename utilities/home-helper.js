/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import React from "react";
import Homeapi from "~/repositories/Homeapi";

export async function getHomedata() {
  let homedata = await Homeapi.getHomedata();
  if (homedata) {
    return homedata;
  } else {
    return null;
  }
}

export async function submitReview(payload) {
  let response = await Homeapi.submitReview(payload);
  if (response) {
    return response;
  } else {
    return null;
  }
}

export async function submitSellerReview(payload) {
  let response = await Homeapi.submitSellerReview(payload);
  if (response) {
    return response;
  } else {
    return null;
  }
}
