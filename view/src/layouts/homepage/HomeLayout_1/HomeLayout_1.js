import './HomeLayout_1.css';
import React from 'react';
import Card from '../../../components/UI/Card/Card';
import Carousel from '../../../components/UI/Carousel/Carousel';
import ProductCard from '../../../components/Shop/Product/ProductCard/ProductCard';

const HomeLayout_1 = (props) => {
    return (
        <div className="rwl-home-1">
            {props.widgets.map((widget, index) => (
                <div className="rwl-home-1__widget" key={index}>
                    <div className="ps-container">
                        <Card title="Featured Products">
                            <Carousel>
                                {widget.map(product => (
                                    <ProductCard
                                        {...product}
                                        key={product.id}
                                        onAddToCart={props.onAddToCart}
                                    />
                                ))}
                            </Carousel>
                        </Card>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomeLayout_1;