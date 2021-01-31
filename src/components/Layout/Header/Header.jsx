import './Header.scss'
import React from 'react'
import UserNav from '../../UserNav/UserNav'

const Header = (props) => {
  const { headlineRight, headlineLeft, mainLeft, mainCenter, mainRight } = props

  return (
    <div className="rw-header">
      <div className="rw-header__headline">
        <div className="rw-header__container">
          <div style={{ float: 'right' }}>{headlineRight}</div>
          {headlineLeft}
        </div>
      </div>
      <div className="rw-header__main">
        <div className="rw-header__container">
          <div className="rw-header__main-row">
            <div className="rw-header__main-left">{mainLeft}</div>
            <div className="rw-header__main-center">{mainCenter}</div>
            <div className="rw-header__main-right">{mainRight}</div>
          </div>
        </div>
      </div>
      <div className="rw-header__navbar">
        <div className="rw-header__container">
          <UserNav />
          {/* <Nav items={props.mainNav} navs={[TreeNav, MegaNav]}/> */}
        </div>
      </div>
    </div>
  )
}

export default Header
