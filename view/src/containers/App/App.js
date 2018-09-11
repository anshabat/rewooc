import './App.css';
import React, {Component} from 'react';
import HomeLayout_1 from '../../layouts/homepage/HomeLayout_1/HomeLayout_1';
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
                <Route path="/" render={(props) => <HomeLayout_1
                    {...props}
                    main={this.props.appData.widgets.homepage_main}
                    sidebar={this.props.appData.widgets.homepage_sidebar}
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

export default connect(mapStateToProps)(App);