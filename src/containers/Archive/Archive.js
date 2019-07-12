import './Archive.scss';
import React, {Component} from 'react';
import axios from 'axios';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';
import {apiUrl} from '../../shared/utilities';
import Loader from '../../components/UI/Loader/Loader';

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
        axios.get(apiUrl(window.location.pathname + '/')).then(({data}) => {
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
                    <ProductCard
                        key={product.id}
                        {...product}
                        onAddToCart={this.props.onAddToCart}
                    />
                ))}
            </div>
        ) : (
            <div className="rw-page-loader">
                <Loader/>
            </div>
        )
    }
}

export default Archive;