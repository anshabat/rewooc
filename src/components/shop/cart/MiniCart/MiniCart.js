import "./MiniCart.scss";
import React from "react";
import Price from "../../Price/Price";
import {connect} from "react-redux";
import {selectCartTotalPrice, selectCartTotalQuantity} from "../../../../redux/cart/cartSelectors";

const MiniCart = (props) => {
  const {testAction} = props
  console.log('mini cart rerender')
  return (
      <div className="rw-mini-cart">
        Cart: {props.quantity} - <Price value={props.total}/>
        <button onClick={() => {
          testAction()
        }}>test
        </button>
      </div>
  );
};

const mapStateToProps = state => ({
  quantity: selectCartTotalQuantity(state),
  total: selectCartTotalPrice(state)
});

export default connect(mapStateToProps, {
  testAction: () => {
    return {type: 'TEST'}
  }
})(MiniCart);