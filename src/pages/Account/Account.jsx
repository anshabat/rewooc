import './Account.scss'
import React from 'react'
import { Route, Switch } from 'react-router'
import Content from '../../components/Layout/Content/Content'
import SidebarNav from '../../components/UI/navigation/SidebarNav/SidebarNav'
import PersonalInformation from './PersonalInformation/PersonalInformation'
import Orders from './Orders/Orders'
import Addresses from './Addresses/Addresses'

function Account(props) {
  const { match } = props

  return (
    <Content title="My Account">
      <div className="rw-account">
        <div className="rw-account__sidebar">
          <div className="rw-account__sidebar-item">[User data]</div>
          <div className="rw-account__sidebar-item">
            <SidebarNav
              items={[
                { url: `${match.url}`, name: 'Personal info' },
                { url: `${match.url}/orders`, name: 'Orders' },
                { url: `${match.url}/edit-address`, name: 'Addresses' },
              ]}
            />
          </div>
        </div>
        <div className="rw-account__body">
          <Switch>
            <Route
              path={`${match.path}`}
              exact
              component={PersonalInformation}
            />
            <Route path={`${match.path}/orders`} component={Orders} />
            <Route path={`${match.path}/edit-address`} component={Addresses} />
          </Switch>
        </div>
      </div>
    </Content>
  )
}

export default Account