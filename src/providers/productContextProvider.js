import React, {Component} from 'react';
import {Consumer} from '../containers/App/App';
import axios from 'axios';
import {ajaxEndpoint} from '../shared/utilities';

export default function (WrappedComponent) {
    return class extends Component {

        isInCart(id, itemKeys) {
            return Object.values(itemKeys).some(item => (item.product_id || item.variation_id) === id);
        }

        render() {
            return (
                <Consumer>{({store, actions}) => {
                    return (
                        <WrappedComponent
                            {...this.props}
                            inCart={this.isInCart(this.props.id, store.cart.items)}
                            isAddingToCart={this.props.id === store.addingToCartId}
                            onAddToCart={actions.onAddToCart}
                        />
                    );
                }}
                </Consumer>
            );
        }
    }
}