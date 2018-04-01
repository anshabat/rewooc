import '../../vendor/css/shared/container.css';
import '../../vendor/css/shared/btn.css';
import './Header.css';
import React from 'react';
import Nav from '../Nav/Nav';

const Header = (props) => {
    return (
        <div className="pc-header">
            <div className="pc-header__headline">
                <div className="ps-container">
                    Headline
                    <button className="ps-btn">Shop now</button>
                </div>
            </div>
            <div className="pc-header__body">
                <div className="ps-container">
                    Head body
                </div>
            </div>
            <div className="pc-header__nav">
                <div className="ps-container">
                    <Nav items={props.mainNav}/>
                </div>
            </div>
        </div>
    );
};

export default Header;