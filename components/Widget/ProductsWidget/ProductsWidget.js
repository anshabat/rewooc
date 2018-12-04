import './ProductsWidget.scss';
import React from 'react';
import Carousel from '../../UI/Carousel/Carousel';
import ProductCard from '../../Shop/Product/ProductCard/ProductCard';

const ProductsWidget = (props) => {

    let result = null;

    if (props.layout === 'carousel') {
        result = (
            <Carousel ref={elem => {
                props.getCarousel(elem)
            }}>
                {props.data.products.map(product => (
                    <ProductCard
                        {...product}
                        key={product.id}
                        onAddToCart={props.onAddToCart}
                    />
                ))}
            </Carousel>
        );
    } else {
        result = (
            <div className={`rw-products-widget rw-products-widget--${props.layout}`}>
                {props.data.products.map(product => (
                    <div className="rw-products-widget__item" key={product.id}>
                        <ProductCard
                            {...product}
                            onAddToCart={props.onAddToCart}
                        />
                    </div>
                ))}
            </div>
        );
    }

    return result;
};

ProductsWidget.defaultProps = {
    getCarousel: () => {
    }
};

export default ProductsWidget;