import React, {Component} from "react";
import {connect} from 'react-redux';
import {selectAccountUser} from "../../../redux/account/accountSelector";

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
    user: selectAccountUser(state)
  }
};

export default connect(mapStateToProps)(PersonalInformation);