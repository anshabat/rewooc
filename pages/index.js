import '../assets/scss/styles.scss';
import React, {Component} from 'react';
import axios from 'axios';
import Main from '../Main';
import Home from '../layouts/Home/Home';
import {baseUrl, ajaxEndpoint} from '../shared/utilities';

class Index extends Component {

    static async getInitialProps() {
        return new Promise((resolve) => {
            axios.get(baseUrl()).then(({data}) => {
                resolve({appData: data})
            });
        });
    }

    constructor(props){
        super(props);
        this.state = {
            cart: this.props.appData.cart
        }
    }

    onAddToCart(e, id) {
        e.preventDefault();

        let params = new FormData();
        params.set('productId', id);

        /*axios.post(ajaxEndpoint('rewooc_add_to_cart'), params).then(response => {
            console.log(response);
        });*/

        axios.get(baseUrl('wp-json/wc/v3/products'), {
            headers: {
                'Authorization': 'Basic ' + btoa('simple:simple')
            }
        }).then(response => {
            console.log(response);
        });
    }

    render() {

        return (
            <Main appData={this.props.appData}>
                <Home main={this.props.appData.widgets.homepage_main}
                      sidebar={this.props.appData.widgets.homepage_sidebar}
                      onAddToCart={this.onAddToCart}
                />
            </Main>
        )
    }
}

export default Index;