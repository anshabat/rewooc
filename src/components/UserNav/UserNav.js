import "./UserNav.scss";
import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";


const UserNav = props => {
  const {userId} = props;

  return (
    <ul className="rw-user-nav">
      {userId ? (
        <>
          <li className="rw-user-nav__item">
            <Link className="rw-user-nav__link" to="/sign_in">My Account</Link>
          </li>
          <li className="rw-user-nav__item">
            <Link className="rw-user-nav__link" to="/sign_out">Log out</Link>
          </li>
        </>
      ) : (
        <li className="rw-user-nav__item">
          <Link className="rw-user-nav__link" to="/sign_in">Sign in</Link>
        </li>
      )}
    </ul>
  );
};

const mapStateToProps = state => {
  return {
    userId: state.auth.userId
  }
};

export default connect(mapStateToProps)(UserNav);