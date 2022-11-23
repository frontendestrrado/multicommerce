import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification, Spin, Tooltip } from "antd";
import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import { Select, Input } from "antd";
import OrdersList from "./modules/MyOrder/partials/OrdersList";
import { getMyOrders, getUserPurchaseYear } from "~/store/account/action";

const { Search } = Input;
const { Option } = Select;

const MyOrder = () => {
  const dispatch = useDispatch();
  const { access_token } = useSelector((state) => state.auth);
  const { user_purchase_years } = useSelector((state) => state.account);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    let payload = {
      access_token,
      lang_id:localStorage.getItem("langId"),
      year:
        user_purchase_years && user_purchase_years?.length > 0
          ? user_purchase_years[0]
          : "",
      order_status: "",
      search: "",
    };
    access_token && dispatch(getUserPurchaseYear(payload));
    access_token && dispatch(getMyOrders(payload));
  }, [access_token]);

  useEffect(() => {
    let payload = {
      access_token,
      lang_id: localStorage.getItem("langId"),
      year:
        user_purchase_years && user_purchase_years?.length > 0
          ? user_purchase_years[0]
          : "",
      order_status: "",
      search: "",
    };
    access_token && dispatch(getUserPurchaseYear(payload));
  }, [user_purchase_years.length]);

  useEffect(() => {
    let payload = {
      access_token,
      lang_id:localStorage.getItem("langId"),
      year: selectedYear,
      order_status: selectedType,
      search: searchValue,
    };
    console.log(".....gg....g.g.g.g..g.g.g..g...",payload)
    access_token && dispatch(getMyOrders(payload));
  }, [selectedType, selectedYear, searchValue]);

  function handleSelectYearChange(value) {
    setSelectedYear(value);
  }

  function handleSelectOrderTypeChange(value) {
    setSelectedType(value);
  }

  const onSearchOrder = (value) => {
    setLoading(true);
    setSearchValue(value);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <section
        className="ps-my-account ps-page--account"
        style={{ paddingTop: "10rem", paddingBottom: "5rem" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-xl-3">
              <div className="ps-section__left">
                <AccountMenuSidebar activeModule="MyOrders" />
              </div>
            </div>
            <div className="col-xl-9">
              <div className="ps-page__content">
                <div className="ps-section--account-setting">
                  <div className="ps-section__content">
                    <figure className="ps-block--address">
                      <figcaption>
                        My Orders
                        <div
                          className="float-right row"
                          style={{ marginRight: "0px" }}
                        >
                          {/* <div className="mr-2 ml-2 d-none d-md-inline d-lg-inline d-xl-inline d-xxl-inline">
                            <Tooltip title={"Search by product name/order ID"}>
                              <Search
                                placeholder="product name/order ID"
                                onSearch={onSearchOrder}
                                style={{ width: 200 }}
                                loading={loading}
                              />
                            </Tooltip>
                          </div> */}
                          <div className="mr-2 ml-2 d-none d-md-inline d-lg-inline d-xl-inline d-xxl-inline">
                            <Tooltip title={"Year Of Purchase"}>
                              <Select
                                style={{ width: 120 }}
                                placeholder="Year Of Purchase"
                                onChange={handleSelectYearChange}
                              >
                                {user_purchase_years !== undefined &&
                                user_purchase_years?.length > 0 ? (
                                  user_purchase_years?.map((year) => (
                                    <Option value={year} key={year}>
                                      {year}
                                    </Option>
                                  ))
                                ) : (
                                  <Option value=""></Option>
                                )}
                              </Select>
                            </Tooltip>
                          </div>
                          <div className="d-none d-md-inline d-lg-inline d-xl-inline d-xxl-inline">
                            <Select
                              defaultValue=""
                              style={{ width: 120 }}
                              onChange={handleSelectOrderTypeChange}
                            >
                              <Option value="">All Orders</Option>
                              <Option value="cancelled">
                                Cancelled Orders
                              </Option>
                              <Option value="pending">Pending Orders</Option>
                              <Option value="returned">Returned Orders</Option>
                            </Select>
                          </div>
                        </div>
                      </figcaption>
                      <div
                        className="float-right row mb-4 d-md-none d-lg-none d-xl-none d-xxl-none"
                        style={{
                          marginRight: "0px",
                          flexDirection: "row-reverse",
                        }}
                      >
                        <div className="mr-2 ml-2 mb-4">
                          <Search
                            placeholder="Search"
                            onSearch={onSearchOrder}
                            style={{ width: "100%" }}
                            loading={loading}
                          />
                        </div>
                        <div className="mr-2 ml-2">
                          <Tooltip title={"Year Of Purchase"}>
                            <Select
                              style={{ width: 120 }}
                              placeholder="Year Of Purchase"
                              onChange={handleSelectYearChange}
                            >
                              {user_purchase_years?.length > 0 ? (
                                user_purchase_years?.map((year) => (
                                  <Option value={year} key={year}>
                                    {year}
                                  </Option>
                                ))
                              ) : (
                                <Option value=""></Option>
                              )}
                            </Select>
                          </Tooltip>
                        </div>
                        <div className="">
                          <Select
                            defaultValue=""
                            style={{ width: 120 }}
                            onChange={handleSelectOrderTypeChange}
                          >
                            <Option value="">All Orders</Option>
                            <Option value="cancelled">Cancelled Orders</Option>
                            <Option value="pending">Pending Orders</Option>
                            <Option value="returned">Returned Orders</Option>
                          </Select>
                        </div>
                      </div>
                      <div className="ps-block__content">
                        <OrdersList />
                      </div>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrder;
