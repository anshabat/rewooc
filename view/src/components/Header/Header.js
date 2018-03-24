import React from 'react';
import Nav from '../Nav/Nav';

const Header = (props) => {
    return (
        <div className="pc-header">
            <div className="pc-header__headline">
                Headline
            </div>
            <div className="pc-header__body">
                Head body
            </div>
            <div className="pc-header__navigation">
                <Nav items={props.mainNav} />
            </div>
        </div>
    );
};

export default Header;