import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { apiUrl } from '../shared/utilities'
import { AnyAction } from 'redux'

export function useConnectPage(action: (url: string) => AnyAction): void {
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(action(apiUrl(window.location.pathname)))
  }, [location.pathname])
}
