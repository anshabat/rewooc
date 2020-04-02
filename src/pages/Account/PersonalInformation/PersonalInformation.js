import React, {Component} from "react";

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

export default PersonalInformation;