import './ProductsWidget.css';
import React from 'react';
import Carousel from '../../UI/Carousel/Carousel';
import ProductCard from '../../Shop/Product/ProductCard/ProductCard';
import Product from '../../../containers/Product/Product';

const ProductsWidget = (props) => {

    let result = null;

    if (props.widgetLayout === 'carousel') {
        result = (
            <Carousel ref={elem => {
                props.getCarousel(elem)
            }}>
                {props.data.products.map(product => (
                    <ProductCard
                        {...product}
                        key={product.id}
                    />
                ))}
            </Carousel>
        );
    } else {
        result = (
            <div className={`rw-products-widget rw-products-widget--${props.widgetLayout}`}>
                {props.data.products.map(product => (
                    <div className="rw-products-widget__item" key={product.id}>
                        <Product>
                            <ProductCard
                                {...product}
                            />
                        </Product>
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