import "./MiniCart.scss";
import React from "react";
import Price from "../../Price/Price";
import {useSelector} from "react-redux";
import {selectCartTotalPrice, selectCartTotalQuantity} from "../../../../redux/cart/cartSelectors";

function MiniCart() {
  const quantity = useSelector(selectCartTotalQuantity)
  const total = useSelector(selectCartTotalPrice)

  return (
    <div className="rw-mini-cart">
      Cart: {quantity} - <Price value={total}/>
    </div>
  )
}

export default MiniCart;