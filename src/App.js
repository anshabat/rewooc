import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import {ajaxEndpoint} from './shared/utilities';
import Root from './components/Root';
import PageLoader from './components/UI/loaders/PageLoader/PageLoader';

export const {Provider, Consumer} = React.createContext();

class App extends Component {
    constructor(props) {
        super(props);
        this.onAddToCart = this.onAddToCart.bind(this);
        this.state = {
            appData: null,
            cart: [],
            addingToCartId: null
        };
    }

    onAddToCart(e, id) {
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
    }

    componentDidMount() {
        axios.get(ajaxEndpoint('rewooc_get_common_data'), {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
            }
        }).then(({data}) => {
            const {cart, ...appData} = data;
            this.setState({
                appData,
                cart
            });
        })
    }

    render() {
        if (!this.state.appData) return <PageLoader/>;
        return (
            <Provider value={{
                store: this.state,
                actions: {
                    onAddToCart: this.onAddToCart,
                }
            }}>
                <BrowserRouter>
                    <Root />
                </BrowserRouter>
            </Provider>
        )

    }
}

export default App;