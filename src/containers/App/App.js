import './App.scss';
import React, {Component} from 'react';
import axios from 'axios';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Archive from '../Archive/Archive';
import {ajaxEndpoint} from '../../shared/utilities';
import Page404 from '../../components/Page404/Page404';
import Loader from '../../components/UI/Loader/Loader';

export const {Provider, Consumer} = React.createContext();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appData: null
        };
    }

    componentDidMount() {
        axios.get('http://rewooc.loc/server/wp', {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
            }
        }).then(({data}) => {
            this.setState({
                appData: data
            });
        })
    }

    onAddToCart(e, id) {
        e.preventDefault();

        //TODO unused FORM data object. Maybe delete or use somehow
        let params = new FormData();
        params.set('productId', id);

        axios.get(ajaxEndpoint('rewooc_add_to_cart'), {
            params: {productId: id}
        }).then(response => {
            console.log(response.data);
        });
    }

    render() {
        return this.state.appData ? (
            <Provider value={this.state.appData}>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path="/dist/" exact render={() => <Home onAddToCart={this.onAddToCart}/>}/>
                            <Route path="/dist/shop" component={Archive}/>
                            <Route path="/dist/product-category/:slug" component={Archive}/>
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