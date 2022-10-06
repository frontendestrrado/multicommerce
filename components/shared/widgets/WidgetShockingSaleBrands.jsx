import React, { useEffect, useState } from "react";
import ProductRepository from "~/repositories/ProductRepository";
import Link from "next/link";
import { Checkbox } from "antd";
import { Radio, Input } from "antd";
import { useRouter } from "next/router";

const WidgetShockingSaleBrands = () => {
  const Router = useRouter();
  const { slug, brand } = Router.query;
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [brandlimit, setBrandlimit] = useState(10);

  async function getBrands() {
    setLoading(true);
    const responseData = await ProductRepository.getBrands();
    if (responseData) {
      let brandsGroup = [];
      if (responseData.data.brands.length > 0) {
        responseData.data.brands.forEach((brand) => {
          brandsGroup.push({
            id: brand.brand_id,
            value: brand.brand_name,
            label: brand.brand_name,
          });
        });
      }
      setBrands(brandsGroup);

      setTimeout(
        function () {
          setLoading(false);
        }.bind(this),
        250
      );
    }
  }

  function handleSelectBrand(e) {
    Router.push(`/shockingproducts?brand=${e.target.id}`);
  }

  useEffect(() => {
    getBrands();
  }, []);

  const handleBrand = (brand) => {
    let element = document.getElementById("sort_product");
    element.value = "";
    Router.push(`/shockingproducts?brand=${brand}`);
  };
  // Views
  // let brandylist;
  // let brandsView;
  // if (!loading) {
  //   brandylist = brands.length > 10 ? brands.slice(0, brandlimit) : brands;
  //   if (brandylist && brandylist.length > 0) {
  //     const items = brandylist.map((item) => (
  //       <li key={item.id}>
  //         <Link href={`shop/${item.slug}`}>{item.name}</Link>
  //       </li>
  //     ));
  //     brandsView = <ul className="ps-list--brands">{items}</ul>;
  //   } else {
  //   }
  // } else {
  //   brandsView = <p>Loading...</p>;
  // }
  const viewAll = () => {
    setBrandlimit(brands.length);
  };
  let brandsView;
  if (!loading) {
    const brandylist =
      brands.length > 10 ? brands.slice(0, brandlimit) : brands;
    if (brandylist && brandylist.length > 0) {
      const items = brandylist.map((item) => (
        <li
          key={item.value}
          className={item.id == brand ? "cat_item active" : "cat_item"}
          onClick={() => handleBrand(item.id)}
        >
          <Link href="javascript:void(0);">{item.value}</Link>
        </li>
      ));
      brandsView = <ul className="ps-list--categories">{items}</ul>;
    } else {
    }
  } else {
    brandsView = <p>Loading...</p>;
  }

  return (
    <aside className="widget widget_shop widget_shop--brand">
      <h4 className="widget-title">By Brands</h4>
      {/* <figure>
        <Radio.Group
          defaultValue={slug}
          options={brandylist}
          onChange={handleSelectBrand}
        />
      </figure> */}
      {brandsView}
      {brands.length > 10 && brandlimit === 10 && (
        <span onClick={() => viewAll()} className="view_allbtn">
          View all
        </span>
      )}
    </aside>
  );
};

export default WidgetShockingSaleBrands;
