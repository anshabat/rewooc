import "./CartTable.scss";
import React, {Fragment} from "react";
import Icon from "../../../UI/Icon/Icon";
import CartProduct from "../CartProduct/CartProduct";
import QuantityField from "../QuantityField/QuantityField";
import withPriceFormat from "../../Price/withPriceFormat";
import {getCartTotalPrice} from "../../../../redux/utils";
import {connect} from "react-redux";
import {deleteFromCart, setCartProductQuantity} from "../../../../redux/actionCreators";

function CartTable(props) {
  const {
    items,
    formatPrice,
    deleteFromCart,
    setCartProductQuantity,
    deletingProduct,
    changingQuantity
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
                {/*<CartProduct product={item.products[0]}/>*/}
              </div>
              <div className="rw-cart-table__quantity">
                <QuantityField
                  value={item.quantity}
                  onBlur={(e) => setCartProductQuantity(item.key, e.target.value)}
                  disabled={changingQuantity}
                  hasChanged={item.key === changingQuantity}
                />
              </div>
              <div className="rw-cart-table__price">
                {formatPrice(item.totalPrice)}
              </div>
            </Fragment>
          )
        })}
      </div>
      <div style={{textAlign: "right", fontWeight: "bold", marginTop: "20px"}}>
        Total: {formatPrice(getCartTotalPrice(items))}
      </div>
    </>
  );
}

const mapStateToProps = ({cart}) => ({
  deletingProduct: cart.deletingProductKey,
  changingQuantity: cart.changingQuantityKey
});

const mapDispatchToProps = {deleteFromCart, setCartProductQuantity};

export default connect(mapStateToProps, mapDispatchToProps)(
  withPriceFormat(CartTable)
);