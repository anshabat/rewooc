import '../../assets/css/shared/container.css';
import './Header.css';
import React from 'react';

const Header = (props) => {
    return (
        <div className="pc-header">
            <div className="pc-header__headline">
                <div className="ps-container">
                    {props.headlineLeft}
                </div>
            </div>
            <div className="pc-header__main">
                <div className="ps-container">
                    <div className="pc-header__main-row">
                        <div className="pc-header__main-left">
                            {props.mainLeft}
                        </div>
                        <div className="pc-header__main-center">
                            {props.mainCenter}
                        </div>
                        <div className="pc-header__main-right">
                            +38098
                        </div>
                    </div>
                </div>
            </div>
            <div className="pc-header__navbar">
                <div className="ps-container">
                    {/*<Nav items={props.mainNav} navs={[TreeNav, MegaNav]}/>*/}
                </div>
            </div>
        </div>
    );
};

export default Header;