import React, {Component} from 'react';
import {Consumer} from '../containers/App/App';

export default function (WrappedComponent) {
    return class extends Component {
        isInCart(id, itemKeys) {
            return Object.values(itemKeys).some(item => (item.product_id || item.variation_id) === id);
        }
        render() {
            return (
                <Consumer>{({cart, addingToCartId}) => {
                    return (
                        <WrappedComponent
                            {...this.props}
                            inCart={this.isInCart(this.props.id, cart.items)}
                            isAddingToCart={this.props.id === addingToCartId}
                        />
                    );
                }}
                </Consumer>
            );
        }
    }
}