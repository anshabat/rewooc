import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './shared/history'
import Root from './pages/Root'
import { checkAuth } from './redux/auth/authActions'
import PageLoader from './components/UI/loaders/PageLoader/PageLoader'
import { AppProvider } from './context/appContext'

class App extends Component {
  componentDidMount() {
    const { checkAuthAction } = this.props
    checkAuthAction()
  }

  render() {
    const {
      app: { data, loading },
    } = this.props

    if (loading) return <PageLoader />

    return (
      <AppProvider value={data}>
        <ConnectedRouter history={history}>
          <Root />
        </ConnectedRouter>
      </AppProvider>
    )
  }
}

const mapStateToProps = ({ app }) => ({ app })
const mapDispatchToProps = { checkAuthAction: checkAuth }

export default connect(mapStateToProps, mapDispatchToProps)(App)
