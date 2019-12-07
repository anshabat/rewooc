import React from "react";
import {connect} from "react-redux";
import Content from "../../components/Layout/Content/Content";
import withPageData from "../withPageData";
import CartTable from "../../components/shop/cart/CartTable/CartTable";

function Cart({title, cart}) {
  return (
    <Content title={title}>
      {cart.products.length > 0 ? (
        <CartTable products={cart.products}/>
      ) : (
        <p>Cart is empty</p>
      )}
    </Content>
  );
}

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(
  withPageData(Cart)
);