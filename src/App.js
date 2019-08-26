import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Root from './components/Root';
import appProvider from './providers/appProvider';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {addToCart} from './redux/middlewares';
import {rootReducer, initialState} from './redux/reducer';

class App extends Component {
    render() {
        const {serverState} = this.props;

        const store = createStore(
            rootReducer,
            initialState(serverState),
            applyMiddleware(addToCart)
        );

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Root/>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default appProvider(App);