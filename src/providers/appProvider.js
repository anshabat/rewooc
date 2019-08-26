import React, {Component} from 'react';
import axios from 'axios';
import {ajaxEndpoint} from '../shared/utilities';
import PageLoader from '../components/UI/loaders/PageLoader/PageLoader';
import Context from '../context';

const appProvider = (WrappedComponent) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null
            }
        }

        componentDidMount() {
            axios.get(ajaxEndpoint('rewooc_get_common_data'), {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
                }
            }).then(({data}) => {
                this.setState({data});
            })
        }

        render() {
            if (!this.state.data) return <PageLoader/>;
            const {cart, user, ...appData} = this.state.data;
            return (
                <Context.Provider value={appData}>
                    <WrappedComponent serverState={{cart, user}} {...this.props} />
                </Context.Provider>
            )
        }
    }
};

export default appProvider;