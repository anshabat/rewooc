import './ProductsWidget.css';
import React from 'react';
import Carousel from '../../UI/Carousel/Carousel';
import ProductCard from '../../Shop/Product/ProductCard/ProductCard';

const ProductsWidget = (props) => {
    return (
        <Carousel>
            {props.products.map(product => (
                <ProductCard
                    {...product}
                    key={product.id}
                    onAddToCart={props.onAddToCart}
                />
            ))}
        </Carousel>
    );
};

export default ProductsWidget;