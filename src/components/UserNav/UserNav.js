import './UserNav.scss';
import React from 'react';
import {Link} from 'react-router-dom';

const UserNav = () => {
  return (
    <ul className="rw-user-nav">
      <li className="rw-user-nav__item">
        <Link className="rw-user-nav__link" to="/sign_in">Sign in</Link>
      </li>
    </ul>
  );
};

export default UserNav;