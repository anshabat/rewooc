import './ProductsWidget.scss';
import React from 'react';
import Carousel from '../../UI/Carousel/Carousel';

const ProductsWidget = (props) => {

    let result = null;

    if (props.layout === 'carousel') {
        result = (
            <Carousel ref={elem => {
                props.getCarousel(elem)
            }}>
                {props.data.products.map(product => (
                    <div>
                        Product
                    </div>
                ))}
            </Carousel>
        );
    } else {
        result = (
            <div className={`rw-products-widget rw-products-widget--${props.layout}`}>
                {props.data.products.map(product => (
                    <div className="rw-products-widget__item" key={product.id}>
                        Product
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