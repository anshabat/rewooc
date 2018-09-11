import React, {Component} from 'react';
import {addToCart} from '../store/actions/cart';
import {connect} from 'react-redux';
import {compose} from 'redux'

const product = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                inCart: false
            }
        }

        render() {
            return <WrappedComponent
                {...this.props}
                onAddToCart={this.props.onAddToCart}
            />
        }
    }
};

const mapStateToProps = state => {
    return {
        cart: state.cart
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
