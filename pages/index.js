import '../assets/scss/styles.scss';
import React, {Component} from 'react';
import axios from 'axios';
import Page from '../components/Page/Page';
import Head from 'next/head';

export default class extends Component {
    static async getInitialProps() {
        return new Promise((resolve) => {
            axios.get('http://rewooc.loc/').then(({data}) => {
                resolve({appData: data})
            });
        });
    }

    render() {
        //console.log(this.props.appData);
        return (
            <Page appData={this.props.appData}>
                <Head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                </Head>
                This is Home page
            </Page>
        )
    }
}