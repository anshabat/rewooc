import './Page.scss';
import React from 'react';
import Header from '../Header/Header';
import Nav from '../../components/Nav/Nav';
import ListNav from '../../components/Nav/ListNav/ListNav';
import Dropdown from '../../components/Nav/Dropdown/Dropdown';
import Phone from '../../components/Phone/Phone';
import Image from '../../components/UI/Image/Image';
import Autocomplete from '../../components/Autocomplete/Autocomplete';
import MiniCart from '../../components/Shop/Cart/MiniCart/MiniCart';

const Layout = (props) => {
    return (
        <div  className={`rw-page rw-page--${props.appData.customizer.site_layout}`}>
            <div className="rw-page__header">
                <Header
                    headlineLeft={<Nav items={props.appData.headerNavigation} navs={[ListNav, Dropdown]}/>}
                    headlineRight={<Phone phoneNumber={props.appData.phone}/>}
                    mainLeft={<Image image={props.appData.logo}/>}
                    mainCenter={<Autocomplete delay="500" minChars="3" limit="6"/>}
                    mainRight={<MiniCart count={0} subtotal={0}/>}
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