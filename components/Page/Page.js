import './Page.scss';
import React from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import ListNav from '../Nav/ListNav/ListNav';
import Dropdown from '../Nav/Dropdown/Dropdown';
import Phone from '../Phone/Phone';

const Layout = (props) => {
    return (
        <div className={`rw-page`}>
            <div className="rw-page__header">
                <Header
                    headlineLeft={<Nav items={props.appData.headerNavigation} navs={[ListNav, Dropdown]}/>}
                    headlineRight={<Phone phoneNumber={props.appData.themeMods.rewooc_site_phone}/>}
                />
            </div>
            <div className="rw-page__main">
                {props.children}
            </div>
            <div className="rw-page__footer">
                This is Page Footer
            </div>
        </div>
    );
};

export default Layout;