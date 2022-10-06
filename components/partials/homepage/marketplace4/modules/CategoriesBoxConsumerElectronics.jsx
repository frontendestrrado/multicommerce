import React from "react";
import Link from "next/link";

const CategoriesBoxConsumerElectronics = () => (
  <div className="ps-block--categories-box">
    <div className="ps-block__header">
      <h3>Consumer Electronics</h3>
      <ul>
        <li>
          <Link href="/shop">
            <a>New Arrivals</a>
          </Link>
        </li>
        <li>
          <Link href="/shop">
            <a>Best Seller</a>
          </Link>
        </li>
      </ul>
    </div>
    <div className="ps-block__content">
      <div className="ps-block__banner">
        <img src="/static/img/categories/electronic/large.jpg" alt="Kangtao" />
      </div>
      <div className="ps-block__item">
        <a className="ps-block__overlay"></a>
        <img src="/static/img/categories/electronic/1.jpg" alt="Kangtao" />
        <p>Audios &amp; Theaters </p>
        <span>2 Items</span>
      </div>
      <div className="ps-block__item">
        <a className="ps-block__overlay"></a>
        <img src="/static/img/categories/electronic/2.jpg" alt="Kangtao" />
        <p>TV Televisions</p>
        <span>2 Items</span>
      </div>
      <div className="ps-block__item">
        <a className="ps-block__overlay"></a>
        <img src="/static/img/categories/electronic/3.jpg" alt="Kangtao" />
        <p>Washing Machines</p>
        <span>4 Items</span>
      </div>
      <div className="ps-block__item">
        <a className="ps-block__overlay"></a>
        <img src="/static/img/categories/electronic/4.jpg" alt="Kangtao" />
        <p>Air Conditioners</p>
        <span>5 Items</span>
      </div>
      <div className="ps-block__item">
        <a className="ps-block__overlay"></a>
        <img src="/static/img/categories/electronic/5.jpg" alt="Kangtao" />
        <p>Refrigerators</p>
        <span>10 Items</span>
      </div>
      <div className="ps-block__item">
        <a className="ps-block__overlay"></a>
        <img src="/static/img/categories/electronic/6.jpg" alt="Kangtao" />
        <p>Office Electronics</p>
        <span>2 Items</span>
      </div>
      <div className="ps-block__item">
        <a className="ps-block__overlay"></a>
        <img src="/static/img/categories/electronic/7.jpg" alt="Kangtao" />
        <p>Car Electronics</p>
        <span>3 Items</span>
      </div>
    </div>
  </div>
);

export default CategoriesBoxConsumerElectronics;
