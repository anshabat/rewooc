import './Account.scss'
import React, { FC, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Content from '../../components/Layout/Content/Content'
import SidebarNav from '../../components/UI/navigation/SidebarNav/SidebarNav'
import PersonalInformation from './PersonalInformation/PersonalInformation'
import Orders from './Orders/Orders'
import Addresses from './Addresses/Addresses'
import ViewOrder from './ViewOrder/ViewOrder'
import Sidebar from '../../components/UI/SIdebar/Sidebar'

export const AccountContext = React.createContext({
  title: '',
  setTitle: (value: string) => {
    return
  },
})

const Account: FC = () => {
  const match = useRouteMatch()
  const [title, setTitle] = useState('My Account')

  const setTitleHandler = (value: string): void => {
    setTitle(value)
  }

  return (
    <AccountContext.Provider
      value={{ title: title, setTitle: setTitleHandler }}
    >
      <Content title={title}>
        <div className="rw-account">
          <Sidebar>
            <div>[User data]</div>
            <SidebarNav
              items={[
                { url: `${match.url}`, name: 'Personal info' },
                { url: `${match.url}/orders`, name: 'Orders' },
                { url: `${match.url}/edit-address`, name: 'Addresses' },
              ]}
            />
          </Sidebar>
          <div className="rw-account__body">
            <Switch>
              <Route path={`${match.path}`} exact>
                <PersonalInformation />
              </Route>
              <Route path={`${match.path}/orders`}>
                <Orders />
              </Route>
              <Route path={`${match.path}/view-order/:id`}>
                <ViewOrder />
              </Route>
              <Route path={`${match.path}/edit-address`}>
                <Addresses />
              </Route>
            </Switch>
          </div>
        </div>
      </Content>
    </AccountContext.Provider>
  )
}

export default Account
