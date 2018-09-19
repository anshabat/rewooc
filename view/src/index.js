import './assets/css/core/reboot.css';
import React from 'react';
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './store/reducers/cart';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import App from './containers/App/App';

export const appData = window.rewooc;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App appData={window.rewooc}/>
        </BrowserRouter>
    </Provider>,
    document.querySelector('#rewooc')
);