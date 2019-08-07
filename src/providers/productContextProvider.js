import React, {Component} from 'react';
import {Consumer} from '../containers/App/App';
import axios from 'axios';
import {ajaxEndpoint} from '../shared/utilities';

export default function (WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.onAddToCart = this.onAddToCart.bind(this);
        }

        isInCart(id, itemKeys) {
            return Object.values(itemKeys).some(item => (item.product_id || item.variation_id) === id);
        }

        onAddToCart(e, id) {
            e.preventDefault();

            //TODO unused FORM data object. Maybe delete or use somehow
            let params = new FormData();
            params.set('productId', id);

            //startAddingToCart(id);
            console.log('start adding');

            axios.get(ajaxEndpoint('rewooc_add_to_cart'), {
                params: {productId: id},
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
                }
            }).then(response => {
                console.log('end')
                //addedToCart(response.data);
            });
        }

        render() {
            return (
                <Consumer>{({cart, addingToCartId}) => {
                    return (
                        <WrappedComponent
                            {...this.props}
                            inCart={this.isInCart(this.props.id, cart.items)}
                            isAddingToCart={this.props.id === addingToCartId}
                            onAddToCart={this.onAddToCart}
                        />
                    );
                }}
                </Consumer>
            );
        }
    }
}