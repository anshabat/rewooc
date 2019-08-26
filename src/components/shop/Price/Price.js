import './Price.scss';
import React from 'react';
import priceProvider from './priceProvider';

const Price = (props) => {
    return (
        <div className="rw-price">
            <div className="rw-price__value">{props.formatPrice(props.value)}</div>
        </div>
    );
};

export default priceProvider(Price);