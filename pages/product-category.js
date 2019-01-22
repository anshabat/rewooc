import '../assets/scss/styles.scss';
import React, {Component} from 'react';
import axios from 'axios';
import Main from '../Main';
import Archive from '../layouts/Archive/Archive';
import {baseUrl} from '../shared/utilities';

class ProductCategory extends Component {

    static async getInitialProps(context) {
        console.log(context.query);
        return new Promise((resolve) => {
            axios.get(baseUrl('product-category/' + context.query.slug + '/')).then(({data}) => {
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

export default ProductCategory;
