import './App.css';
import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import HeroBanner from '../../components/Banners/HeroBanner/HeroBanner';

class App extends Component {

    constructor(props) {
        super(props);
        this.mainNavigation = props.appData.mainNavigation;
        this.siteLayout = props.appData.themeMods.saleszone2_site_layout;
        console.log(props.appData.themeMods);
    }

    render() {
        return (
            <div className={[`pc-app`, `pc-app--${this.siteLayout}`].join(' ')}>
                <div className="pc-app__header">
                    <Header
                        mainNav={this.mainNavigation}
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