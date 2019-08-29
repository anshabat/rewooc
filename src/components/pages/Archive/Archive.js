import './Archive.scss';
import React from 'react';
import ProductCard from '../../shop/product/ProductCard/ProductCard';
import pageProvider from '../pageProvider';
import Content from '../../Layout/Content/Content';

const Archive = ({products, title}) => {
    return (
        <Content title={title}>
            <div style={{'display': 'flex', 'flexWrap': 'wrap'}}>
                {products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </Content>
    );
};

export default pageProvider(Archive);