import './assets/css/core/reboot.css';
import './assets/css/core/variables.css';
import React from 'react';
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './store/reducers/cart';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import App from './containers/App/App';
import {baseUrl} from './shared';
import axios from 'axios';

export const appData = window.rewooc;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={baseUrl('/')}>
            <App appData={window.rewooc}/>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#rewooc')
);