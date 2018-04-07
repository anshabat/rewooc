import '../../vendor/css/shared/container.css';
import '../../vendor/css/shared/btn.css';
import './Header.css';
import React from 'react';
import Nav from '../Nav/Nav';
import MegaNav from '../Nav/MegaNav/MegaNav';
import TreeNav from '../Nav/TreeNav/TreeNav';

const Header = (props) => {
    return (
        <div className="pc-header">
            <div className="pc-header__top-row">
                <div className="ps-container">
                    <Nav items={props.mainNav} navs={[TreeNav]}/>
                </div>
            </div>
            <div className="pc-header__main-row">
                <div className="ps-container">
                    Head body
                </div>
            </div>
            <div className="pc-header__bottom-row">
                <div className="ps-container">
                    <Nav items={props.mainNav} navs={[TreeNav, MegaNav]}/>
                </div>
            </div>
        </div>
    );
};

export default Header;