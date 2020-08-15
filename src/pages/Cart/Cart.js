import React from "react";
import connectPage from "../connectPage";
import CartTable from "../../components/shop/cart/CartTable/CartTable";
import {loadCartPage} from "../../actions/loadCartPage";
import Content from "../../components/Layout/Content/Content";
import ContentLoader from "../../components/UI/loaders/ContentLoader/ContentLoader";
import {selectCartItems} from "../../selectors";

class Cart extends React.Component {

  render() {
    const {title, loading, cartItems} = this.props;

    if (loading) return <ContentLoader/>;

    //console.log(cartItems)

    return (
      <Content title={title}>
        {cartItems.length > 0 ? (
          <CartTable items={cartItems}/>
        ) : (
          <p>Cart is empty</p>
        )}
      </Content>
    )
  }
}


const mapStateToProps = state => ({
  title: state.cart.title,
  loading: state.cart.loading,
  cartItems: selectCartItems(state)
});

const mapDispatchToProps = dispatch => {
  return {
    loadPage: (url) => dispatch(loadCartPage(url))
  }
};

export default connectPage(mapStateToProps, mapDispatchToProps)(Cart);