import React, {Component} from 'react';
import Layout from './Layout/Layout';
import {Route, Switch} from 'react-router';
import Home from './pages/Home/Home';
import Archive from './pages/Archive/Archive';
import Page404 from './pages/Page404/Page404';

class Root extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route
                        path="/" exact
                        render={(props) => <Home {...props} appData={this.props.appData}/>}
                    />
                    <Route
                        path={['/shop', '/product-category/:slug']}
                        render={(props) => <Archive {...props} />}
                    />
                    <Route component={Page404}/>
                </Switch>
            </Layout>
        );
    }
}

export default Root;