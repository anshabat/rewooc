import '../assets/scss/styles.scss';
import React, {Component} from 'react';
import axios from 'axios';
import Page from '../layouts/Page/Page';
import Head from 'next/head';
import Archive from '../layouts/Archive/Archive';

export default class extends Component {
    static async getInitialProps() {
        return new Promise((resolve) => {
            axios.get('http://rewooc.loc/server/wp/shop/').then(({data}) => {
                resolve({appData: data})
            });
        });
    }

    render() {
        return (
            <Page appData={this.props.appData}>
                <Head>
                    <link rel="stylesheet"
                          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
                </Head>
                <Archive products={this.props.appData.products}/>
            </Page>
        )
    }
}