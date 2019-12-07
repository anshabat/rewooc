import React, {Component} from "react";
import {BrowserRouter} from "react-router-dom";
import Root from "./Root";
import {createStore, applyMiddleware} from "redux";
import {Provider as ReduxProvider} from "react-redux";
import {rootReducer, initialState} from "./redux/reducer";
import axios from "axios";
import {ajaxEndpoint} from "./shared/utilities";
import PageLoader from "./components/UI/loaders/PageLoader/PageLoader";
import {AppProvider} from "./context/appContext";
import thunk from "redux-thunk";

class App extends Component {
  state = {
    serverData: null
  };

  componentDidMount() {
    axios.get(ajaxEndpoint("rewooc_get_common_data")).then(({data}) => {
      this.setState({serverData: data});
    })
  }

  render() {
    if (!this.state.serverData) return <PageLoader/>;

    const {cart, user, ...appData} = this.state.serverData;

    const store = createStore(
      rootReducer,
      initialState({cart, user}),
      applyMiddleware(thunk)
    );

    console.log(user, " - User in App.js");

    return (
      <AppProvider value={appData}>
        <ReduxProvider store={store}>
          <BrowserRouter>
            <Root/>
          </BrowserRouter>
        </ReduxProvider>
      </AppProvider>
    )
  }
}

export default App;