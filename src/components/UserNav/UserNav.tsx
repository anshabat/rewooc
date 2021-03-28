import './UserNav.scss'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAccountUser } from '../../redux/account/accountSelector'

const UserNav: FC = () => {
  const user = useSelector(selectAccountUser)

  return (
    <ul className="rw-user-nav">
      {user ? (
        <>
          <li className="rw-user-nav__item">
            <Link className="rw-user-nav__link" to="/my-account">
              My Account ({user.id}){' '}
            </Link>
          </li>
          <li className="rw-user-nav__item">
            <Link className="rw-user-nav__link" to="/sign-out">
              Log out
            </Link>
          </li>
        </>
      ) : (
        <li className="rw-user-nav__item">
          <Link className="rw-user-nav__link" to="/sign-in">
            Sign in
          </Link>
        </li>
      )}
    </ul>
  )
}

export default UserNav
