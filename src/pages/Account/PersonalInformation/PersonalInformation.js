import React, {Component} from "react";
import {connect} from 'react-redux';

class PersonalInformation extends Component {

  render() {
    const {user} = this.props;

    return (
      <div>
        Personal information
        <h1>{user.displayName}</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.data
  }
};

export default connect(mapStateToProps)(PersonalInformation);