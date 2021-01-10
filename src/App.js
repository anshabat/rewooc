import React, {Component} from "react";
import { ConnectedRouter } from 'connected-react-router'
import {history} from './shared/history';
import Root from "./pages/Root";
import {connect} from "react-redux";
import {checkAuth} from "./redux/auth/authActions";
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
        <ConnectedRouter history={history}>
          <Root/>
        </ConnectedRouter>
      </AppProvider>
    )
  }
}

const mapStateToProps = ({app}) => ({app});
const mapDispatchToProps = {checkAuth};

export default connect(mapStateToProps, mapDispatchToProps)(App);