import "./CartTable.scss";
import React, {Fragment} from "react";
import Icon from "../../../UI/Icon/Icon";
import CartProduct from "../CartProduct/CartProduct";
import QuantityField from "../QuantityField/QuantityField";
import {selectCartTotalPrice} from "../../../../selectors";
import {connect} from "react-redux";
import {deleteFromCart} from "../../../../actions/cartActions";
import {setCartProductQuantity} from "../../../../actions/cartActions";
import Price from "../../Price/Price";

function CartTable(props) {
  const {
    items,
    deleteFromCart,
    setCartProductQuantity,
    deletingProduct,
    changingQuantity,
    total
  } = props;

  return (
    <>
      <div className="rw-cart-table">
        {items.map(item => {
          return (
            <Fragment key={item.key}>
              <div className="rw-cart-table__delete">
                <button className="rw-cart-table__delete-btn" onClick={() => {
                  deleteFromCart(item.key)
                }}>
                  {deletingProduct === item.key ? (
                    <Icon classes={["fa-circle-o-notch", "fa-spin"]}/>
                  ) : (
                    <Icon classes={["fa-times"]}/>
                  )}
                </button>
              </div>
              <div className="rw-cart-table__product">
                {item.product && <CartProduct product={item.product}/>}
              </div>
              <div className="rw-cart-table__quantity">
                {changingQuantity && <span>changing</span>}
                <QuantityField
                  value={item.quantity}
                  onBlur={(e) => setCartProductQuantity(item.key, e.target.value)}
                  disabled={changingQuantity}
                  hasChanged={item.key === changingQuantity}
                />
              </div>
              <div className="rw-cart-table__price">
                <Price value={item.totalPrice}/>
              </div>
            </Fragment>
          )
        })}
      </div>
      <div style={{textAlign: "right", fontWeight: "bold", marginTop: "20px"}}>
        Total: <Price value={total}/>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  deletingProduct: state.cart.deletingProductKey,
  changingQuantity: state.cart.changingQuantityKey,
  total: selectCartTotalPrice(state)
});

const mapDispatchToProps = {deleteFromCart, setCartProductQuantity};

export default connect(mapStateToProps, mapDispatchToProps)(CartTable);