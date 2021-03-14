import React, { ReactNode, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { apiUrl } from '../shared/utilities'
import { AnyAction } from 'redux'

function connectPage<P>(action: (url: string) => AnyAction) {
  // TODO eslint this
  // eslint-disable-next-line react/display-name
  return (Component: React.ComponentType<P>) => (props: P): ReactNode => {
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
      dispatch(action(apiUrl(window.location.pathname)))
    }, [location.pathname])

    return <Component {...props} />
  }
}

export default connectPage
