import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './pages/Root'
import { checkAuth } from './redux/auth/authActions'
import PageLoader from './components/UI/loaders/PageLoader/PageLoader'
import { AppProvider } from './context/appContext'
import { AppStateType } from './redux/store'
import { IAppState } from './redux/app/appTypes'
import { selectApp } from './redux/app/appSelectors'
import Dialog from './components/UI/Dialog/Dialog'

const App: FC = () => {
  const { data, loading, error } = useSelector<AppStateType, IAppState>(
    selectApp
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  if (loading) return <PageLoader />

  if (error || !data) return <Dialog isOpened={true}>{error.toString()}</Dialog>

  //TODO add if (!data) - return Error page component instead of Loading state

  return (
    <AppProvider value={data}>
      <Router>
        <Root />
      </Router>
    </AppProvider>
  )
}

export default App
