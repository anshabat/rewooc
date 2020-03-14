import React from "react";
import connectPage from "../connectPage";
import CartTable from "../../components/shop/cart/CartTable/CartTable";
import {loadCartPage} from "../../redux/actionCreators";
import Content from "../../components/Layout/Content/Content";
import ContentLoader from "../../components/UI/loaders/ContentLoader/ContentLoader";

class Cart extends React.Component {

  render() {
    const {cart} = this.props;

    if (cart.loading) return <ContentLoader/>;

    return (
      <Content title={cart.title}>
        {cart.items.length > 0 ? (
          <CartTable items={cart.items}/>
        ) : (
          <p>Cart is empty</p>
        )}
      </Content>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart
});

const mapDispatchToProps = dispatch => {
  return {
    loadPage: (url) => dispatch(loadCartPage(url))
  }
};

export default connectPage(mapStateToProps, mapDispatchToProps)(Cart);