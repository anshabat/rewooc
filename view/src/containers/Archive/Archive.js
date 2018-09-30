import './Archive.css';
import React, {Component} from 'react';
import {appData} from '../../index';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';

class Archive extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
    }

    componentDidMount() {
        //Cache page Proxy

        /*if (appData.products) {
            this.setState({
                products: appData.products
            });
        } else {
            jQuery.ajax({
                url: window.location.href,
                success: (data) => {
                    this.setState({
                        products: data.products
                    });
                }
            });
        }*/
        jQuery.ajax({
            url: window.location.href,
            success: (data) => {
                this.setState({
                    products: data.products
                });
            }
        });
    }

    render() {
        return this.state.products.length ? (
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