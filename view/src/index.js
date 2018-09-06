import './assets/css/core/reboot.css';
import React from 'react';
import ReactDOM from "react-dom";

/* Store and Reducer */
import {createStore} from 'redux';
import reducer from './store/reducers/cart';

/* Provider */
import {Provider} from 'react-redux';

/* Middleware */
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import App from './containers/App/App';

export const settings = window.rewooc.settings;

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App appData={window.rewooc}/>
    </Provider>,
    document.querySelector('#rewooc')
);