import './App.css';
import React from 'react';
import Header from '../../components/Header/Header';
import HeroBanner from '../../components/Banners/HeroBanner/HeroBanner';
import Logo from '../Logo/Logo';
import Dropdown from '../Nav/Dropdown/Dropdown';
import ListNav from '../Nav/ListNav/ListNav';
import Nav from '../Nav/Nav';
import SearchField from '../SearchField/SearchField';

const App = (props) => (
    <div className={`pc-app pc-app--${props.appData.themeMods.saleszone2_site_layout}`}>
        <div className="pc-app__header">
            <Header
                headlineLeft={<Nav items={props.appData.mainNavigation} navs={[ListNav, Dropdown]}/>}
                mainLeft={<Logo image={props.appData.themeMods.custom_logo}/>}
                mainCenter={<SearchField/>}
            />
        </div>
        <div className="pc-app__main-banner">
            <HeroBanner/>
        </div>
    </div>
);

export default App;