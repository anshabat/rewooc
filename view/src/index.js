import './assets/css/core/reboot.css';
import React from 'react';
import ReactDOM from "react-dom";

/* Store and Reducer */
import {createStore} from 'redux';
import reducer from './store/reducers/cart';
import {Provider} from 'react-redux';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

/* Application */
import App from './containers/App/App';
import Archive from './containers/Archive/Archive';

export const settings = window.rewooc.settings;

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App appData={window.rewooc}/>
    </Provider>,
    document.querySelector('#rewooc')
);