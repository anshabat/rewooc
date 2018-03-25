import './App.css';
import React, {Component} from 'react';
import Header from '../../components/Header/Header';
import HeroBanner from '../../components/Banners/HeroBanner/HeroBanner';

class App extends Component {
    constructor(props) {
        super();
        this.mainNavigation = props.appData.mainNavigation;
        this.state = {
            banner: false
        }
    }

    showBanner(){
        this.setState({banner: true})
    }

    render() {
        return (
            <div className="pc-app">
                <div className="pc-app__header">
                    <Header
                        mainNav={this.mainNavigation}
                    />
                </div>
                <button onClick={this.showBanner.bind(this)}>Show banner</button>
                <div className="pc-app__main-banner">
                    {this.state.banner ? <HeroBanner /> : null}
                </div>
            </div>
        )
    }
}

export default App;