import './Layout.scss';
import React from 'react';
import Header from '../Header/Header';
import Nav from '../../components/Nav/Nav';
import ListNav from '../../components/Nav/ListNav/ListNav';
import Dropdown from '../../components/Nav/Dropdown/Dropdown';
import Phone from '../../components/Phone/Phone';
import Image from '../../components/UI/Image/Image';
import Autocomplete from '../../components/Autocomplete/Autocomplete';
import MiniCart from '../../components/Shop/Cart/MiniCart/MiniCart';
import {Consumer} from '../App/App';

const Layout = (props) => {
    return (
        <Consumer>
            {({appData, cart}) => (
                <div className={`rw-page`}>
                    <div className="rw-page__header">
                        <Header
                            headlineLeft={<Nav items={appData.headerNavigation} navs={[ListNav, Dropdown]}/>}
                            headlineRight={<Phone phoneNumber={appData.phone}/>}
                            mainLeft={<Image image={appData.logo}/>}
                            mainCenter={<Autocomplete delay="500" minChars="3" limit="6"/>}
                            mainRight={<MiniCart count={cart.count} subtotal={cart.subtotal}/>}
                        />
                    </div>
                    <div className="rw-page__main">
                        {props.children}
                    </div>
                    <div className="rw-page__footer">
                        This is Page Footer
                    </div>
                </div>
            )}
        </Consumer>
    );
};

export default Layout;