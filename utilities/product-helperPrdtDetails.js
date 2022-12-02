/*
 * React template helpers
 * Author: Nouthemes
 * Developed: diaryforlife
 * */

import React from "react";
import LazyLoad from "react-lazyload";
import { baseUrl } from "~/repositories/Repository";
import Link from "next/link";
import Router from "next/router";

const exactMath = require("exact-math");

export function routeWithoutRefresh(routeLink) {
  Router.replace(routeLink, undefined, {
    shallow: true,
  });
}

export function homePageProductPriceHelper(product) {
  if (product.offer_price !== false) {
    return (
      <p className="ps-product__price offer">
        <span className="yllwbg">SAR {product.offer_price ? product.offer_price : 0}</span>
        <del className="ml-2">
        SAR {product.actual_price ? product.actual_price : 0}
        </del>
      </p>
    );
  }
  if (product.shock_sale_price !== false) {
    return (
      <p className="ps-product__price offer">
        SAR {product.shock_sale_price}
        <del className="ml-2">
        SAR {product.actual_price ? product.actual_price : 0}
        </del>
      </p>
    );
  }
  if (product.sale_price !== false) {
    return (
      <p className="ps-product__price offer">
        SAR {product.sale_price}
        <del className="ml-2">
        SAR {product.actual_price ? product.actual_price : 0}
        </del>
      </p>
    );
  }
  return (
    <p className="ps-product__price">
      SAR {product.actual_price ? product.actual_price : 0}
    </p>
  );
}

export function returnTotalOfCartValue(products) {
  let cart_total_price = products.reduce((prev, next) => {
    return (
      Number(priceHelper(prev)) +
      Number(
        priceHelper(
          next.total_discount_price == 0
            ? next.total_actual_price
            : next.total_discount_price
        )
      )
    );
  }, 0);

  return cart_total_price;
}

export function returnTotalCommission(products) {
  let cart_total_commission = products.reduce((prev, next) => {
    return Number(priceHelper(prev)) + Number(priceHelper(next.commission));
  }, 0);

  return cart_total_commission;
}

export function returnTotalOfCartTaxValue(products) {
  let cart_total_tax = products.reduce((prev, next) => {
    return (
      Number(priceHelper(prev)) + Number(priceHelper(next.total_tax_value))
    );
  }, 0);

  return cart_total_tax;
}

export function priceHelper(num) {
  let numberArray = num?.toString().split(",");
  if (numberArray && numberArray?.length > 0) {
    return numberArray.reduce((prev, next) => prev + next);
  } else {
    return 0;
  }
}

export function currencyHelperConvertToRinggit(currencyVal) {
  return new Intl.NumberFormat("ms-MY", {
    style: "currency",
    currency: "SAR",
  }).format(priceHelper(currencyVal));
}

export function mathFormula(formulaText) {
  let result = exactMath.formula(formulaText);
}

export function divCurrency(firstVal, secondVal) {
  let divData = exactMath.div(
    priceHelper(firstVal || 0),
    priceHelper(secondVal || 1)
  );
  return divData;
}

export function mulCurrency(firstVal, secondVal) {
  let mulData = exactMath.mul(
    priceHelper(firstVal || 1),
    priceHelper(secondVal || 1)
  );
  return mulData;
}

export function addCurrency(currencyValFirst, currencyValSecond) {
  let addData = exactMath.add(
    priceHelper(currencyValFirst || 0),
    priceHelper(currencyValSecond || 0)
  );

  return addData;
}
export function subCurrency(currencyValFirst, currencyValSecond) {
  let subData = exactMath.sub(
    priceHelper(currencyValFirst || 0),
    priceHelper(currencyValSecond || 0)
  );

  return subData;
}

export function formatCurrency(num) {
  if (num !== undefined) {
    return parseFloat(num)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  } else {
  }
}

export function getColletionBySlug(collections, slug) {
  if (collections.length > 0) {
    const result = collections.find((item) => item.slug === slug.toString());
    if (result !== undefined) {
      return result.products;
    } else {
      return [];
    }
  } else {
    return [];
  }
}

export function getItemBySlug(banners, slug) {
  if (banners.length > 0) {
    const banner = banners.find((item) => item.slug === slug.toString());
    if (banner !== undefined) {
      return banner;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function convertSlugsQueryString(payload) {
  let query = "";
  if (payload.length > 0) {
    payload.forEach((item) => {
      if (query === "") {
        query = `slug_in=${item}`;
      } else {
        query = query + `&slug_in=${item}`;
      }
    });
  }
  return query;
}

export function StrapiProductBadge(product) {
  let view;
  if (product.badge && product.badge !== null) {
    view = product.badge.map((badge) => {
      if (badge.type === "sale") {
        return <div className="ps-product__badge">{badge.value}</div>;
      } else if (badge.type === "outStock") {
        return <div className="ps-product__badge out-stock">{badge.value}</div>;
      } else {
        return <div className="ps-product__badge hot">{badge.value}</div>;
      }
    });
  }
  return view;
}

export function StrapiProductPrice(product) {
  let view;
  if (product.is_sale === true) {
    view = (
      <p className="ps-product__price sale">
        SAR {formatCurrency(product.price)}
        <del className="ml-2">SAR {formatCurrency(product.sale_price)}</del>
      </p>
    );
  } else {
    view = (
      <p className="ps-product__price">SAR {formatCurrency(product.price)}</p>
    );
  }
  return view;
}

export function StrapiProductPrice_New(product) {
  let view;
  if (product.sale_price !== false) {
    view = (
      <p className="ps-product__price sale">
        SAR {product.sale_price}
        <del className="ml-2">SAR {product.actual_price}</del>
      </p>
    );
  } else {
    view = <p className="ps-product__price">SAR {product.actual_price}</p>;
  }
  return view;
}

export function featureproductprice(product) {
  let view;
  if (product.is_sale === true) {
    view = (
      <p className="ps-product__price">
        SAR {formatCurrency(product.sale_price)}{" "}
        <span className="lin-prdt">
        SAR {formatCurrency(product.actual_price)}
        </span>
      </p>
    );
  } else {
    view = (
      <p className="ps-product__price">
        SAR {formatCurrency(product.sale_price)}{" "}
        <span className="lin-prdt">
        SAR {formatCurrency(product.actual_price)}
        </span>
      </p>
    );
  }
  return view;
}

export function StrapiProductPriceExpanded(product) {
  let view;
  if (product.is_sale === true) {
    view = (
      <p className="ps-product__price sale">
        SAR {formatCurrency(product.price)}
        <del className="ml-2">SAR {formatCurrency(product.sale_price)}</del>
        <small>18% off</small>
      </p>
    );
  } else {
    view = (
      <p className="ps-product__price">SAR {formatCurrency(product.price)}</p>
    );
  }
  return view;
}

export function StrapiProductPriceExpandedOther(product) {
  let view;

  view = (
    <p className="ps-product__price">
      SAR {formatCurrency(product.offer_price ? product.offer_price : 0)}
      <del className="ml-2">
      SAR {formatCurrency(product.actual_price ? product.actual_price : 0)}
      </del>
      <small>{product.offer ? product.offer : 0}</small>
    </p>
  );

  return view;
}
export function StrapiProductPriceExpandedOther1(product) {
  let view;

  view = (
    <p className="ps-product__price">
      SAR {formatCurrency(product.sale_price ? product.sale_price : 0)}
      <del className="ml-2">
      SAR {formatCurrency(product.price ? product.price : 0)}
      </del>
      <small>{product.offer ? product.offer : 0}</small>
    </p>
  );

  return view;
}

export function StrapiProductThumbnail(product) {
  let view;

  if (product.thumbnail) {
    view = (
      <Link href="/product/[pid]" as={`/product/${product.id}`}>
        <a>
          <LazyLoad>
            <img
              src={`${baseUrl}${product.thumbnail.url}`}
              alt={product.title}
            />
          </LazyLoad>
        </a>
      </Link>
    );
  } else {
    view = (
      <Link href="/product/[pid]" as={`/product/${product.id}`}>
        <a>
          <LazyLoad>
            <img src="/static/img/not-found.jpg" alt="Kangtao" />
          </LazyLoad>
        </a>
      </Link>
    );
  }

  return view;
}

export function StrapiProductThumbnailOther(product) {
  let view;

  if (product.image.length > 0) {
    view = (
      <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
        <a>
          <LazyLoad>
            <img
              src={product?.image[0]?.image}
              alt={product.product_name}
              width="300px"
              height="200px"
            />
          </LazyLoad>
        </a>
      </Link>
    );
  } else {
    view = (
      <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
        <a>
          <LazyLoad>
            <img
              src="/static/img/not-found.jpg"
              alt="Kangtao"
              width="300px"
              height="200px"
            />
          </LazyLoad>
        </a>
      </Link>
    );
  }

  return view;
}

export function StrapiProductThumbnailDetail(product) {
  let view;

  if (product.image.length > 0) {
    view = (
      <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
        <a>
          <LazyLoad>
            <img
              src={product?.image[0]?.image}
              alt={product.product_name}
              width="50px"
              height="50px"
            />
          </LazyLoad>
        </a>
      </Link>
    );
  } else {
    view = (
      <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
        <a>
          <LazyLoad>
            <img
              src="/static/img/not-found.jpg"
              alt="Kangtao"
              width="50px"
              height="50px"
            />
          </LazyLoad>
        </a>
      </Link>
    );
  }

  return view;
}

export function Shockingproductthumbnail(product) {
  let view;

  if (product.image.length > 0) {
    view = (
      <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
        <a>
          <LazyLoad>
            <img
              src={product?.image[0]?.image}
              alt={product.product_name}
              width="300px"
              height="200px"
            />
          </LazyLoad>
        </a>
      </Link>
    );
  } else {
    view = (
      <Link href="/product/[pid]" as={`/product/${product.product_id}`}>
        <a>
          <LazyLoad>
            <img
              src="/static/img/not-found.jpg"
              alt="Kangtao"
              width="300px"
              height="200px"
            />
          </LazyLoad>
        </a>
      </Link>
    );
  }

  return view;
}

export function colorHelper() {
  console.log("hello");
}
