import './Page.scss';
import React from 'react';
import Header from '../Header/Header';
import Nav from '../Nav/Nav';
import ListNav from '../Nav/ListNav/ListNav';
import Dropdown from '../Nav/Dropdown/Dropdown';
import Phone from '../Phone/Phone';
import Image from '../UI/Image/Image';
import Autocomplete from '../Autocomplete/Autocomplete';

const Layout = (props) => {
    return (
        <div className={`rw-page`}>
            <div className="rw-page__header">
                <Header
                    headlineLeft={<Nav items={props.appData.headerNavigation} navs={[ListNav, Dropdown]}/>}
                    headlineRight={<Phone phoneNumber={props.appData.themeMods.rewooc_site_phone}/>}
                    mainLeft={<Image image={props.appData.themeMods.custom_logo}/>}
                    mainCenter={<Autocomplete delay="500" minChars="3" limit="6"/>}
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