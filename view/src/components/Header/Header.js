import '../../assets/css/shared/container.css';
import '../../assets/css/shared/btn.css';
import './Header.css';
import React from 'react';
import Nav from '../Nav/Nav';
import Dropdown from '../Nav/Dropdown/Dropdown';
import ListNav from '../Nav/ListNav/ListNav';
import Logo from '../Logo/Logo';

const Header = (props) => {
    return (
        <div className="pc-header">
            <div className="pc-header__top-row">
                <div className="ps-container">
                    <Nav items={props.mainNav} navs={[ListNav, Dropdown]}/>
                </div>
            </div>
            <div className="pc-header__main-row">
                <div className="ps-container">
                    <Logo image={props.logo}/>
                </div>
            </div>
            <div className="pc-header__bottom-row">
                <div className="ps-container">
                    {/*<Nav items={props.mainNav} navs={[TreeNav, MegaNav]}/>*/}
                </div>
            </div>
        </div>
    );
};

export default Header;