import '../assets/scss/styles.scss';
import React, {Component} from 'react';
import axios from 'axios';
import Main from '../Main';
import Archive from '../layouts/Archive/Archive';

class Shop extends Component {
    static async getInitialProps() {
        return new Promise((resolve) => {
            axios.get('http://rewooc.loc/server/wp/shop/').then(({data}) => {
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
