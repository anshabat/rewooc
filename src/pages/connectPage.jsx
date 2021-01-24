import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { apiUrl } from '../shared/utilities'

// TODO eslint this
// eslint-disable-next-line react/display-name
const connectPage = (action) => (Component) => (props) => {
  const router = useSelector((state) => state.router)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(action(apiUrl(window.location.pathname)))
  }, [router.location.pathname])

  return <Component {...props} />
}

export default connectPage
