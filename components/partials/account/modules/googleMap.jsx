import React, { Component, useState, useEffect } from "react";
import {
  DatePicker,
  Empty,
  Form,
  Input,
  Select,
  message,
  notification,
  Radio,
  Checkbox,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Router, useRouter } from "next/router";
import AccountRepository from "~/repositories/AccountRepository";
import { InfoCircleOutlined } from "@ant-design/icons";
import { addAddress } from "~/store/account/action";
import { getDeviceId, makePageUrl } from "~/utilities/common-helpers";

const googleMap = () => {
 
  useEffect(() => {

  }, []);



 

  return (
    <>
      
     
    <div id="floating-panel">
      <input id="latlng" type="text" value="40.714224,-73.961452" />
      <input id="submit" type="button" value="Reverse Geocode" />
    </div>
 
    <div id="result"></div>
 
    <div id="map"></div>
    </>
  );
};

export default googleMap;
