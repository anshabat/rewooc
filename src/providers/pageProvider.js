import React, {Component} from 'react';
import axios from 'axios';
import Loader from '../components/UI/Loader/Loader';
import {apiUrl} from '../shared/utilities';

export default function (WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                data: null
            };
            this.loadData = this.loadData.bind(this);
        }

        componentDidMount() {
            this.loadData();
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            if (prevProps.location.pathname !== this.props.location.pathname) {
                this.setState({data: null});
                this.loadData();
            }
        }

        loadData() {
            axios.get(apiUrl(window.location.pathname)).then(({data}) => {
                this.setState({data});
            })
        }

        render() {
            return this.state.data ? (
                <WrappedComponent {...this.props} {...this.state.data} />
            ) : (
                <div className="rw-page-loader">
                    <Loader/>
                </div>
            )
        }
    }
}