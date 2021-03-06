import './Header.scss'
import React, { FC, ReactNode } from 'react'
import UserNav from '../../UserNav/UserNav'

interface IProps {
  headlineRight: ReactNode
  headlineLeft: ReactNode
  mainLeft: ReactNode
  mainCenter: ReactNode
  mainRight: ReactNode
}

const Header: FC<IProps> = (props) => {
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
