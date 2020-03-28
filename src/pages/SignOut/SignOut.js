import React, {Component} from "react";
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {signOut} from "../../redux/actionCreators";

class SignOut extends Component {
  componentDidMount() {
    this.props.signOutUser()
  }

  render() {
    return <Redirect to="/"/>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: () => {
      dispatch(signOut())
    }
  }
};

export default connect(null, mapDispatchToProps)(SignOut);