import './Archive.scss';
import React from 'react';
import ProductCard from '../../shop/product/ProductCard/ProductCard';
import pageProvider from '../../../providers/pageProvider';

const Archive = ({products}) => {
    return (
        <div style={{'display': 'flex', 'flexWrap': 'wrap'}}>
            {products.map(product => (
                <ProductCard key={product.id} {...product} />
            ))}
        </div>
    );
};

export default pageProvider(Archive);