import React, { useState } from "react";

import { Input, Button, Modal, Form, message, Tooltip } from "antd";
import { useRouter } from "next/router";
import CartRepository from "~/repositories/CartRepository";
import { useSelector, useDispatch } from "react-redux";
import {
  appliedSellerVoucher,
  sellerWiseDiscount,
  totalDiscount,
} from "~/store/cart/action";
import { addCurrency, subCurrency } from "~/utilities/product-helper";

const VoucherModal = ({ seller_title, seller_product_detail }) => {
  const dispatch = useDispatch();
  const { products } = seller_product_detail;
  const Router = useRouter();
  const { access_token } = useSelector((state) => state.auth);
  const { total_discount, applied_voucher, seller_wise_discount } = useSelector(
    (state) => state.cart
  );

  const [voucherText, setVoucherText] = useState("");
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [applyButtonLoadin, setApplyButtonLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  let cart_value_of_seller =
    products?.length > 0
      ? products.reduce((prev_val, next) => {
          return (
            Number(prev_val) +
            Number(
              next.total_discount_price == 0
                ? next.total_actual_price
                : next.total_discount_price
            )
          );
        }, 0)
      : 0;

  const showModal = (showVal) => {
    setVisible(showVal);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = (event) => {
    setVoucherText(event.target.value);
  };

  const handleApplyVoucher = async () => {
    setApplyButtonLoading(true);
    let payload = {
      lang_id: "",
      access_token,
      coupon_code: voucherText,
      seller_id: seller_product_detail.seller_id,
    };

    if (
      applied_voucher
        .map((voucher) => voucher.coupon_code)
        .includes(voucherText)
    ) {
      message.error("Coupon Already Applied!");
      setTimeout(() => {
        setApplyButtonLoading(false);
      }, 1000);
      return false;
    }

    const response = await CartRepository.checkSellerVoucher(payload);
    if (response.httpcode == 200 && response.status == "success") {
      let coupon_data = response.data.coupon;

      if (cart_value_of_seller > Number(coupon_data.minimum_purchase)) {
        if (coupon_data.offer_type == "discount") {
          if (coupon_data.offer_value_in == "amount") {
            let totaladdExact = addCurrency(
              total_discount,
              coupon_data.offer_value
            );
            dispatch(totalDiscount(totaladdExact));
          }
        }

        dispatch(
          appliedSellerVoucher([
            ...applied_voucher,
            {
              seller_name: seller_product_detail.seller,
              seller_id: seller_product_detail.seller_id,
              discount_amt: coupon_data.offer_value,
              discount_type: coupon_data.offer_type,
              is_coupon: true,

              coupon_id: coupon_data.coupon_id,
              coupon_code: coupon_data.coupon_code,
              coupon_name: coupon_data.title,
              coupon_offer: coupon_data.offer,
              coupon_offer_value: coupon_data.offer_value,
              coupon_offer_value_in: coupon_data.offer_value_in,
              coupon_offer_type: coupon_data.offer_type,
            },
          ])
        );

        message.success("Coupon Applied Successfully", 5);
        setTimeout(() => {
          form.resetFields();
          setVoucherText("");
          showModal(false);
        }, 500);
      } else {
        message.error(
          `Minimum cart balance should be greater than ${coupon_data.minimum_purchase}`,
          10
        );
      }
      setTimeout(() => {
        setApplyButtonLoading(false);
      }, 1000);
    } else {
      message.error("Error While Applying Coupon", 5);
      setTimeout(() => {
        setApplyButtonLoading(false);
      }, 1000);
    }
    setTimeout(() => {
      setApplyButtonLoading(false);
    }, 1000);
  };

  const removeVoucher = () => {
    let array_after_remove_voucher = applied_voucher?.filter(
      (voucher) => voucher.seller_name !== seller_title
    );

    let array_voucher_detail = applied_voucher?.filter(
      (voucher) => voucher.seller_name == seller_title
    )[0];

    if (array_voucher_detail.coupon_offer_type == "discount") {
      if (array_voucher_detail.coupon_offer_value_in == "amount") {
        let totalSubExact = subCurrency(
          total_discount,
          array_voucher_detail.coupon_offer_value
        );
        dispatch(totalDiscount(totalSubExact));
      }
    }

    setTimeout(() => {
      dispatch(appliedSellerVoucher(array_after_remove_voucher));
      message.success("Voucher Removed Successfully!");
    }, 500);
  };

  return (
    <>
      {applied_voucher
        .map((voucher) => voucher.seller_name)
        .includes(seller_title) ? (
        <>
          <Tooltip title={"Remove Applied Coupon"}>
            <span
              style={{ color: "rgb(255, 0, 0)", cursor: "pointer" }}
              onClick={removeVoucher}
            >
              X
            </span>
          </Tooltip>
        </>
      ) : (
        <span
          style={{ color: "rgb(255, 0, 0)", cursor: "pointer" }}
          onClick={() => showModal(true)}
        >
          More Vouchers
        </span>
      )}

      <Modal
        title={seller_title}
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
                    placeholder="Enter Store Voucher"
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

export default VoucherModal;
