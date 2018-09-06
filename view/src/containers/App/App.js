import './App.css';
import React, {Component} from 'react';
import HomeLayout_1 from '../../layouts/homepage/HomeLayout_1/HomeLayout_1';
import {connect} from 'react-redux';
import {addToCart} from '../../store/actions/cart';
import Layout from '../Layout/Layout';
import Archive from '../Archive/Archive';
import {Route} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Layout appData={this.props.appData}
                    cart={this.props.cart}
                    onAddToCart={this.props.onAddToCart}
            >
                <Route path="/" render={(props) => <HomeLayout_1
                    {...props}
                    main={this.props.appData.widgets.homepage_main}
                    sidebar={this.props.appData.widgets.homepage_sidebar}
                    onAddToCart={this.props.onAddToCart}
                />}/>
                <Route path="/shop" component={Archive}/>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddToCart: (id, event) => dispatch(addToCart(id, event))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);