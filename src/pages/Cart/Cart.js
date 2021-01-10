import React from "react";
import {useSelector} from "react-redux";
import connectPage from "../connectPage";
import CartTable from "../../components/shop/cart/CartTable/CartTable";
import {loadCartPage} from "../../redux/cart/cartActions";
import Content from "../../components/Layout/Content/Content";
import ContentLoader from "../../components/UI/loaders/ContentLoader/ContentLoader";
import {selectCartData} from "../../redux/cart/cartSelectors";

const Cart = () => {
  const {title, loading, cartData} = useSelector(state => {
    return {
      title: state.cart.title,
      loading: state.cart.loading,
      cartData: selectCartData(state)
    }
  });

  if (loading) return <ContentLoader/>;

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

export default connectPage(loadCartPage)(Cart);