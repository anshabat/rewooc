import './App.scss';
import React, {Component} from 'react';
import axios from 'axios';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Archive from '../Archive/Archive';
import {ajaxEndpoint} from '../../../../shared/utilities';

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

        let params = new FormData();
        params.set('productId', id);

        axios.get(ajaxEndpoint('rewooc_add_to_cart')).then(response => {
            console.log(response.data);
        });
    }

    render() {
        return this.state.appData ? (
            <Provider value={this.state.appData}>
                <Layout>
                    {true ? (
                        <Home main={this.state.appData.widgets.homepage_main}
                              sidebar={this.state.appData.widgets.homepage_sidebar}
                              onAddToCart={this.onAddToCart}
                        />
                    ) : (
                        <Archive products={this.state.appData.products}/>
                    )}
                </Layout>
            </Provider>
        ) : (
            <div>Loading...</div>
        )
    }
}

export default App;