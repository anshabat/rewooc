import './UserNav.scss'
import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAccountUser } from '../../redux/account/accountSelector'
import Button from '../UI/Button/Button'
import Dialog from '../UI/Dialog/Dialog'

const UserNav: FC = () => {
  const user = useSelector(selectAccountUser)
  const [modal1, setModal1] = useState(false)
  const [modal2, setModal2] = useState(false)

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
      <li className="rw-user-nav__item">
        <Link className="rw-user-nav__link" to="/checkout">
          Checkout
        </Link>
      </li>
      <li className="rw-user-nav__item">
        <Button
          size="sm"
          color="secondary"
          onClick={() => {
            setModal1(true)
          }}
        >
          Modal 1
        </Button>
        <Dialog
          isOpened={modal1}
          title="Cart"
          onClose={() => {
            setModal1(false)
          }}
        >
          This is the first dialog
        </Dialog>
      </li>
      <li className="rw-user-nav__item">
        <Button
          size="sm"
          color="secondary"
          onClick={() => {
            setModal2((prev) => !prev)
          }}
        >
          Modal 2
        </Button>
        <Dialog
          isOpened={modal2}
          onClose={() => {
            setModal2(false)
          }}
        >
          This is the second dialog
        </Dialog>
      </li>
    </ul>
  )
}

export default UserNav
