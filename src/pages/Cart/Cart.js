import React from "react";
import connectPage from "../connectPage";
import CartTable from "../../components/shop/cart/CartTable/CartTable";
import {loadCartPage} from "../../redux/actionCreators";
import Content from "../../components/Layout/Content/Content";
import ContentLoader from "../../components/UI/loaders/ContentLoader/ContentLoader";

class Cart extends React.Component {

  render() {
    const {page} = this.props;

    if (page.loading) return <ContentLoader/>;

    return (
      <Content title={page.title}>
        {page.items.length > 0 ? (
          <CartTable items={page.items}/>
        ) : (
          <p>Cart is empty</p>
        )}
      </Content>
    )
  }
}

const mapStateToProps = state => ({
  page: state.cart
});

const mapDispatchToProps = dispatch => {
  return {
    loadPage: (url) => dispatch(loadCartPage(url))
  }
};

export default connectPage(mapStateToProps, mapDispatchToProps)(Cart);