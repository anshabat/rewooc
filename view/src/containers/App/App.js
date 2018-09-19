import './App.css';
import React, {Component} from 'react';
import HomeLayout_1 from '../../layouts/homepage/HomeLayout_1/HomeLayout_1';
import Home from '../Home/Home';
import {connect} from 'react-redux';
import Layout from '../Layout/Layout';
import Archive from '../Archive/Archive';
import {Route} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Layout appData={this.props.appData}
                    cart={this.props.cart}
            >
                <Route path="/" component={Home}/>
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

export default connect(mapStateToProps)(App);