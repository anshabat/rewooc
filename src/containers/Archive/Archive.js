import './Archive.scss';
import React, {Component} from 'react';
import axios from 'axios';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';
import {baseUrl} from '../../shared/utilities';

class Archive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            loading: true
        }
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.loadData();
        }
    }

    loadData() {
        this.setState({
            loading: true
        });
        axios.get(baseUrl(window.location.pathname)).then(({data}) => {
            this.setState({
                products: data.products,
                loading: false
            });
        })
    }

    render() {
        return !this.state.loading ? (
            <div style={{'display': 'flex', 'flexWrap': 'wrap'}}>
                {this.state.products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        ) : (
            <div>
                There are no products
            </div>
        )
    }
}

export default Archive;