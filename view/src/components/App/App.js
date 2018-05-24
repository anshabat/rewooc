import './App.css';
import React from 'react';
import Header from '../../components/Header/Header';
import Dropdown from '../Nav/Dropdown/Dropdown';
import ListNav from '../Nav/ListNav/ListNav';
import Nav from '../Nav/Nav';
import Autocomplete from '../Autocomplete/Autocomplete';
import HeroBanner from '../../components/Banners/HeroBanner/HeroBanner';
import Phone from "../Phone/Phone";
import Card from '../UI/Card/Card';
import FeaturedProducts from '../Widgets/FeaturedProducts/FeaturedProducts';
import Image from '../UI/Image/Image';
import Carousel from '../UI/Carousel/Carousel';

const App = (props) => (
    <div className={`pc-app pc-app--${props.appData.themeMods.rewooc_site_layout}`}>
        <div className="pc-app__header">
            <Header
                headlineLeft={<Nav items={props.appData.headerNavigation} navs={[ListNav, Dropdown]}/>}
                mainLeft={<Image image={props.appData.themeMods.custom_logo}/>}
                mainRight={<Phone phoneNumber={props.appData.themeMods.rewooc_site_phone}/>}
                mainCenter={<Autocomplete delay="500" minChars="3" limit="6"/>}
            />
        </div>
        {/*<div className="pc-app__main-banner">
            <HeroBanner/>
        </div>*/}
        <div className="pc-app__featured">
            <div className="ps-container">
                <Card title="Featured Products">
                    {/*<FeaturedProducts products={props.appData.featuredProducts}/>*/}
                    <Carousel/>
                </Card>
            </div>
        </div>
    </div>
);

export default App;