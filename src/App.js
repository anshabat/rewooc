import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Root from './Root';
import appProvider from './appProvider';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {addToCartMiddleware, deleteFromCartMiddleware, setCartProductQuantityMiddleware} from './redux/middlewares';
import {rootReducer, initialState} from './redux/reducer';

class App extends Component {
    render() {
        const {serverState} = this.props;

        const store = createStore(
            rootReducer,
            initialState(serverState),
            applyMiddleware(addToCartMiddleware, deleteFromCartMiddleware, setCartProductQuantityMiddleware)
        );

        console.log(serverState.user,' - User in App.js');

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