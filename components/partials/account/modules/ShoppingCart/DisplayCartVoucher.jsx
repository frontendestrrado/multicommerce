import React from "react";
import VoucherModal from "./Modal/VoucherModal";
import { useSelector, useDispatch } from "react-redux";

const DisplayCartVoucher = ({ product_seller }) => {
  const { total_discount, applied_voucher } = useSelector(
    (state) => state.cart
  );

  return (
    <div
      className="prdt-vou p-4"
      style={{
        background: "#fffaf9",
        borderTop: "1px dashed",
      }}
    >
      {product_seller?.coupon?.length > 0 ? (
        <>
          <div className="vouch">
            {applied_voucher
              ?.map((voucher) => voucher.seller_name)
              .includes(product_seller.seller) ? (
              <>
                {
                  applied_voucher?.filter(
                    (voucher) => voucher.seller_name == product_seller.seller
                  )[0]?.coupon_offer
                }{" "}
                voucher applied
              </>
            ) : (
              <>{product_seller.coupon[0].offer} voucher available</>
            )}
          </div>
          <div className="mor-vou">
            <VoucherModal
              seller_title={product_seller.seller}
              seller_product_detail={product_seller}
            />
          </div>
        </>
      ) : (
        "No Coupon Available"
      )}
    </div>
  );
};

export default DisplayCartVoucher;
