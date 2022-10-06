import React from "react";
import Link from "next/link";
import SkeletonProduct from "~/components/elements/skeletons/SkeletonProduct";
import { generateTempArray } from "~/utilities/common-helpers";
import { Image } from "antd";

const Homecategories = ({ homeitems, loading }) => {
  let skeletons = "";
  if (loading) {
    skeletons = generateTempArray(5).map((item) => (
      <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6 " key={item}>
        <SkeletonProduct />
      </div>
    ));
  }
  let categorylist = [];
  if (!loading) {
    categorylist =
      homeitems?.category?.length > 10
        ? homeitems?.category?.slice(0, 9)
        : homeitems?.category;
  }
  return (
    <div className="ps-home-categories">
      <div className="container">
        <div className="ps-section__content">
          <div className="row align-content-lg-stretch homecategories-block pt-5 text-capitalize">
            {!loading && categorylist?.length > 0 ? (
              <>
                {categorylist.map((data, index) => (
                  <div
                    className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6 pb-4"
                    key={index}
                  >
                    <div className="ps-block--category-2" data-mh="categories">
                      <Link href={`/shop?category=${data.id}`}>
                        <div className="">
                          <Image width={55} preview={false} src={data.image} />
                          {/* <img src={data.image} alt="Category" title="" /> */}
                        </div>
                      </Link>
                      <Link href={`/shop?category=${data.id}`}>
                        <div className="d-flex align-items-center ml-4 p-0">
                          <div style={{ fontWeight: "600" }}>
                            {data.category_name}
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
                <div className="col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6">
                  <div className="ps-block--category-2" data-mh="categories">
                    <Link href={`/shop`}>
                      <div className="">
                        <Image
                          width={55}
                          preview={false}
                          src={homeitems.all_category_icon.image}
                          style={{ padding: "4px" }}
                        />
                      </div>
                    </Link>
                    <Link href={`/shop`}>
                      <div className="d-flex align-items-center ml-4">
                        <div style={{ fontWeight: "600" }}>
                          {homeitems.all_category_icon.category_name}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div className="row align-content-lg-stretch homecategories-block">
                {skeletons}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homecategories;
