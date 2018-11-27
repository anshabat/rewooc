import React from 'react';
import Head from 'next/head';
import Page from './layouts/Page/Page';

export const {Provider, Consumer} = React.createContext();


const Main = (props) => {
    return (
        <Provider value={props.appData.settings}>
            <Head>
                <link rel="stylesheet"
                      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
            </Head>
            <Page appData={props.appData}>
                {props.children}
            </Page>
        </Provider>
    )
};

export default Main;
