import React, { useState, useEffect } from "react";

import { Input, Button, Modal, Form, message, Tooltip } from "antd";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import {
  appliedPlatformVoucher,
  fetchPlatformVoucherAction,
  totalDiscount,
} from "~/store/cart/action";
import CartRepository from "~/repositories/CartRepository";
import {
  addCurrency,
  subCurrency,
  priceHelper,
  mathFormula,
  divCurrency,
  mulCurrency,
} from "~/utilities/product-helper";

const DisplayPlatformVoucher = ({}) => {
  const Router = useRouter();
  const { access_token } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(fetchPlatformVoucherAction());
  // }, []);

  const dispatch = useDispatch();
  const { applied_platform_voucher, total_discount, cart } = useSelector(
    (state) => state.cart
  );

  const [platformVoucherText, setPlatformVoucherText] = useState("");
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [applyButtonLoadin, setApplyButtonLoading] = useState(false);

  const showModal = (showVal) => {
    setVisible(showVal);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = (event) => {
    setPlatformVoucherText(event.target.value);
  };

  const handleApplyVoucher = async () => {
    setApplyButtonLoading(true);

    let payload = {
      lang_id: "",
      access_token,
      coupon_code: platformVoucherText,
    };

    let response = await CartRepository.checkPlatformVoucher(payload);

    if (response.httpcode == 200 && response.status == "success") {
      let coupon_data = response.data.coupon;

      if (cart.grand_total > coupon_data.minimum_purchase) {
        let discount_amount;

        if (coupon_data.offer_type == "discount") {
          if (coupon_data.offer_value_in == "percentage") {
            discount_amount = divCurrency(
              mulCurrency(cart.grand_total, coupon_data.offer_value),
              100
            );

            let totaladdExact = addCurrency(total_discount, discount_amount);

            dispatch(totalDiscount(totaladdExact));
          }
        }
        dispatch(
          appliedPlatformVoucher({
            ...coupon_data,
            is_platform_coupon: true,
            discount_amount,
          })
        );

        message.success("Platform Coupon Applied!", 5);
        setTimeout(() => {
          form.resetFields();
          setApplyButtonLoading(false);
          setPlatformVoucherText("");
          showModal(false);
        }, 500);
        return;
      } else {
        message.error(
          `Minimum cart balance should be greater than ${coupon_data.minimum_purchase}`,
          10
        );
        setTimeout(() => {
          form.resetFields();
          setApplyButtonLoading(false);
          setPlatformVoucherText("");
          showModal(false);
        }, 500);
      }
      return false;
    } else {
      message.error("No coupon Found!");
      setTimeout(() => {
        setApplyButtonLoading(false);
        form.resetFields();
        setPlatformVoucherText("");
      }, 1000);
    }
  };

  const removePlatformVoucher = () => {
    let discountPercentageAmount;
    if (applied_platform_voucher.offer_type == "discount") {
      if (applied_platform_voucher.offer_value_in == "percentage") {
        discountPercentageAmount = divCurrency(
          mulCurrency(cart.grand_total, applied_platform_voucher.offer_value),
          100
        );

        let totalsubExact = subCurrency(
          total_discount,
          discountPercentageAmount
        );

        dispatch(totalDiscount(totalsubExact));
      }
    }

    dispatch(appliedPlatformVoucher({ is_platform_coupon: false }));
    return false;
  };

  return (
    <>
      {applied_platform_voucher?.offer ? (
        <Tooltip title={"Remove Applied Coupon"}>
          <div className="plt-vchrs" onClick={removePlatformVoucher}>
            {applied_platform_voucher.offer} voucher applied{" "}
            <span
              style={{ color: "rgb(255, 0, 0)", cursor: "pointer" }}
              onClick={removePlatformVoucher}
            >
              X
            </span>
          </div>
        </Tooltip>
      ) : (
        <div className="plt-vchrs" onClick={() => showModal(true)}>
          Apply your exclusive vouchers!
        </div>
      )}
      <Modal
        title={`Kangtao Voucher`}
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={false}
      >
        <Form
          form={form}
          className="ps-form--account-setting"
          onSubmit={handleApplyVoucher}
          layout="inline"
          size="small"
        >
          <div className="row p-2">
            <div className="col-sm-9">
              <div className="form-group">
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: false,
                      message: "Please input your voucher!",
                    },
                  ]}
                  label={`Add Voucher`}
                >
                  <Input
                    className="form-control"
                    type="text"
                    placeholder="Enter Kangtao Voucher code"
                    onChange={handleChange}
                    style={{ height: "40px" }}
                  />
                </Form.Item>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="form-group">
                <Button
                  size="large"
                  danger
                  onClick={handleApplyVoucher}
                  loading={applyButtonLoadin}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default DisplayPlatformVoucher;
