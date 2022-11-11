import React, { useEffect, useState } from "react";
import { LocationOn } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { updateSelectedAddress } from "~/store/cart/action";
import { Radio, Input, Space, Button, Modal } from "antd";
import { useSelector } from "react-redux";
import AddressModal from "./modal/AddressModal";

const DisplayAddress = ({ address }) => {
  const dispatch = useDispatch();
  const {
    selectedAddress,
  } = useSelector((state) => state.cart);
  const [selected_address, setSelectedAddress] = useState({});
  const [current_selected_address, setCurrentSelectedAddress] = useState({});

  const [changeAddress, setChangeAddress] = useState(false);

  const addressFilter = (is_default, address_id) => {
    console.log("....333333.....",is_default)
    console.log("....22222.....",address_id)
    console.log("....111111.....",address)
    let address_select = address.filter(
      (address) =>
        address.is_default === is_default || address.id === address_id
    )[0];
  
    return address_select;

  };

  useEffect(() => {
    console.log("....00000.....",selectedAddress)

  //  dispatch(updateSelectedAddress(selectedAddress));
   // console.log("....444444.....",addressFilter(1, null))
    // let address_default = addressFilter(1, null);
    // setSelectedAddress(address_default);
    // setCurrentSelectedAddress(address_default);
    // dispatch(updateSelectedAddress(address_default));
    let isMounted = true;
    if (isMounted) {
     // alert("1")
      let address_default = addressFilter(1, null);
      console.log("xxxxxxxx", address_default)
      setSelectedAddress(address_default);
      setCurrentSelectedAddress(address_default);
      dispatch(updateSelectedAddress(address_default));
     // return true;
   
    }
    else{
   //   alert("2")
      let address_default = addressFilter(1, null);
      console.log("yyyyyyyyy", address_default)
      dispatch(updateSelectedAddress(address_default));

    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleChangeView = (e) => {
    setChangeAddress(true);
  };

  const onSelectAddress = (e) => {
    let radioAddress = address.filter((item) => item.id === e.target.value)[0];
    setSelectedAddress({ ...radioAddress });
    console.log(".....fff...............",radioAddress)
  };

  return (
    <>
      {changeAddress === false ? (
        <div>
          <p className="text-danger " style={{ fontSize: "18px" }}>
            <LocationOn fontSize="large" /> Delivery Address
          </p>
          <p>
            <span className="font-weight-bold mr-4">
              {current_selected_address.name} {current_selected_address.phone}
            </span>
            <span>
              {current_selected_address.address1}{" "}
              {current_selected_address.address2},{" "}
              {current_selected_address.city}, {current_selected_address.state}-
              {current_selected_address.pincode}{" "}
              {current_selected_address.country}
            </span>

            <span
              className="ml-5 mr-5 font-weight-bold"
              style={{ fontSize: "12px" }}
            >
              {current_selected_address.is_default ? "Default" : ""}
            </span>
            <span
              className="text-danger"
              onClick={handleChangeView}
              style={{ cursor: "pointer" }}
            >
              Change
            </span>
          </p>
        </div>
      ) : (
        <div>
          <div className="p-2 float-right">
            <AddressModal />
          </div>
          <p className="text-danger " style={{ fontSize: "18px" }}>
            <LocationOn fontSize="large" /> Delivery Address
          </p>
          {address && address.length > 0 ? (
            <>
              <div className="ml-2">
                <Radio.Group
                  onChange={onSelectAddress}
                  value={selected_address.id}
                  defaultChecked={current_selected_address.id}
                  buttonStyle="outlined"
                >
                  <Space direction="vertical">
                    {address.map((item, index) => {
                      return (
                        <Radio value={item.id} key={index}>
                          <div className="row">
                            <div
                              style={{ width: "20rem", marginLeft: "1.5rem" }}
                            >
                              <span className="font-weight-bold">
                                {item.name} {item.phone}
                              </span>
                            </div>
                            <div>
                              <span className="">
                                {item.address1} {item.address2}, {item.city},{" "}
                                {item.state}-{item.pincode} {item.country}
                              </span>
                            </div>
                            <span
                              className="ml-5 mr-5 font-weight-bold"
                              style={{ fontSize: "12px", marginTop: "3px" }}
                            >
                              {item.is_default ? "Default" : ""}
                            </span>
                          </div>
                        </Radio>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </div>
              <div className="ml-1 mt-4 p-2">
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    setChangeAddress(false);
                    setCurrentSelectedAddress({ ...selected_address });
                    dispatch(updateSelectedAddress(selected_address));
                    return true;
                  }}
                >
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    setChangeAddress(false);

                    return false;
                  }}
                  className="ml-4"
                  danger
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            "No address found. Please add address!"
          )}
        </div>
      )}
    </>
  );
};

export default DisplayAddress;
