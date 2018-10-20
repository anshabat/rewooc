import React, {Component} from 'react';
import axios from 'axios';
import HomeLayout_1 from '../../layouts/homepage/HomeLayout_1/HomeLayout_1';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: null
        };
    }

    componentDidMount() {
        axios.get(window.location.href).then(({data}) => {
            this.setState({
                widgets: data.widgets
            });
        });
    }

    render() {
        return this.state.widgets ? (
            <HomeLayout_1
                main={this.state.widgets.homepage_main}
                sidebar={this.state.widgets.homepage_sidebar}
            />
        ) : (
            <div>
                Loading homepage
            </div>
        )
    }
}

export default Home;