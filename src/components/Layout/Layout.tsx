import './Layout.scss'
import React, { useContext } from 'react'
import { AppContext } from '../../context/appContext'
import Header from './Header/Header'
import Nav from '../Nav/Nav'
import ListNav from '../Nav/ListNav/ListNav'
import Dropdown from '../Nav/Dropdown/Dropdown'
import Phone from '../Phone/Phone'
import Image from '../UI/Image/Image'
import Autocomplete from '../Autocomplete/Autocomplete'
import MiniCart from '../shop/cart/MiniCart/MiniCart'

const Layout: React.FC = (props) => {
  const { headerNavigation, phone, logo } = useContext(AppContext)
  const { children } = props

  return (
    <div className="rw-page">
      <header className="rw-page__header">
        <Header
          headlineLeft={
            <Nav items={headerNavigation} navs={[ListNav, Dropdown]} />
          }
          headlineRight={<Phone phoneNumber={phone} />}
          mainLeft={
            <a href="/">
              <Image image={logo.full} />
            </a>
          }
          mainCenter={<Autocomplete delay={500} minChars={3} limit={6} />}
          mainRight={<MiniCart />}
        />
      </header>
      <main className="rw-page__main">{children}</main>
      <footer className="rw-page__footer">This is Page Footer</footer>
    </div>
  )
}

export default Layout
