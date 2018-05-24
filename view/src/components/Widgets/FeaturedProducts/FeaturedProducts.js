import './FeaturedProducts.css';
import React from 'react';
import ProductCard from '../../Shop/Product/ProductCard/ProductCard';

const FeaturedProducts = (props) => {
    return (
        <ul className="rw-featured-products">
            {props.products && props.products.map(product => (
                <li className="rw-featured-products__item" key={product.id}>
                    <ProductCard product={product}/>
                </li>
            ))}
        </ul>
    );
};

export default FeaturedProducts;