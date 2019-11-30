import "./CartTable.scss";
import React, {Fragment} from "react";
import Icon from "../../../UI/Icon/Icon";
import CartProduct from "../CartProduct/CartProduct";
import QuantityField from "../QuantityField/QuantityField";
import priceProvider from "../../Price/priceProvider";
import {getCartTotalPrice} from "../../../../redux/utils";
import {connect} from "react-redux";
import {deleteFromCart, setCartProductQuantity} from "../../../../redux/actionCreators";

function CartTable(props) {
  const {
    products,
    formatPrice,
    deleteFromCart,
    setCartProductQuantity,
    deletingProduct,
    changingQuantity
  } = props;

  return (
    <>
      <div className="rw-cart-table">
        {products.map(product => {
          return (
            <Fragment key={product.key}>
              <div className="rw-cart-table__delete">
                <button className="rw-cart-table__delete-btn" onClick={() => {
                  deleteFromCart(product.key)
                }}>
                  {deletingProduct === product.key ? (
                    <Icon classes={["fa-circle-o-notch", "fa-spin"]}/>
                  ) : (
                    <Icon classes={["fa-times"]}/>
                  )}
                </button>
              </div>
              <div className="rw-cart-table__product">
                <CartProduct product={product}/>
              </div>
              <div className="rw-cart-table__quantity">
                <QuantityField
                  product={product}
                  value={product.quantity}
                  onBlur={(e) => setCartProductQuantity(product.key, e.target.value)}
                  type="number"
                  disabled={changingQuantity}
                  hasChanged={product.key === changingQuantity}
                />
              </div>
              <div className="rw-cart-table__price">
                {formatPrice(product.price * product.quantity)}
              </div>
            </Fragment>
          )
        })}
      </div>
      <div style={{textAlign: "right", fontWeight: "bold", marginTop: "20px"}}>
        Total: {formatPrice(getCartTotalPrice(products))}
      </div>
    </>
  );
}

const mapStateToProps = ({cart}) => ({
  deletingProduct: cart.deletingProductKey,
  changingQuantity: cart.changingQuantityKey
});

export default connect(mapStateToProps, {deleteFromCart, setCartProductQuantity})(priceProvider(CartTable));