import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './shared/history'
import Root from './pages/Root'
import { checkAuth } from './redux/auth/authActions'
import PageLoader from './components/UI/loaders/PageLoader/PageLoader'
import { AppProvider } from './context/appContext'
import { AppStateType } from './redux/store'
import { IAppState } from './redux/app/appTypes'
import { selectApp } from './redux/app/appSelectors'

const App: FC = () => {
  const { data, loading } = useSelector<AppStateType, IAppState>(selectApp)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  if (loading || !data) return <PageLoader />

  //TODO add if (!data) - return Error page component instead of Loading state

  return (
    <AppProvider value={data}>
      <ConnectedRouter history={history}>
        <Root />
      </ConnectedRouter>
    </AppProvider>
  )
}

export default App
