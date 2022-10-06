import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
const Links = {
  consumerElectric: [
    {
      text: "TV & Applicance shop from home days",
      url: "/shop",
    },
    {
      text: "Grand home application sale",
      url: "/shop",
    },
    {
      text: "Flipcart super cooling days",
      url: "/shop",
    },
    {
      text: "Big Screen televisions",
      url: "/shop",
    },
    {
      text: "TV & Large Application big saving day sale",
      url: "/shop",
    },
    {
      text: "Akashya tritya offers",
      url: "/shop",
    },
    {
      text: "Books",
      url: "/shop",
    },
    {
      text: "Flipcart Electorinic TV & home applicance sale",
      url: "/shop",
    },
    {
      text: "Printers",
      url: "/shop",
    },
    {
      text: "Projectors",
      url: "/shop",
    },
    {
      text: "Scanners",
      url: "/shop",
    },
    {
      text: "Store & Business",
      url: "/shop",
    },
    {
      text: "4K Ultra HD TVs",
      url: "/shop",
    },
    {
      text: "LED TVs",
      url: "/shop",
    },
    {
      text: "OLED TVs",
      url: "/shop",
    },
    {
      text: "Desktop PC",
      url: "/shop",
    },
    {
      text: "Laptop",
      url: "/shop",
    },
    {
      text: "Smartphones",
      url: "/shop",
    },
    {
      text: "Tablet",
      url: "/shop",
    },
    {
      text: "Game Controller",
      url: "/shop",
    },
    {
      text: "Audio & Video",
      url: "/shop",
    },
    {
      text: "Wireless Speaker",
      url: "/shop",
    },
  ],
  clothingAndApparel: [
    {
      text: "Iphone 12 64GB",
      url: "/shop",
    },
    {
      text: "Iphone 12 Pro 512GB",
      url: "/shop",
    },
    {
      text: "Iphone 12 128GB",
      url: "/shop",
    },
    {
      text: "Vivo Y91",
      url: "/shop",
    },
    {
      text: "Vivo Y15",
      url: "/shop",
    },
    {
      text: "Vivo Y50",
      url: "/shop",
    },
    {
      text: "Vivo Y12",
      url: "/shop",
    },
    {
      text: "Reno2 F",
      url: "/shop",
    },
    {
      text: "Oppo A12",
      url: "/shop",
    },
    {
      text: "Oppo F15",
      url: "/shop",
    },
    {
      text: "Oppo A31",
      url: "/shop",
    },
    {
      text: "Samsung A71",
      url: "/shop",
    },
    {
      text: "Realme X2",
      url: "/shop",
    },
    {
      text: "Realme 5",
      url: "/shop",
    },
    {
      text: "Iphone 11",
      url: "/shop",
    },
    {
      text: "Iphone 11 Pro",
      url: "/shop",
    },
    {
      text: "Iphone 11 Pro Max",
      url: "/shop",
    },
    {
      text: "Iphone 6",
      url: "/shop",
    },
    {
      text: "Iphone 7",
      url: "/shop",
    },
    {
      text: "4G Mobile",
      url: "/shop",
    },
    {
      text: "Samsung Mobile",
      url: "/shop",
    },
    {
      text: "Nokia Mobile",
      url: "/shop",
    },
    {
      text: "Oppo Mobile",
      url: "/shop",
    },
    {
      text: "Vivo Mobile",
      url: "/shop",
    },
    {
      text: "Redmi Mobile",
      url: "/shop",
    },
  ],
  gardenAndKitchen: [
    {
      text: "Cookware",
      url: "/shop",
    },
    {
      text: "Decoration",
      url: "/shop",
    },
    {
      text: "Furniture",
      url: "/shop",
    },
    {
      text: "Garden Tools",
      url: "/shop",
    },
    {
      text: "Garden Equipments",
      url: "/shop",
    },
    {
      text: "Powers And Hand Tools",
      url: "/shop",
    },
    {
      text: "Utensil & Gadget",
      url: "/shop",
    },
  ],
  healthAndBeauty: [
    {
      text: "Hair Care",
      url: "/shop",
    },
    {
      text: "Decoration",
      url: "/shop",
    },
    {
      text: "Makeup",
      url: "/shop",
    },
    {
      text: "Body Shower",
      url: "/shop",
    },
    {
      text: "Skin Care",
      url: "/shop",
    },
    {
      text: "Cologine",
      url: "/shop",
    },
    {
      text: "Perfume",
      url: "/shop",
    },
  ],
  jewelryAndWatch: [
    {
      text: "Necklace",
      url: "/shop",
    },
    {
      text: "Pendant",
      url: "/shop",
    },
    {
      text: "Diamond Ring",
      url: "/shop",
    },
    {
      text: "Sliver Earing",
      url: "/shop",
    },
    {
      text: "Leather Watcher",
      url: "/shop",
    },
    {
      text: "Gucci",
      url: "/shop",
    },
  ],
  computerAndTechnology: [
    {
      text: "Desktop PC",
      url: "/shop",
    },
    {
      text: "Laptop",
      url: "/shop",
    },
    {
      text: "Smartphones",
      url: "/shop",
    },
    {
      text: "Tablet",
      url: "/shop",
    },
    {
      text: "Game Controller",
      url: "/shop",
    },
    {
      text: "Audio & Video",
      url: "/shop",
    },
    {
      text: "Wireless Speaker",
      url: "/shop",
    },
  ],
};

const FooterLinks = () => {
  const { homedata } = useSelector((state) => state.home);

  const { most_searched } = homedata ? homedata : [];

  const searchesDetails = (searches) => {
    if (searches.length > 0) {
      return searches.map((item, index) => (
        <Link href={item.url} key={index}>
          <a>{item.keyword}</a>
        </Link>
      ));
    } else {
      return "EMPTY";
    }
  };
  return (
    <div className="ps-footer__links topstory_block">
      <div className="top_stories">
        Top Stories: <b>Brand Directory</b>
      </div>
      <p>
        <strong>MOST SEARCHED FOR ON KANGTAO:</strong>
        {/* { Links.consumerElectric.map((item) => (
          <Link href={item.url} key={item.text}>
            <a>{item.text}</a>
          </Link>
        ))} */}
        {most_searched && most_searched.length > 0
          ? searchesDetails(most_searched)
          : "Empty"}
      </p>
      <p>
        <strong>MOBILES:</strong>
        {Links.clothingAndApparel.map((item) => (
          <Link href={item.url} key={item.text}>
            <a>{item.text}</a>
          </Link>
        ))}
      </p>
    </div>
  );
};

export default FooterLinks;
