import '../assets/scss/styles.scss';
import React, {Component} from 'react';
import axios from 'axios';
import Main from '../Main';
import Home from '../layouts/Home/Home';
import {baseUrl} from '../shared/utilities';

class Index extends Component {

    static async getInitialProps() {
        return new Promise((resolve) => {
            axios.get(baseUrl()).then(({data}) => {
                resolve({appData: data})
            });
        });
    }

    render() {
        console.log(this.props);

        return (
            <Main appData={this.props.appData}>
                <Home main={this.props.appData.widgets.homepage_main}
                      sidebar={this.props.appData.widgets.homepage_sidebar}
                />
            </Main>
        )
    }
}

export default Index;