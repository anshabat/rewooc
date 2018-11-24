import './Archive.scss';
import React from 'react';
import ProductCard from '../../components/Shop/Product/ProductCard/ProductCard';

const Archive = ({products}) => {
    return products ? (
        <div style={{'display': 'flex', 'flexWrap': 'wrap'}}>
            {products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    ) : (
        <div>
            There are no products
        </div>
    )
};

export default Archive;