import React, {Component} from "react";
import axios from "axios";
import {apiUrl} from "../../../shared/utilities";
import ContentLoader from "../../../components/UI/loaders/ContentLoader/ContentLoader";

class Addresses extends Component {

  state = {
    data: null
  };

  componentDidMount() {
    axios.get(apiUrl(window.location.pathname)).then(({data}) => {
      this.setState({data});
    })
  }

  render() {
    const {data} = this.state;

    if (!data) {
      return <ContentLoader/>
    }

    return (
      <div>
        <ul>
          {data.orders.map(order => {
            return <li key={order.id}>{order.number}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Addresses;