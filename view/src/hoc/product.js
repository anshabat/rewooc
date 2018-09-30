import React, {Component} from 'react';
import {addToCart} from '../store/actions/cart';
import {connect} from 'react-redux';
import {compose} from 'redux'

const product = (ComposedComponent) => {
    return class extends Component {
        isInCart(id, itemKeys) {
            return Object.values(itemKeys).some(item => (item.product_id || item.variation_id) === id);
        }

        render() {
            return <ComposedComponent
                {...this.props}
                onAddToCart={this.props.onAddToCart}
                inCart={this.isInCart(this.props.id, this.props.cart.items)}
                isAdding={this.props.id === this.props.addingId}
            />
        }
    }
};

const mapStateToProps = state => {
    return {
        cart: state.cart,
        addingId: state.addingId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (id, event) => dispatch(addToCart(id, event))
    }
};

const composedProduct = compose(
    connect(mapStateToProps, mapDispatchToProps),
    product
);

export default composedProduct;
