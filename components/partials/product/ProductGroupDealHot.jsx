import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { getProductsByCollectionHelper } from '~/utilities/strapi-fetch-data-helpers';
import { carouselSingle } from '~/utilities/carousel-helpers';
import ProductDealHot from '~/components/elements/products/ProductDealHot';
import ProductHorizontal from '~/components/elements/products/ProductHorizontal';
const ProductGroupDealHot = ({ collectionSlug }) => {
    const sliderRef = useRef(null);
    const [productItems, setProductItems] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getProducts() {
        setLoading(true);
        const responseData = await getProductsByCollectionHelper(
            collectionSlug
        );
        if (responseData) {
            setProductItems(responseData.items);
            setTimeout(
                function () {
                    setLoading(false);
                }.bind(this),
                250
            );
        }
    }

    const handleCarouselPrev = (e) => {
        e.preventDefault();
        sliderRef.current.slickPrev();
    };

    const handleCarouselNext = (e) => {
        e.preventDefault();
        sliderRef.current.slickNext();
    };

    useEffect(() => {
        getProducts();
    }, []);

    let productItemsView, relatedView;
    if (!loading) {
        if (productItems && productItems.length > 0) {
            const slideItems = productItems.map((item) => (
                <ProductDealHot product={item} key={item.id} />
            ));
            const relatedItems = productItems.map((item, index) => {
                if (index > 1 && index < 6) {
                    return <ProductHorizontal product={item} key={item.id} />;
                }
            });
            productItemsView = (
                <Slider
                    ref={(slider) => (sliderRef.current = slider)}
                    {...carouselSingle}
                    fade={true}
                    className="ps-carousel">
                    {slideItems}
                </Slider>
            );
            relatedView = (
                <Slider {...carouselSingle}>
                    <div className="ps-product-group" key="group-1">
                        {relatedItems}
                    </div>
                </Slider>
            );
        } else {
            productItemsView = <p>No product found.</p>;
        }
    } else {
        productItemsView = <p>Loading...</p>;
    }

    return (
        <div className="ps-deal-hot">
            <div className="ps-container">
                <div className="row">
                    <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12 ">
                        <div className="ps-block--deal-hot" data-mh="dealhot">
                            <div className="ps-block__header">
                                <h3>New Deals Daily</h3>
                                <div className="ps-block__navigation">
                                    <a
                                        className="ps-carousel__prev"
                                        href="#"
                                        onClick={(e) => handleCarouselPrev(e)}>
                                        <i className="icon-chevron-left"></i>
                                    </a>
                                    <a
                                        className="ps-carousel__next"
                                        href=".ps-carousel--deal-hot"
                                        onClick={(e) => handleCarouselNext(e)}>
                                        <i className="icon-chevron-right"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="ps-product__content">
                                {productItemsView}
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 ">
                        <aside
                            className="widget widget_best-sale"
                            data-mh="dealhot">
                            <h3 className="widget-title">Top Best Seller</h3>
                            <div className="widget__content">{relatedView}</div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductGroupDealHot;
