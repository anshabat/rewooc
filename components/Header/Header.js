import './Header.scss';
import React from 'react';

const Header = (props) => {
    return (
        <div className="rw-header">
            <div className="rw-header__headline">
                <div className="rw-header__container">
                    <div style={{float: 'right'}}>{props.headlineRight}</div>
                    {props.headlineLeft}
                </div>
            </div>
            <div className="rw-header__main">
                <div className="rw-header__container">
                    <div className="rw-header__main-row">
                        <div className="rw-header__main-left">
                            props.mainLeft
                        </div>
                        <div className="rw-header__main-center">
                            props.mainCenter
                        </div>
                        <div className="rw-header__main-right">
                            props.mainRight
                        </div>
                    </div>
                </div>
            </div>
            <div className="rw-header__navbar">
                <div className="rw-header__container">
                    {/*<Nav items={props.mainNav} navs={[TreeNav, MegaNav]}/>*/}
                </div>
            </div>
        </div>
    );
};

export default Header;