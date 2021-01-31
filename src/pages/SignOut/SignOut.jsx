import React, { useEffect } from 'react'
import { Redirect } from 'react-router'
import { useDispatch } from 'react-redux'
import { signOut } from '../../redux/auth/authActions'

const SignOut = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(signOut())
  }, [])

  return <Redirect to="/" />
}

export default SignOut
