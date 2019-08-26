import React, {Component} from 'react';
import axios from 'axios';
import {apiUrl} from '../../shared/utilities';
import ContentLoader from '../UI/loaders/ContentLoader/ContentLoader';

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
                <ContentLoader/>
            )
        }
    }
}