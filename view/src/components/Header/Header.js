import './Header.css';
import React from 'react';
import Nav from '../Nav/Nav';

const Header = (props) => {
    return (
        <div className="pc-header">
            <div className="pc-header__headline">
                <div className="pu-container">
                    Headline
                </div>
            </div>
            <div className="pc-header__body">
                <div className="pu-container">
                    Head body
                </div>
            </div>
            <div className="pc-header__nav">
                <div className="pu-container">
                    <Nav items={props.mainNav}/>
                </div>
            </div>
        </div>
    );
};

export default Header;