import './App.css';
import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import HeroBanner from '../../components/Banners/HeroBanner/HeroBanner';

class App extends Component {

    constructor(props) {
        super(props);
        this.mainNavigation = props.appData.mainNavigation;
        this.siteLayout = props.appData.themeMods.saleszone2_site_layout;
        this.logo = props.appData.themeMods.custom_logo;
    }

    render() {
        return (
            <div className={`pc-app pc-app--${this.siteLayout}`}>
                <div className="pc-app__header">
                    <Header
                        mainNav={this.mainNavigation}
                        logo={this.logo}
                    />
                </div>
                <div className="pc-app__main-banner">
                    <HeroBanner/>
                </div>
            </div>
        )
    }
}

export default App;