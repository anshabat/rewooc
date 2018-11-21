import './Archive.css';
import React, {Component} from 'react';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';
import axios from 'axios/index';

class Archive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null
        };
    }

    componentDidMount() {
        axios.get(window.location.href).then(({data}) => {
            this.setState({
                products: data.products
            });
        });
    }

    render() {
        return this.state.products ? (
            <div style={{'display': 'flex', 'flexWrap': 'wrap'}}>
                {this.state.products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        ) : (
            <div>
                Loading products...
            </div>
        )
    }
}

export default Archive;