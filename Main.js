import React from 'react';
import Head from 'next/head';
import Page from './layouts/Page/Page';

export const {Provider, Consumer} = React.createContext();


const Main = (props) => {
    return (
        <Provider value={props.appData}>
            <Head>
                <meta charSet={props.appData.siteMeta.charset}/>
                <meta name="viewport"
                      content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <title>{props.appData.siteMeta.title}</title>
                <meta name="description" content={props.appData.siteMeta.description}/>
                <link rel="shortcut icon" href={props.appData.favicon}/>
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
