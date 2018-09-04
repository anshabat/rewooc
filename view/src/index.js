import './assets/css/core/reboot.css';
import React from 'react';
import ReactDOM from "react-dom";

/* Store and Reducer */
import {createStore} from 'redux';
import reducer from './store/reducers/cart';

/* Provider */
import {Provider} from 'react-redux';

import App from './components/App/App';

export const settings = window.rewooc.settings;

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App appData={window.rewooc}/>
    </Provider>,
    document.querySelector('#rewooc')
);