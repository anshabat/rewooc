import React, {Component} from 'react';
import {addToCart} from '../../store/actions/cart';
import {connect} from 'react-redux';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inCart: false
        }
    }

    render() {
        return React.cloneElement(this.props.children, {onAddToCart: this.props.onAddToCart})
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Product);