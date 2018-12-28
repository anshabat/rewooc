import '../assets/scss/styles.scss';
import React, {Component} from 'react';
import axios from 'axios';
import Main from '../Main';
import Archive from '../layouts/Archive/Archive';
import {baseUrl} from '../shared/utilities';

class Shop extends Component {
    static async getInitialProps() {
        return new Promise((resolve) => {
            axios.get(baseUrl('shop/'), {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
                }
            }).then(({data}) => {
                resolve({appData: data})
            });
        });
    }

    render() {
        return (
            <Main appData={this.props.appData}>
                <Archive products={this.props.appData.products}/>
            </Main>
        )
    }
}

export default Shop;
