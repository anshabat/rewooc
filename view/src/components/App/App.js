import './App.css';
import React from 'react';
import Header from '../../components/Header/Header';
import Logo from '../Logo/Logo';
import Dropdown from '../Nav/Dropdown/Dropdown';
import ListNav from '../Nav/ListNav/ListNav';
import Nav from '../Nav/Nav';
import Autocomplete from '../Autocomplete/Autocomplete';
import HeroBanner from '../../components/Banners/HeroBanner/HeroBanner';
import Phone from "../Phone/Phone";

const App = (props) => (
    <div className={`pc-app pc-app--${props.appData.themeMods.rewooc_site_layout}`}>
        <div className="pc-app__header">
            <Header
                headlineLeft={<Nav items={props.appData.mainNavigation} navs={[ListNav, Dropdown]}/>}
                mainLeft={<Logo image={props.appData.themeMods.custom_logo}/>}
                mainRight={<Phone phoneNumber={props.appData.themeMods.rewooc_site_phone} />}
                mainCenter={<Autocomplete delay="500" minChars="3" />}
            />
        </div>
        <div className="pc-app__main-banner">
            <HeroBanner/>
        </div>
    </div>
);

export default App;