import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import {ajaxEndpoint} from './shared/utilities';
import Root from './components/Root';
import PageLoader from './components/UI/loaders/PageLoader/PageLoader';
import Context from './context';
import appProvider from './providers/appProvider';

/* Redux */
import {createStore} from 'redux';
import reducer from './redux/reducer/cart';
import {Provider} from 'react-redux';

class App extends Component {
    /*constructor(props) {
        super(props);
        this.onAddToCart = this.onAddToCart.bind(this);
        this.state = {
            addingToCartId: null
        };
    }*/

    /*onAddToCart(e, id) {
        e.preventDefault();

        //TODO unused FORM data object. Maybe delete or use somehow
        let params = new FormData();
        params.set('productId', id);

        this.setState({
            addingToCartId: id
        });

        axios.get(ajaxEndpoint('rewooc_add_to_cart'), {
            params: {productId: id},
            headers: {
                'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
            }
        }).then(response => {
            this.setState({
                cart: response.data,
                addingToCartId: null
            });
        });
    }*/

    static contextType = Context;

    render() {
        const store = createStore(reducer, this.context);
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Root/>
                </BrowserRouter>
            </Provider>
        )

    }
}

export default appProvider(App);