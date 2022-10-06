import React from "react";
import Link from "next/link";

const HomeDefaultTopCategories = () => (
  <div className="ps-top-categories">
    <div className="ps-container">
      <h3>Top categories of the month</h3>
      <div className="row">
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
          <div className="ps-block--category">
            <Link href="/shop">
              <a className="ps-block__overlay"></a>
            </Link>
            <img src="/static/img/categories/1.jpg" alt="Kangtao" />
            <p>Electronics</p>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
          <div className="ps-block--category">
            <Link href="/shop">
              <a className="ps-block__overlay"></a>
            </Link>
            <img src="/static/img/categories/2.jpg" alt="Kangtao" />
            <p>Clothings</p>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
          <div className="ps-block--category">
            <Link href="/shop">
              <a className="ps-block__overlay"></a>
            </Link>
            <img src="/static/img/categories/3.jpg" alt="Kangtao" />
            <p>Computers</p>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
          <div className="ps-block--category">
            <Link href="/shop">
              <a className="ps-block__overlay"></a>
            </Link>
            <img src="/static/img/categories/4.jpg" alt="Kangtao" />
            <p>Home & Kitchen</p>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
          <div className="ps-block--category">
            <Link href="/shop">
              <a className="ps-block__overlay"></a>
            </Link>
            <img src="/static/img/categories/5.jpg" alt="Kangtao" />
            <p>Health & Beauty</p>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
          <div className="ps-block--category">
            <Link href="/shop">
              <a className="ps-block__overlay"></a>
            </Link>
            <img src="/static/img/categories/6.jpg" alt="Kangtao" />
            <p>Health & Beauty</p>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
          <div className="ps-block--category">
            <Link href="/shop">
              <a className="ps-block__overlay"></a>
            </Link>
            <img src="/static/img/categories/7.jpg" alt="Kangtao" />
            <p>Jewelry & Watch</p>
          </div>
        </div>
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
          <div className="ps-block--category">
            <Link href="/shop">
              <a className="ps-block__overlay"></a>
            </Link>
            <img src="/static/img/categories/8.jpg" alt="Kangtao" />
            <p>Technology Toys</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomeDefaultTopCategories;
