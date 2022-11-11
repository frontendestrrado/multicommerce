import React, { useState, useEffect } from "react";
import { Slider, Checkbox } from "antd";
import { useRouter } from "next/router";

const Pricefilterforshockingsale = () => {
  const Router = useRouter();
  const { category, brand, price_lt, price_gt } = Router.query;

  const [min, setMin] = useState(price_gt ? price_gt : 0);
  const [max, setMax] = useState(price_lt ? price_lt : 2000);

  function handleChangeRange(value) {
    setMin(value[0]);
    price_lt: value[1], setMax(value[1]);
    let element = document.getElementById("sort_product");
    element.value = "";
    /*  const params = {
            price_gt: value[0],
        };*/
    Router.push(`/shockingproducts?price_gt=${value[0]}&price_lt=${value[1]}`);
    /*this.props.dispatch(getProductsByPrice(params));*/
  }

  return (
    <aside className="widget widget_shop">
      <figure>
        <h4 className="widget-title">By Price</h4>
        <Slider
          range
          defaultValue={[0, 2000]}
          max={2000}
          onAfterChange={(e) => handleChangeRange(e)}
        />
        <p>
          Price: SAR{price_gt ? price_gt : 0} - SAR {price_lt ? price_lt : 2000}
        </p>
      </figure>
    </aside>
  );
};

export default Pricefilterforshockingsale;
