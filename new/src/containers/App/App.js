import './App.scss';
import React, {Component} from 'react';
import Layout from '../Layout/Layout';

export const {Provider, Consumer} = React.createContext();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appData: null
        }

    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://rewooc.loc/server/wp/');
        xhr.addEventListener('load', e => {
            const data = JSON.parse(e.target.responseText);
            this.setState({
                appData: data
            });
        });
        xhr.send();
    }

    render() {
        return this.state.appData ? (
            <Provider value={this.state.appData}>
                <Layout>
                    This is layout content
                </Layout>
            </Provider>
        ) : (
            <div>Loading...</div>
        )
    }
}

export default App;