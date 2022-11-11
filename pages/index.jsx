import React, { useState, useEffect } from "react";
import SiteFeatures from "~/components/partials/homepage/home-default/SiteFeatures";
import TrendingNow from "~/components/partials/shop/ShopItems1";
import DownLoadApp from "~/components/partials/commons/DownLoadApp";
import ContainerHomeDefault from "~/components/layouts/ContainerHomeDefault";
import FeatureAndRecent from "~/components/partials/homepage/home-default/FeatureAndRecent";
import Advert from "~/components/partials/homepage/home-default/Advert";
import Discount from "~/components/partials/homepage/home-default/Discount";
import { getDeviceId } from "~/utilities/common-helpers";
import Brand from "~/components/partials/homepage/home-default/Brand";
import BottomCategory from "~/components/partials/homepage/home-default/BottomCategory";
import HomeDefaultBanner from "~/components/partials/homepage/home-default/HomeDefaultBanner";
import Homecategories from "~/components/partials/homepage/category/homecategories";
import NewDealsDaily from "~/components/partials/homepage/new-deals-daily/newdealsdaily";
import ShopByCategory from "~/components/partials/homepage/new-deals-daily/newdealsdaily1";
import Shockingsale from "~/components/partials/homepage/shockingsale/shockingsale";
import Featureproducts from "~/components/partials/homepage/featureproducts/featureproducts";
import Homeauction from "~/components/partials/homepage/auction/auction";
import Bestseller from "~/components/partials/homepage/home-default/Bestseller";
import Repository, { apibaseurl } from "~/repositories/Repository";
import FooterLinks from "~/components/shared/footers/modules/FooterLinks";
import Axios from "axios";
import { getHomedata } from "~/utilities/home-helper";
import { useRouter } from "next/router";
import { getHomeSuccess } from "~/store/home/action";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

const HomepageDefaultPage = () => {
  const [homeitems, setHomeitems] = useState([]);
  const [getFeatureProduct, setFeatureProduct] = useState([]);
  const [getNewArrData, setNewArrData] = useState([]);
  const [getOfferData, setOfferData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  async function loadHomedata() {
    let responseData = await getHomedata(router.asPath);
    if (responseData) {
      dispatch(getHomeSuccess(responseData.data));
      setHomeitems(responseData.data);
    }
    setTimeout(() => {
      setLoading(false);
    }, 250);
  }
//  dev-bigbasket.estrradoweb.com/api/customer/product-featured

const featuredProduct = () => {
  let userdata = localStorage.getItem("user");
  let parsedata = JSON.parse(userdata);
  let access_token = parsedata?.access_token;
  const user_token = access_token;
  console.log("....email...login.... ${apibaseurl}...",{apibaseurl})
  const data = Axios.post(
    `${apibaseurl}/api/customer/product-featured`,
    {

      
        lang_id:1,
        category_id:"",
        subcategory_id:"",
        brand_id: "",
    featured:1,
        limit:10,
        offset:0,
        device_id:getDeviceId,
        page_url:"products/us/img",
        os_type:"WEB",
        access_token:user_token,
        max_price:"",
        min_price:""
    
    
      // access_token: user_token,
      // lang_id: 1,
      // device_id: getDeviceId,
      // page_url: "http://localhost:3000/product/2",
      // os_type: "WEB",
    })
    .then((response) => response.data)
    .then((data) => {
      console.log("...featured.....",data)
  //    console.log("....email...login.... response...",response)
      if (data.httpcode == 400 && data.status == "error") {
        // notification["error"]({
        //   message: data.message,
        // });
        // return;
      }
      if (data.httpcode == 200 && data.status == "success") {
        setFeatureProduct(data.data)
        // notification["success"]({
        //   message: data.message,
        // });
       // localStorage.setItem("user", JSON.stringify(data.data));
        return;
      }
    })
    .catch((error) => {
      notification["error"]({
        message: error,
      });
    });
};
const newArrailval = () => {
  console.log("....email...login.... ${apibaseurl}...",{apibaseurl})
  const data = Axios.post(
    `${apibaseurl}/api/customer/products-latest`,
    {

      
      category_id: "", 
      page_url: "https://products/us/img", 
      low_to_high: "0", 
      limit: 10, 
      subcategory_id: "0",
       brand_id: "0",
        device_id: getDeviceId,
         latest: "0", 
         os_type: "web", 
         access_token: "",
          high_to_low: "0", 
          lang_id: 1, 
          popular: "0",
          offset: 0
    
      // access_token: user_token,
      // lang_id: 1,
      // device_id: getDeviceId,
      // page_url: "http://localhost:3000/product/2",
      // os_type: "WEB",
    })
    .then((response) => response.data)
    .then((data) => {
      console.log("...newArrailval.",data)
  //    console.log("....email...login.... response...",response)
      if (data.httpcode == 400 && data.status == "error") {
        // notification["error"]({
        //   message: data.message,
        // });
        // return;
      }
      if (data.httpcode == 200 && data.status == "success") {
       setNewArrData(data.data)
        // notification["success"]({
        //   message: data.message,
        // });
       // localStorage.setItem("user", JSON.stringify(data.data));
        return;
      }
    })
    .catch((error) => {
      // notification["error"]({
      //   message: error,
      // });
    });
};
  const offer = () => {
    console.log("....email...login.... ${apibaseurl}...",{apibaseurl})
    const data = Axios.post(
      `${apibaseurl}/api/customer/offer/list`)
      .then((response) => response.data)
      .then((data) => {
        console.log("...offerrrrrrrrrrrr.",data)
    //    console.log("....email...login.... response...",response)
        if (data.httpcode == 400 && data.status == "error") {
          // notification["error"]({
          //   message: data.message,
          // });
          // return;
        }
        if (data.httpcode == 200 && data.status == "success") {
          setOfferData(data.data)
          // notification["success"]({
          //   message: data.message,
          // });
         // localStorage.setItem("user", JSON.stringify(data.data));
          return;
        }
      })
      .catch((error) => {
        notification["error"]({
          message: error,
        });
      });
  };
  const { homedata } = useSelector((state) => state.home);
  useEffect(() => {
    console.log("...homedata....",homedata)
    if (homedata == null) {
      loadHomedata();
    } else {
      setHomeitems(homedata);
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }

offer()
featuredProduct()
newArrailval()
  }, [homedata]);

  return (
    <Spin spinning={loading}>
      <ContainerHomeDefault title="Big Basket">
        <HomeDefaultBanner homeitems={homeitems} loading={loading} />
        {/* <MarketPlace3SearchTrending /> */}
        {/* <SiteFeatures /> */}
         {!loading && homeitems && homeitems?.category?.length > 0 && (
          <ShopByCategory
            collectionSlug="deal-of-the-day"
            homeitems={homeitems}
            loading={loading}
          />
        )}
        <TrendingNow homeitems={homeitems}/>
        {/* <Homecategories homeitems={homeitems} loading={loading} /> */}
        {!loading && homeitems && homeitems?.shocking_sale?.length > 0 && (
          <Shockingsale
            collectionSlug="deal-of-the-day"
            homeitems={homeitems}
            loading={loading}
          />
        )}
       

      
           <Advert  homeitems={homeitems} loading={loading}/>

           {!loading && homeitems && homeitems?.new_arrivals?.length > 0 && (
          <NewDealsDaily
            collectionSlug="deal-of-the-day"
            homeitems={getNewArrData}
            loading={loading}
          />
        )}
        {/* {!loading && homeitems && homeitems?.featured_products?.length > 0 && (
          <Featureproducts
            collectionSlug="consumer-electronics"
            title="Feature products"
            homeitems={homeitems}
            loading={loading}
          />
        )} */}
        <FeatureAndRecent homeitems={homeitems} getFeatureProduct={getFeatureProduct} loading={loading}/>
        <Discount getOfferData={getOfferData} loading={loading}/>
        <BottomCategory homeitems={homeitems} loading={loading}/>
        <Brand homeitems={homeitems} loading={loading}/>
        {/* {!loading && homeitems && homeitems?.auction?.length > 0 && (
          <Homeauction homeitems={homeitems} />
        )} */}
        {/* <Bestseller homeitems={homeitems} /> */}
        {/* <DownLoadApp /> */}
        {/* <Newletters /> */}
        <div className="top-stories">
          <div className="ps-container">
            <FooterLinks />
          </div>
        </div>
      </ContainerHomeDefault>
    </Spin>
  );
};

export default HomepageDefaultPage;
