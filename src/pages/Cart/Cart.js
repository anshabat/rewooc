import React from "react";
import connectPage from "../connectPage";
import CartTable from "../../components/shop/cart/CartTable/CartTable";
import {loadCartPage} from "../../redux/cart/cartActions";
import Content from "../../components/Layout/Content/Content";
import ContentLoader from "../../components/UI/loaders/ContentLoader/ContentLoader";
import {selectCartData} from "../../redux/cart/cartSelectors";

class Cart extends React.Component {

  render() {
    const {title, loading, cartData} = this.props;

    if (loading) return <ContentLoader/>;

    console.log('cart rendered')

    return (
      <Content title={title}>
        {cartData.length > 0 ? (
          <CartTable items={cartData}/>
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
  cartData: selectCartData(state)
});

const mapDispatchToProps = dispatch => {
  return {
    loadPage: (url) => dispatch(loadCartPage(url))
  }
};

export default connectPage(mapStateToProps, mapDispatchToProps)(Cart);