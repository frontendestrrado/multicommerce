import { Checkbox } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { totalDiscount, usedWalletAmount } from "~/store/cart/action";
import {
  addCurrency,
  currencyHelperConvertToRinggit,
  subCurrency,
} from "~/utilities/product-helper";

const DisplayWalletBalance = () => {
  const { cart, total_discount, used_wallet_amount_detail } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const handleUseWalletBalance = (e) => {
    let wallet_payload = {
      wallet_used: false,
    };
    if (e.target.checked) {
      wallet_payload = {
        wallet_used: e.target.checked,
        wallet_balance: cart.wallet_balance,
      };
      let totaladdExact = addCurrency(total_discount, cart.wallet_balance);
      dispatch(totalDiscount(totaladdExact));
    } else {
      wallet_payload = {
        wallet_used: e.target.checked,
      };
      let totalsubExact = subCurrency(total_discount, cart.wallet_balance);
      dispatch(totalDiscount(totalsubExact));
    }
    dispatch(usedWalletAmount(wallet_payload));
  };

  return (
    <>
      {cart.wallet_balance == false ? (
        <>
          <div className="coin-bal">
            <div className="insuf">Insufficient Coins Balance</div>
          </div>
          <div className="coin-coun">RM0.00</div>
        </>
      ) : (
        <>
          <div className="coin-bal">
            <div className="lft-spc">
              <Checkbox
                onChange={handleUseWalletBalance}
                checked={used_wallet_amount_detail.wallet_used}
              >
                <div className="insuf">Use Coins Balance</div>
              </Checkbox>
            </div>
          </div>
          <div className="coin-coun">
            {currencyHelperConvertToRinggit(cart.wallet_balance)}
          </div>
        </>
      )}
    </>
  );
};

export default DisplayWalletBalance;
