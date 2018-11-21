import './Layout.css';
import React from 'react';
import Header from '../../components/Header/Header';
import ListNav from '../../components/Nav/ListNav/ListNav';
import Dropdown from '../../components/Nav/Dropdown/Dropdown';
import Nav from '../../components/Nav/Nav';
import Autocomplete from '../../components/Autocomplete/Autocomplete';
import Phone from "../../components/Phone/Phone";
import Image from '../../components/UI/Image/Image';
import MiniCart from '../../components/Shop/Cart/MiniCart/MiniCart';
import {appData} from '../../index';

const Layout = (props) => {
    return (
        <div className={`rw-app rw-app--${appData.themeMods.rewooc_site_layout}`}>
            <div className="rw-app__header">
                <Header
                    headlineLeft={<Nav items={appData.headerNavigation} navs={[ListNav, Dropdown]}/>}
                    headlineRight={<Phone phoneNumber={appData.themeMods.rewooc_site_phone}/>}
                    mainLeft={<Image image={appData.themeMods.custom_logo}/>}
                    mainRight={<MiniCart count={props.cart.count}
                                         subtotal={Number(props.cart.subtotal)}/>}
                    mainCenter={<Autocomplete delay="500" minChars="3" limit="6"/>}
                />
            </div>
            <div className="rw-app__main">
                {props.children}
            </div>
            <div className="rw-app__footer">
                Footer
            </div>
        </div>
    );
};

export default Layout;