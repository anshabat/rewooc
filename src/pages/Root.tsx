import React, { FC, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import Home from './Home/Home'
import Catalog from './Catalog/Catalog'
import Page404 from './Page404/Page404'
import Cart from './Cart/Cart'
import SignIn from './SignIn/SignIn'
import SignOut from './SignOut/SignOut'
import Account from './Account/Account'
import PageLoader from '../components/UI/loaders/PageLoader/PageLoader'

const Checkout = React.lazy(() => import('./Checkout/Checkout'))

const Root: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path={['/shop', '/product-category/:slug']}>
            <Catalog />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/my-account">
            <Account />
          </Route>
          <Route path="/sign-out">
            <SignOut />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  )
}

export default Root
