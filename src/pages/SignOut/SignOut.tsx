import React, { FC, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOut } from '../../redux/auth/authActions'

const SignOut: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(signOut())
  }, [])

  return <Redirect to="/" />
}

export default SignOut
