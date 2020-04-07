import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import Root from "./pages/Root";
import {connect} from "react-redux";
import {initApp} from "./actions/initApp";
import {checkAuth} from "./actions/checkAuth";
import PageLoader from "./components/UI/loaders/PageLoader/PageLoader";
import {AppProvider} from "./context/appContext";

class App extends Component {

  componentDidMount() {
    this.props.checkAuth();
  }

  render() {
    const {data, loading} = this.props.app;

    if (loading) return <PageLoader/>;

    return (
      <AppProvider value={data}>
        <BrowserRouter>
          <Root/>
        </BrowserRouter>
      </AppProvider>
    )
  }
}

const mapStateToProps = ({app}) => ({app});
const mapDispatchToProps = {initApp, checkAuth};

export default connect(mapStateToProps, mapDispatchToProps)(App);