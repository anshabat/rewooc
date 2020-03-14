import React from "react";
import {connect} from "react-redux";
import Content from "../../components/Layout/Content/Content";
import withPageData2 from "../withPageData2";
import CartTable from "../../components/shop/cart/CartTable/CartTable";
import {loadCart} from "../../redux/actionCreators";
import {apiUrl} from "../../shared/utilities";

class Cart extends React.Component {

  componentDidMount() {
    this.props.loadCart(apiUrl(window.location.pathname));
  }

  render() {
    const {cart, title} = this.props;
    return (
      <Content title={title}>
        {cart.items.length > 0 ? (
          <CartTable items={cart.items}/>
        ) : (
          <p>Cart is empty</p>
        )}
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  title: 'lala'
});

const mapDispatchToProps = {loadCart};

export default connect(mapStateToProps, mapDispatchToProps)(
  Cart
);