import './App.scss';
import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Archive from '../Archive/Archive';
import {ajaxEndpoint, apiUrl} from '../../shared/utilities';
import Page404 from '../../components/Page404/Page404';
import Loader from '../../components/UI/Loader/Loader';

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
        axios.get(apiUrl(), {
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
        return this.state.appData ? (
            <Provider value={{
                store: this.state,
                actions: {
                    onAddToCart: this.onAddToCart,
                }
            }}>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route
                                path="/" exact
                                render={() => <Home appData={this.state.appData} />}
                            />
                            <Route
                                path={['/shop', '/product-category/:slug']}
                                render={(props) => <Archive {...props} />}
                            />
                            <Route component={Page404}/>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </Provider>
        ) : (
            <div className="rw-app-loader">
                <Loader/>
            </div>
        )
    }
}

export default App;