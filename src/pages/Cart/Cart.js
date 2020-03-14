import React from "react";
import withPageData2 from "../withPageData2";
import CartTable from "../../components/shop/cart/CartTable/CartTable";
import {loadPage} from "../../redux/actionCreators";

class Cart extends React.Component {

  render() {
    const {cartItems} = this.props;
    return cartItems.length > 0 ? (
      <CartTable items={cartItems} />
    ) : (
      <p>Cart is empty</p>
    );
  }
}

const mapStateToProps = state => ({
  cartItems: state.cart.items,
  page: state.page
});

const mapDispatchToProps = dispatch => {
  return {
    loadPage: (url) => dispatch(loadPage(url))
  }
};

export default withPageData2(mapStateToProps, mapDispatchToProps)(Cart);