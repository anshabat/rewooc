import React, {Component} from "react";
import withPageData from '../../withPageData';

class Addresses extends Component {

  render() {

    return (
      <div>
        {this.props.address}
      </div>
    );
  }
}

export default withPageData(Addresses);