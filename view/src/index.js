import './assets/css/core/reboot.css';
import React from 'react';
import ReactDOM from "react-dom";
import {createStore} from 'redux';
import reducer from './store/reducers/cart';
import {Provider} from 'react-redux';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import App from './containers/App/App';

export const settings = window.rewooc.settings;

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App appData={window.rewooc}/>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#rewooc')
);