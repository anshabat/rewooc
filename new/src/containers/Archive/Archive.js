import './Archive.scss';
import React, {Component} from 'react';
import axios from 'axios';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';

class Archive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null
        }
    }

    componentDidMount() {
        axios.get('http://rewooc.loc/server/wp/shop').then(({data}) => {
            this.setState({
                products: data.products
            });
        })
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
                There are no products
            </div>
        )
    }
}

export default Archive;