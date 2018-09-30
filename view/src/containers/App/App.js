import './App.css';
import React, {Component} from 'react';
import Home from '../Home/Home';
import {connect} from 'react-redux';
import Layout from '../../components/Layout/Layout';
import Archive from '../Archive/Archive';
import {Route, withRouter} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Layout cart={this.props.cart}>
                <Route path="/" exact component={Home}/>
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

export default withRouter(connect(mapStateToProps)(App));