import React, { useState, useEffect } from "react";
import SiteFeatures from "~/components/partials/homepage/home-default/SiteFeatures";
import TrendingNow from "~/components/partials/shop/ShopItems1";
import DownLoadApp from "~/components/partials/commons/DownLoadApp";
import ContainerHomeDefault from "~/components/layouts/ContainerHomeDefault";
import FeatureAndRecent from "~/components/partials/homepage/home-default/FeatureAndRecent";
import Advert from "~/components/partials/homepage/home-default/Advert";
import Discount from "~/components/partials/homepage/home-default/Discount";
import BottomCategory from "~/components/partials/homepage/home-default/BottomCategory";
import HomeDefaultBanner from "~/components/partials/homepage/home-default/HomeDefaultBanner";
import Homecategories from "~/components/partials/homepage/category/homecategories";
import NewDealsDaily from "~/components/partials/homepage/new-deals-daily/newdealsdaily";
import ShopByCategory from "~/components/partials/homepage/new-deals-daily/newdealsdaily1";
import Shockingsale from "~/components/partials/homepage/shockingsale/shockingsale";
import Featureproducts from "~/components/partials/homepage/featureproducts/featureproducts";
import Homeauction from "~/components/partials/homepage/auction/auction";
import Bestseller from "~/components/partials/homepage/home-default/Bestseller";

import FooterLinks from "~/components/shared/footers/modules/FooterLinks";

import { getHomedata } from "~/utilities/home-helper";
import { useRouter } from "next/router";
import { getHomeSuccess } from "~/store/home/action";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

const HomepageDefaultPage = () => {
  const [homeitems, setHomeitems] = useState([]);
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

  const { homedata } = useSelector((state) => state.home);
  useEffect(() => {
    if (homedata == null) {
      loadHomedata();
    } else {
      setHomeitems(homedata);
      setTimeout(() => {
        setLoading(false);
      }, 250);
    }
  }, [homedata]);

  return (
    <Spin spinning={loading}>
      <ContainerHomeDefault title="Big Basket">
        <HomeDefaultBanner homeitems={homeitems} loading={loading} />
        {/* <MarketPlace3SearchTrending /> */}
        {/* <SiteFeatures /> */}
         {!loading && homeitems && homeitems?.daily_deals?.length > 0 && (
          <ShopByCategory
            collectionSlug="deal-of-the-day"
            homeitems={homeitems}
            loading={loading}
          />
        )}
        <TrendingNow />
        {/* <Homecategories homeitems={homeitems} loading={loading} /> */}

        {!loading && homeitems && homeitems?.daily_deals?.length > 0 && (
          <NewDealsDaily
            collectionSlug="deal-of-the-day"
            homeitems={homeitems}
            loading={loading}
          />
        )}

        {!loading && homeitems && homeitems?.shocking_sale?.length > 0 && (
          <Shockingsale
            collectionSlug="deal-of-the-day"
            homeitems={homeitems}
            loading={loading}
          />
        )}
           <Advert/>
        {!loading && homeitems && homeitems?.featured_products?.length > 0 && (
          <Featureproducts
            collectionSlug="consumer-electronics"
            title="New Arrivals"
            homeitems={homeitems}
            loading={loading}
          />
        )}
        <FeatureAndRecent/>
        <Discount/>
        <BottomCategory/>
        {!loading && homeitems && homeitems?.auction?.length > 0 && (
          <Homeauction homeitems={homeitems} />
        )}
        <Bestseller homeitems={homeitems} />
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
