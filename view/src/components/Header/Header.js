import '../../vendor/css/shared/container.css';
import '../../vendor/css/shared/btn.css';
import './Header.css';
import React from 'react';
import Nav from '../Nav/Nav';

const Header = (props) => {
    return (
        <div className="pc-header">
            <div className="pc-header__top-row">
                <div className="ps-container">
                    <Nav items={props.mainNav}/>
                </div>
            </div>
            <div className="pc-header__main-row">
                <div className="ps-container">
                    Head body
                </div>
            </div>
            <div className="pc-header__bottom-row">
                <div className="ps-container">
                    <Nav items={props.mainNav}/>
                </div>
            </div>
        </div>
    );
};

export default Header;