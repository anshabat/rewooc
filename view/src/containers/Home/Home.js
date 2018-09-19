import React, {Component} from 'react';
import {appData} from '../../index';
import HomeLayout_1 from '../../layouts/homepage/HomeLayout_1/HomeLayout_1';

class Home extends Component {
    render() {
        return (
            <HomeLayout_1
                main={appData.widgets.homepage_main}
                sidebar={appData.widgets.homepage_sidebar}
            />
        )
    }
}

export default Home;