import '../assets/scss/styles.scss';
import React, {Component} from 'react';
import axios from 'axios';
import Head from 'next/head';
import Page from '../layouts/Page/Page';
import Home from '../layouts/Home/Home';

export default class extends Component {

    static async getInitialProps() {
        return new Promise((resolve) => {
            axios.get('http://rewooc.loc/server/wp/').then(({data}) => {
                resolve({appData: data})
            });
        });
    }

    render() {
        console.log(this.props.appData);

        return (
            <Page appData={this.props.appData}>
                <Head>
                    <link rel="stylesheet"
                          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
                </Head>
                <Home main={this.props.appData.widgets.homepage_main}
                      sidebar={this.props.appData.widgets.homepage_sidebar}
                />
            </Page>
        )
    }
}