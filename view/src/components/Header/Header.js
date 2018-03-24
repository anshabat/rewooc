import React from 'react';
import Nav from '../Nav/Nav';

const Header = (props) => {
    return (
        <div className="c-header">
            <div className="c-header__headline">
                Headline
            </div>
            <div className="c-header__body">
                Head body
            </div>
            <div className="c-header__navigation">
                <Nav items={props.mainNav} />
            </div>
        </div>
    );
};

export default Header;