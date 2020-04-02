import "./Account.scss";
import React, {Component} from "react";
import Content from "../../components/Layout/Content/Content";
import SidebarNav from "../../components/UI/navigation/SidebarNav/SidebarNav";
import {Route, Switch} from "react-router";
import PersonalInformation from "./PersonalInformation/PersonalInformation";
import Orders from "./Orders/Orders";
import axios from "axios";
import {apiUrl} from "../../shared/utilities";
import ContentLoader from "../../components/UI/loaders/ContentLoader/ContentLoader";
import Addresses from "./Addresses/Addresses";

class Account extends Component {

  state = {
    data: null
  };

  componentDidMount() {
    axios.get(apiUrl("/my-account")).then(({data}) => {
      this.setState({data});
    })
  }

  render() {
    const {match} = this.props;
    const {data} = this.state;

    if (!data) {
      return <ContentLoader/>
    }

    return (
      <Content title="Test">
        <div className="rw-account">
          <div className="rw-account__sidebar">
            <div className="rw-account__sidebar-item">
              [User data]
            </div>
            <div className="rw-account__sidebar-item">
              <SidebarNav items={[
                {url: `${match.url}`, name: "Personal info"},
                {url: `${match.url}/orders`, name: "Orders"},
                {url: `${match.url}/edit-address`, name: "Addresses"},
              ]}/>
            </div>
          </div>
          <div className="rw-account__body">
            <Switch>
              <Route path={`${match.path}`} exact render={() => {
                return <PersonalInformation user={data.user}/>
              }}/>
              <Route path={`${match.path}/orders`} render={() => {
                return <Orders/>
              }}/>
              <Route path={`${match.path}/edit-address`} render={() => {
                return <Addresses/>
              }}/>
            </Switch>
          </div>
        </div>
      </Content>
    );
  }
}

export default Account;