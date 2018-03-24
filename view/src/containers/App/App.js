import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import HeroBanner from '../../components/Banners/HeroBanner/HeroBanner';

class App extends Component {
    constructor(props) {
        super();
        this.mainNavigation = props.appData.mainNavigation;
    }

    render() {
        return (
            <div className="c-app">
                <div className="c-app__header">
                    <Header
                        mainNav={this.mainNavigation}
                    />
                </div>
                <div className="c-app__main-banner">
                    <HeroBanner />
                </div>
            </div>
        )
    }
}

export default App;