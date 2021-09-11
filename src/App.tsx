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
import CustomErrorBoundary from './components/errorBoundaries/CustomErrorBoundary'

const App: FC = () => {
  const { data, loading, error } = useSelector<AppStateType, IAppState>(
    selectApp
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [])

  if (loading) return <PageLoader />

  return (
    <CustomErrorBoundary error={error || !data}>
      <AppProvider value={data!}>
        <Router>
          <Root />
        </Router>
      </AppProvider>
    </CustomErrorBoundary>
  )
}

export default App
