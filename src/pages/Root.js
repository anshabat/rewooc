import React, {Component} from "react";
import Layout from "../components/Layout/Layout";
import {Route, Switch} from "react-router";
import Home from "./Home/Home";
import Catalog from "./Catalog/Catalog";
import Page404 from "./Page404/Page404";
import Cart from "./Cart/Cart";
import SignIn from './SignIn/SignIn';

class Root extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path={["/shop", "/product-category/:slug"]} component={Catalog}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/sign_in" component={SignIn}/>
          <Route component={Page404}/>
        </Switch>
      </Layout>
    );
  }
}

export default Root;